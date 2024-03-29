import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import {
  NgxQRCodeModule,
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
} from '@techiediaries/ngx-qrcode';
import { SignStepOneModel, SignupQRResponse } from 'src/app/public/models';
import { SignUpService } from 'src/app/public/services';
import { FormBaseComponent } from 'src/app/shared/components';
import { RouteConstants, ValidationConstant } from 'src/app/shared/constants';
import { APIStatus } from 'src/app/shared/enums';
import { SharedService } from 'src/app/shared/services';

@Component({
  selector: 'app-signup-step-one',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxQRCodeModule,
  ],
  templateUrl: './signup-step-one.component.html',
  styleUrls: ['./signup-step-one.component.scss'],
})
export class SignupStepOneComponent
  extends FormBaseComponent
  implements OnInit
{
  @Input() stepOneFormData: SignStepOneModel | undefined;
  @Output() onStepOneComplete = new EventEmitter<SignStepOneModel>();

  // Constant variables
  readonly validationMsg = new ValidationConstant();
  readonly APIStatus = APIStatus;
  readonly NgxQrcodeElementTypes = NgxQrcodeElementTypes;
  readonly NgxQrcodeErrorCorrectionLevels = NgxQrcodeErrorCorrectionLevels;

  signupQRResponse: SignupQRResponse;
  apiStatus: APIStatus = APIStatus.Pending;

  constructor(
    protected override fb: FormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private signupService: SignUpService
  ) {
    super(fb);
  }

  ngOnInit(): void {
    this.getSignupQR();
  }

  onSignInClick = () => {
    this.router.navigate([RouteConstants.Login]);
  };

  onProceedClick = () => {
    this.signupService
      .verifyConnection(this.signupQRResponse.data.connection.id)
      .subscribe((response) => {
        if (response && response.data.records.status === 'trusted') {
          this.onStepOneComplete.emit({
            connectionId: this.signupQRResponse.data.connection.id,
          });
        } else {
          this.sharedService.setSnackBar('Connection not trusted');
        }
      });
  };

  // Helper methods
  getSignupQR = () => {
    this.apiStatus = APIStatus.InProgress;
    this.signupService.getSignupQR().subscribe({
      next: (response) => {
        this.signupQRResponse = response;
        this.apiStatus = APIStatus.Success;
      },
      error: (error) => {
        this.apiStatus = APIStatus.Failure;
      },
      complete: () => {},
    });
  };

  doLogout() {
    this.sharedService.clearSession();
    this.router.navigate([RouteConstants.Login]);
  }
}
