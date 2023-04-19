import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SignupRequestModel } from 'src/app/public/models';
import { EnterpriseModel } from '../../models/enterprise.model';
import { SignUpService } from 'src/app/public/services';
import { FAILURE_STATUSES, SignupStatus } from './verify-dialog.constants';

@Component({
  selector: 'app-verify-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule],
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
  constructor(
    private signupService: SignUpService,
    public dialogRef: MatDialogRef<VerifyDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { signupRequest: SignupRequestModel }
  ) {}

  ngOnInit() {
    this.signup();
  }

  signup() {
    // this.signupService.signup(this.data.signupRequest).subscribe((response) => {
    //   this.enterprise = response.payload;
    this.checkStatus();
    // });
  }

  checkStatus = () => {
    const start = 0;
    const interval = setInterval(() => {
      //   this.signupService
      //     .getEnterprise(this.enterprise!.id)
      //     .subscribe((response) => {
      //       this.currentSignupStatus = response.status;
      //       // TODO Add switch case for all failures
      //       if (
      //         this.currentSignupStatus === SignupStatus.ParticipantJsonCreated
      //       ) {
      //         this.isSignupInProgress = false;
      //         clearInterval(interval);
      //       }
      //     });
      this.currentSignupStatus += 1;
      if (this.currentSignupStatus === SignupStatus.ParticipantJsonCreated) {
        clearInterval(interval);
      }
    }, 1000);
  };

  onCloseDialog() {}
}
