import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-catalog-details',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatExpansionModule, MatTooltipModule],
  templateUrl: './catalog-details.component.html',
  styleUrls: ['./catalog-details.component.scss'],
})
export class CatalogDetailsComponent {
  panelOpenState = false;
}
