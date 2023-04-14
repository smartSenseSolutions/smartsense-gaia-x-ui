import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductData } from '../../models';

@Component({
  selector: 'app-service-catalog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './service-catalog.component.html',
  styleUrls: ['./service-catalog.component.scss'],
})
export class ServiceCatalogComponent {
  productList: ProductData[] = [
    {
      image: '../../../../assets/images/service-catalog-1.png',
      title: 'Title',
      articleNumber: 'knaji91',
      group: 'BE POSITIVE',
      gtinNumber: 888898,
    },
  ];
}
