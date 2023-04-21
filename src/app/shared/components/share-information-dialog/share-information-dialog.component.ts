import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import {
  Meta,
  ServiceOfferResponsePayloadModel,
  VPResponsePayloadModel,
} from 'src/app/private/models';
import { ServiceOfferingService } from 'src/app/private/services';
import { DataShareEnum } from '../../constants';

@Component({
  selector: 'app-share-information-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule, NgxJsonViewerModule],
  templateUrl: './share-information-dialog.component.html',
  styleUrls: ['./share-information-dialog.component.scss'],
})
export class ShareInformationDialogComponent implements OnInit {
  meta: Meta;
  readonly DataShareEnum = DataShareEnum;
  activeState: DataShareEnum = DataShareEnum.START;
  vp: VPResponsePayloadModel;
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

  getServiceOffersDetailWithOfferId(vp: VPResponsePayloadModel, id: number) {
    this.serviceOfferingService
      .getServiceOffersDetailWithOfferId(vp, id)
      .subscribe(
        (data) => {
          this.activeState = DataShareEnum.SUCCESS;
          this.meta = data.payload;
        },
        (err) => {
          this.activeState = DataShareEnum.FAILED;
        }
      );
  }

  generateVP() {
    this.activeState = DataShareEnum.VP_GENERATE;
    this.serviceOfferingService
      .getParticipantVP('participant')
      .subscribe((data) => {
        this.activeState = DataShareEnum.VERIFYING;
        this.vp = data.payload;
        // this.getServiceOffersDetailWithOfferId(data.payload, this.serivce.id);
      });
  }

  verifyVP() {
    this.getServiceOffersDetailWithOfferId(this.vp, this.serivce.id);
  }
}
