import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
  NgxQRCodeModule,
} from '@techiediaries/ngx-qrcode';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import {
  Meta,
  ServiceOfferResponsePayloadModel,
  ServiceOfferVPQRResponseModel,
  VPResponsePayloadModel,
} from 'src/app/private/models';
import { ServiceOfferingService } from 'src/app/private/services';
import { LoginService } from 'src/app/public/services';
import {
  DataShareEnum,
  MAX_POLL_COUNT,
  PollStatus,
  POLL_INTERVAL,
} from '../../constants';
import { APIStatus } from '../../enums/base.enum';

@Component({
  selector: 'app-share-information-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule, NgxJsonViewerModule, NgxQRCodeModule],
  templateUrl: './share-information-dialog.component.html',
  styleUrls: ['./share-information-dialog.component.scss'],
})
export class ShareInformationDialogComponent implements OnInit {
  meta: Meta;
  readonly DataShareEnum = DataShareEnum;
  readonly APIStatus = APIStatus;
  readonly MAX_POLL_COUNT = MAX_POLL_COUNT;
  readonly NgxQrcodeElementTypes = NgxQrcodeElementTypes;
  readonly NgxQrcodeErrorCorrectionLevels = NgxQrcodeErrorCorrectionLevels;
  activeState: DataShareEnum = DataShareEnum.START;
  vp: VPResponsePayloadModel;
  pollCount: number = 0;
  tinyLoginUrl: string;
  pollStatus: PollStatus;
  serviceOfferVPQRResponse: ServiceOfferVPQRResponseModel | null;
  checkStatusTimeOut: ReturnType<typeof setTimeout>;
  loginQrApiStatus: APIStatus = APIStatus.Pending;

  constructor(
    public dialogRef: MatDialogRef<ShareInformationDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private serivce: ServiceOfferResponsePayloadModel,
    private serviceOfferingService: ServiceOfferingService,
    private loginService: LoginService
  ) {}
  ngOnInit() {}

  onCloseDialog(flag: boolean) {
    if (flag) {
      this.serivce.meta = this.meta;
      this.dialogRef.close(this.serivce);
    } else {
      this.dialogRef.close(flag);
    }
  }

  // getServiceOffersDetailWithOfferId(
  //   request: VPRequestPayloadModel,
  //   id: number
  // ) {
  //   this.serviceOfferingService
  //     .getServiceOffersDetailWithOfferId(request, id)
  //     .subscribe(
  //       (data) => {
  //         this.activeState = DataShareEnum.SUCCESS;
  //         this.meta = data.payload;
  //       },
  //       (err) => {
  //         this.activeState = DataShareEnum.FAILED;
  //       }
  //     );
  // }

  generateQR() {
    this.pollCount = 0;
    this.tinyLoginUrl = '';
    this.loginQrApiStatus = APIStatus.InProgress;
    this.activeState = DataShareEnum.VP_GENERATE;
    this.serviceOfferingService.getServiceOffersVPQR().subscribe((response) => {
      const request = {
        url: response.data.presentationMessage,
      };
      this.loginService.shortenUrl(request).subscribe({
        next: (tinyUrlResponse) => {
          this.tinyLoginUrl = tinyUrlResponse.payload.url;
          this.serviceOfferVPQRResponse = response;
          this.activeState = DataShareEnum.VERIFYING;
          this.loginQrApiStatus = APIStatus.Success;
          this.getPollStatus();
        },
        error: (error) => {
          this.loginQrApiStatus = APIStatus.Failure;
        },
        complete: () => {},
      });
    });
    // this.serviceOfferingService
    //   .getParticipantVP('participant')
    //   .subscribe((data) => {
    //     this.activeState = DataShareEnum.VERIFYING;
    //     this.verifyVP();
    //     this.vp = data.payload;
    //     this.getServiceOffersDetailWithOfferId(data.payload, this.serivce.id);
    //   });
  }

  // verifyVP(presentationId: string) {
  //   const request = {
  //     presentationId,
  //   };
  //   this.getServiceOffersDetailWithOfferId(request, this.serivce.id);
  // }

  onReloadQRClick = () => {
    this.generateQR();
  };

  getPollStatus = () => {
    if (this.checkStatusTimeOut) {
      clearTimeout(this.checkStatusTimeOut);
    }
    this.checkStatusTimeOut = setTimeout(() => {
      const request = {
        presentationId: this.serviceOfferVPQRResponse!.data.presentationId,
      };
      this.serviceOfferingService
        .getServiceOffersDetailWithOfferId(request, this.serivce.id)
        .subscribe({
          next: (response) => {
            this.pollStatus = response.payload.status;
            this.pollCount++;
            if (
              this.pollCount === MAX_POLL_COUNT ||
              this.pollStatus === PollStatus.Done
            ) {
              clearTimeout(this.checkStatusTimeOut);
              this.activeState = DataShareEnum.SUCCESS;
              this.meta = response.payload.meta;
            } else {
              this.getPollStatus();
            }
          },
          error: (error) => {
            this.pollCount++;
            this.getPollStatus();
          },
          complete: () => {},
        });
    }, POLL_INTERVAL);
  };
}
