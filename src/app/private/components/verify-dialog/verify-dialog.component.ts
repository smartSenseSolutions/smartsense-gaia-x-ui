import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { verified } from '../../models';

@Component({
  selector: 'app-verify-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './verify-dialog.component.html',
  styleUrls: ['./verify-dialog.component.scss'],
})
export class VerifyDialogComponent implements OnInit {
  isProcessingLoader = true;
  isVerifiedCertificate = true;
  verified: verified = {
    creatingDomain: true,
    creatingKeys: true,
    settingUpDomainName: true,
    creatingUniqueIdentity: true,
    isSignerVerified: true,
  };

  ngOnInit() {
    this.initialization();
  }

  initialization() {
    setTimeout(() => {
      this.isProcessingLoader = false;
    }, 11000);
  }

  onCloseDialog() {}
}
