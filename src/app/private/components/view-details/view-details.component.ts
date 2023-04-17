import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-view-details',
  standalone: true,
  imports: [CommonModule , MatIconModule , MatButtonModule],
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent {

}
