import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CardBoxComponent } from '../../../shared/components/card-box/card-box.component';
import { ProductData } from '../../models';

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
      title : 'Ball Bearing',
      discription : 'This Vacuum Pump encompasses four different types of mechanism for the engines above 2000 bhp.',
      company : 'Hella KGaA Hueck & Co.'
    },
    {
      image: '../../../../assets/images/service-catalog-1.png',
      title : 'Ball Bearing',
      discription : 'This Vacuum Pump encompasses four different types of mechanism for the engines above 2000 bhp.',
      company : 'Hella KGaA Hueck & Co.'
    },
    {
      image: '../../../../assets/images/service-catalog-1.png',
      title : 'Ball Bearing',
      discription : 'This Vacuum Pump encompasses four different types of mechanism for the engines above 2000 bhp.',
      company : 'Hella KGaA Hueck & Co.'
    },
    {
      image: '../../../../assets/images/service-catalog-1.png',
      title : 'Ball Bearing',
      discription : 'This Vacuum Pump encompasses four different types of mechanism for the engines above 2000 bhp.',
      company : 'Hella KGaA Hueck & Co.'
    },
  ];
}
