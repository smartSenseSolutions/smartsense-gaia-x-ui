import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductData } from '../../models';
import { CardBoxComponent } from '../../../shared/components/card-box/card-box.component';

@Component({
  selector: 'app-my-service-offerings',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, CardBoxComponent],
  templateUrl: './my-service-offerings.component.html',
  styleUrls: ['./my-service-offerings.component.scss'],
})
export class MyServiceOfferingsComponent {
  productList: ProductData[] = [
    {
      image: '../../../../assets/images/service-catalog-1.png',
      title: 'Title',
      articleNumber: 'knaji91',
      group: 'BE POSITIVE',
      gtinNumber: 888898,
    },
    {
      image: '../../../../assets/images/service-catalog-1.png',
      title: 'Title',
      articleNumber: 'knaji91',
      group: 'BE POSITIVE',
      gtinNumber: 888898,
    },
    {
      image: '../../../../assets/images/service-catalog-1.png',
      title: 'Title',
      articleNumber: 'knaji91',
      group: 'BE POSITIVE',
      gtinNumber: 888898,
    },
    {
      image: '../../../../assets/images/service-catalog-1.png',
      title: 'Title',
      articleNumber: 'knaji91',
      group: 'BE POSITIVE',
      gtinNumber: 888898,
    },
  ];
}
