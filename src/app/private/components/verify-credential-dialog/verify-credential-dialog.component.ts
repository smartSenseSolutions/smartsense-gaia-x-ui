import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-verify-credential-dialog',
  standalone: true,
  imports: [CommonModule , MatIconModule , MatButtonModule],
  templateUrl: './verify-credential-dialog.component.html',
  styleUrls: ['./verify-credential-dialog.component.scss']
})
export class VerifyCredentialDialogComponent {

  onCloseDialog=() => {

  }
}
