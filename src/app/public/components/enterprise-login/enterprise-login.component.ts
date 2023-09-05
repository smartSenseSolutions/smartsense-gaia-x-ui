import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
import { APIStatus, UserType } from 'src/app/shared/enums';
import { SharedService } from 'src/app/shared/services';

import { RouteConstants } from 'src/app/shared/constants';
import {
  EnterpriseLoginPollResponseModel,
  EnterpriseQRLoginResponseModel,
} from '../../models';
import { LoginService } from '../../services';
import {
  MAX_POLL_COUNT,
  POLL_INTERVAL,
  PollStatus,
} from './enterprise-login.constants';

@Component({
  selector: 'app-enterprise-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxQRCodeModule,
  ],
  templateUrl: './enterprise-login.component.html',
  styleUrls: ['./enterprise-login.component.scss'],
})
export class EnterpriseLoginComponent implements OnInit {
  // Constant variables
  readonly UserType = UserType;
  readonly APIStatus = APIStatus;
  readonly MAX_POLL_COUNT = MAX_POLL_COUNT;
  readonly POLL_INTERVAL = POLL_INTERVAL;
  readonly NgxQrcodeElementTypes = NgxQrcodeElementTypes;
  readonly NgxQrcodeErrorCorrectionLevels = NgxQrcodeErrorCorrectionLevels;

  enterpriseQRLoginResponse: EnterpriseQRLoginResponseModel | null;
  tinyLoginUrl: string;
  enterpriseLoginPollResponse: EnterpriseLoginPollResponseModel;
  loginQrApiStatus: APIStatus = APIStatus.Pending;

  pollCount: number = 0;
  pollStatus: PollStatus;

  checkStatusTimeOut: ReturnType<typeof setTimeout>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getLoginQR();
  }

  onReloadQRClick = () => {
    this.getLoginQR();
  };

  pollLoginStatus = () => {
    if (this.checkStatusTimeOut) {
      clearTimeout(this.checkStatusTimeOut);
    }
    this.checkStatusTimeOut = setTimeout(() => {
      const request = {
        presentationId: this.enterpriseQRLoginResponse!.data.proofRecordId,
      };
      this.loginService.pollLoginStatus(request).subscribe({
        next: (response) => {
          this.pollStatus = response.payload.status;
          this.pollCount++;
          if (this.pollStatus === PollStatus.Done) {
            clearTimeout(this.checkStatusTimeOut);
            this.sharedService.setUser(response.payload.session);
            this.sharedService.setToken(response.payload.token);
            this.router.navigate([
              `${RouteConstants.SmartX}/${RouteConstants.DashBoard}`,
            ]);
          } else if (this.pollCount < MAX_POLL_COUNT) {
            this.pollLoginStatus();
          }
        },
        error: (error) => {
          this.pollCount++;
          if (this.pollCount < MAX_POLL_COUNT) {
            this.pollLoginStatus();
          }
        },
        complete: () => {},
      });
    }, POLL_INTERVAL);
  };

  // Helper methods
  getLoginQR = () => {
    this.pollCount = 0;
    this.enterpriseQRLoginResponse = null;
    this.tinyLoginUrl = '';
    this.loginQrApiStatus = APIStatus.InProgress;
    this.loginService.getLoginQR().subscribe({
      next: (response) => {
        const request = {
          url: response.data.presentationMessage,
        };
        this.loginService.shortenUrl(request).subscribe({
          next: (tinyUrlResponse) => {
            this.enterpriseQRLoginResponse = response;
            this.tinyLoginUrl = tinyUrlResponse.payload.url;
            this.loginQrApiStatus = APIStatus.Success;
            this.pollLoginStatus();
          },
          error: (error) => {
            this.loginQrApiStatus = APIStatus.Failure;
          },
          complete: () => {},
        });
      },
      error: (error) => {
        this.loginQrApiStatus = APIStatus.Failure;
      },
      complete: () => {},
    });
  };
}
