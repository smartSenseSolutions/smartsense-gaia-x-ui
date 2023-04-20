import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { RouteConstants } from 'src/app/shared/constants';
import { CardBoxComponent } from '../../../shared/components/card-box/card-box.component';
import { ServiceOfferResponsePayloadModel } from '../../models';
import { ServiceOfferingService } from '../../services';

@Component({
  selector: 'app-my-service-offerings',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    CardBoxComponent,
    RouterModule,
  ],
  templateUrl: './my-service-offerings.component.html',
  styleUrls: ['./my-service-offerings.component.scss'],
})
export class MyServiceOfferingsComponent implements OnInit {
  serviceList: ServiceOfferResponsePayloadModel[] = [];

  constructor(
    private serviceOfferingService: ServiceOfferingService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getServiceOffering();
  }

  getServiceOffering() {
    this.serviceOfferingService.getServiceOffers({}).subscribe((data) => {
      this.serviceList = data.payload;
    });
  }

  redirect() {
    this.route.navigateByUrl(
      `${RouteConstants.SmartX}/${RouteConstants.MyServiceOfferings}/${RouteConstants.AddNewService}`
    );
  }
}
