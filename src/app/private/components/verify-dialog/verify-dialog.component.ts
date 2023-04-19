import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SignupRequestModel } from 'src/app/public/models';
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

  // Status variables
  currentSignupStatus =  SignupStatus.Pending;
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
    this.signupService.signup(this.data.signupRequest).subscribe((response) => {
      this.checkStatus();
    });
  }

  checkStatus = () => {
    const interval = setInterval(() => {
      this.signupService.getStatus().subscribe((response) => {
        this.currentSignupStatus = response.status;
        if (FAILURE_STATUSES.includes(response.status)) {
          this.signupService.retrySignup().subscribe();
        }
        if (this.currentSignupStatus === SignupStatus.ParticipantJsonCreated) {
          this.isSignupInProgress = false;
          clearInterval(interval);
        }
      });
    }, 1000);
  };

  onCloseDialog() {}
}
