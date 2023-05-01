import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { SignupResponseModel } from 'src/app/public/models';
import { SignUpService } from 'src/app/public/services';
import { RouteConstants } from 'src/app/shared/constants';
import { SharedService } from 'src/app/shared/services';
import { EnterpriseModel } from '../../models/enterprise.model';
import { FAILURE_STATUSES, SignupStatus } from './verify-dialog.constants';

@Component({
  selector: 'app-verify-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule],
  templateUrl: './verify-dialog.component.html',
  styleUrls: ['./verify-dialog.component.scss'],
})
export class VerifyDialogComponent implements OnInit {
  // Constant variables
  readonly SignupStatus = SignupStatus;

  // Data variables
  enterprise?: EnterpriseModel;

  // Status variables
  currentSignupStatus = SignupStatus.Pending;
  isSignupInProgress = true;
  certificatCreationText = [
    "Let's Encrypt Configuration",
    'Creating domain keypair',
    'DNS Authorization',
    'Waiting order status',
    'Saving certificates',
  ];

  processTextToShow: string = this.certificatCreationText[0];
  processTextIndex = 0;
  certificateCreationInterval: ReturnType<typeof setInterval>;

  constructor(
    private signupService: SignUpService,
    private route: Router,
    private sharedService: SharedService,
    public dialogRef: MatDialogRef<VerifyDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: {
      signupResponse: SignupResponseModel;
    }
  ) {}

  ngOnInit() {
    this.enterprise = this.data.signupResponse.payload;
    this.checkStatus();
  }

  checkStatus = () => {
    setTimeout(() => {
      this.signupService.getEnterprise(this.enterprise!.id).subscribe({
        next: (response) => {
          this.currentSignupStatus = response.payload.status;
          if (this.isCertificateCreationInProgress()) {
            this.showCertificationCreationMessages();
          } else if (
            !this.isCertificateCreationInProgress() &&
            this.certificateCreationInterval
          ) {
            clearInterval(this.certificateCreationInterval);
          }

          if (FAILURE_STATUSES.includes(this.currentSignupStatus)) {
            let retryAPI;
            switch (this.currentSignupStatus) {
              case SignupStatus.DomainCreationFailed:
                retryAPI = this.signupService.resumeSubdomain(
                  this.enterprise!.id
                );
                break;
              case SignupStatus.CertificateCreationFailed:
                retryAPI = this.signupService.resumeCertificate(
                  this.enterprise!.id
                );
                break;
              case SignupStatus.IngressCreationFailed:
                retryAPI = this.signupService.resumeIngress(
                  this.enterprise!.id
                );
                break;
              case SignupStatus.DIDJsonCreationFailed:
                retryAPI = this.signupService.resumeDID(this.enterprise!.id);
                break;
              case SignupStatus.ParticipantJsonCreationFailed:
                retryAPI = this.signupService.resumeParticipant(
                  this.enterprise!.id
                );
                break;
            }

            if (
              this.currentSignupStatus !==
              SignupStatus.CertificateCreationInProgress
            ) {
              retryAPI?.subscribe({
                next: (response) => this.checkStatus(),
                error: (error) => this.checkStatus(),
                complete: () => {},
              });
            } else {
              this.checkStatus();
            }
          } else if (
            this.currentSignupStatus === SignupStatus.ParticipantJsonCreated
          ) {
            this.isSignupInProgress = false;
          } else {
            this.checkStatus();
          }
        },
        error: (error) => this.checkStatus(),
        complete: () => {},
      });
    }, 5000);
  };

  // checkStatus = () => {
  //   const start = 0;
  //   const interval = setInterval(() => {
  //     console.log(this.currentSignupStatus);
  //     if (this.isCertificateCreationInProgress()) {
  //       this.showCertificationCreationMessages();
  //     } else if (
  //       !this.isCertificateCreationInProgress() &&
  //       this.certificateCreationInterval
  //     ) {
  //       clearInterval(this.certificateCreationInterval);
  //     }
  //     this.currentSignupStatus += 2;
  //     if (this.currentSignupStatus === SignupStatus.ParticipantJsonCreated) {
  //       clearInterval(interval);
  //     }
  //   }, 5000);
  // };

  onCloseDialog() {
    this.dialogRef.close();
  }

  onLoginClick = () => {
    this.onCloseDialog();
    this.sharedService.clearSession();
    this.route.navigate([RouteConstants.Login]);
  };

  showCertificationCreationMessages = () => {
    if (!this.certificateCreationInterval) {
      this.certificateCreationInterval = setInterval(() => {
        this.processTextIndex %= 5;
        this.processTextToShow =
          this.certificatCreationText[this.processTextIndex];
        this.processTextIndex += 1;
      }, 5000);
    }
  };

  isCertificateCreationInProgress = () => {
    return (
      this.currentSignupStatus === SignupStatus.DomainCreated ||
      this.currentSignupStatus === SignupStatus.CertificateCreationFailed ||
      this.currentSignupStatus === SignupStatus.CertificateCreationInProgress
    );
  };
}
