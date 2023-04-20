import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SignupRequestModel } from 'src/app/public/models';
import { SignUpService } from 'src/app/public/services';
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
  interval?: number;

  // Status variables
  currentSignupStatus = SignupStatus.Pending;
  isSignupInProgress = true;
  constructor(
    private signupService: SignUpService,
    public dialogRef: MatDialogRef<VerifyDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: {
      enterprise: EnterpriseModel;
      signupRequest: SignupRequestModel;
    }
  ) {}

  ngOnInit() {
    this.enterprise = this.data.enterprise;
    this.checkStatus();
  }

  checkStatus = () => {
    this.interval = window.setInterval(() => {
      this.signupService
        .getEnterprise(this.enterprise!.id)
        .subscribe((response) => {
          this.currentSignupStatus = response.status;
          if (FAILURE_STATUSES.includes(this.currentSignupStatus)) {
            clearInterval(this.interval);
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
            retryAPI?.subscribe((response) => {
              this.checkStatus();
            });
          }
          if (this.currentSignupStatus === SignupStatus.ParticipantJsonCreated){
            clearInterval(this.interval)
            this.isSignupInProgress = false
          }
        });
    }, 1000);
  };

  onCloseDialog() {
    this.dialogRef.close();
  }
}
