import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels, NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import {
  Meta,
  ServiceOfferResponsePayloadModel,
  ServiceOfferVPQRResponseModel,
  VPRequestPayloadModel,
  VPResponsePayloadModel,
} from 'src/app/private/models';
import { ServiceOfferingService } from 'src/app/private/services';
import { DataShareEnum, MAX_POLL_COUNT, PollStatus, POLL_INTERVAL } from '../../constants';

@Component({
  selector: 'app-share-information-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule, NgxJsonViewerModule,NgxQRCodeModule],
  templateUrl: './share-information-dialog.component.html',
  styleUrls: ['./share-information-dialog.component.scss'],
})
export class ShareInformationDialogComponent implements OnInit {
  meta: Meta;
  readonly DataShareEnum = DataShareEnum;
  activeState: DataShareEnum = DataShareEnum.START;
  vp: VPResponsePayloadModel;
  pollCount: number = 0;
  pollStatus: PollStatus;
  serviceOfferVPQRResponse: ServiceOfferVPQRResponseModel | null;
  checkStatusTimeOut: ReturnType<typeof setTimeout>;
  readonly NgxQrcodeElementTypes = NgxQrcodeElementTypes;
  readonly NgxQrcodeErrorCorrectionLevels = NgxQrcodeErrorCorrectionLevels;
  
  constructor(
    public dialogRef: MatDialogRef<ShareInformationDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private serivce: ServiceOfferResponsePayloadModel,
    private serviceOfferingService: ServiceOfferingService
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
    this.activeState = DataShareEnum.VP_GENERATE;
    this.serviceOfferingService.getServiceOffersVPQR().subscribe((data) => {
      this.serviceOfferVPQRResponse = data;
      this.activeState = DataShareEnum.VERIFYING;
      this.getPollStatus();
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
      this.serviceOfferingService.getServiceOffersDetailWithOfferId(request,this.serivce.id).subscribe({
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
            // this.sharedService.setUser(response.payload.session);
            // this.sharedService.setToken(response.payload.token);
            // this.router.navigate([
            //   `${RouteConstants.SmartX}/${RouteConstants.DashBoard}`,
            // ]);
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
