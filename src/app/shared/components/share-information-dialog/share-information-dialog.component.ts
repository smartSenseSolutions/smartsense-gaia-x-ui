import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-share-information-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './share-information-dialog.component.html',
  styleUrls: ['./share-information-dialog.component.scss'],
})
export class ShareInformationDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ShareInformationDialogComponent>
  ) {}
  ngOnInit() {}

  onCloseDialog(flag: boolean) {
    this.dialogRef.close(flag);
  }
}
