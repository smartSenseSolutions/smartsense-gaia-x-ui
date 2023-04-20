import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CardBoxComponent } from '../../../shared/components/card-box/card-box.component';
import { ServiceOfferResponsePayloadModel } from '../../models';
import { ServiceOfferingService } from '../../services';

@Component({
  selector: 'app-my-service-offerings',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, CardBoxComponent],
  templateUrl: './my-service-offerings.component.html',
  styleUrls: ['./my-service-offerings.component.scss'],
})
export class MyServiceOfferingsComponent implements OnInit {
  serviceList: ServiceOfferResponsePayloadModel[] = [];

  constructor(private serviceOfferingService: ServiceOfferingService) {}

  ngOnInit(): void {
    this.getServiceOffering();
  }

  getServiceOffering() {
    this.serviceOfferingService.getServiceOffers({}).subscribe((data) => {
      this.serviceList = data.payload;
    });
  }
}
