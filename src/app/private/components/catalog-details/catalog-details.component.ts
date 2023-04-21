import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { ServiceOfferResponsePayloadModel } from '../../models';
import { ServiceOfferingService } from '../../services';

@Component({
  selector: 'app-catalog-details',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatExpansionModule, MatTooltipModule],
  templateUrl: './catalog-details.component.html',
  styleUrls: ['./catalog-details.component.scss'],
})
export class CatalogDetailsComponent {
  panelOpenState = false;
  service: ServiceOfferResponsePayloadModel;
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private serviceOfferingService: ServiceOfferingService
  ) {}
  ngOnInit() {
    const { service } = window.history.state;
    if (service) {
      this.service = service;
    } else {
      const id = this.route.snapshot.queryParamMap.get('id');
      if (id) {
        this.getServiceOfferingDetail(id);
      } else {
        //TODO 404
      }
    }
  }

  getServiceOfferingDetail(id: string) {
    this.serviceOfferingService.getServiceOffersDetail(id).subscribe((data) => {
      this.service = data.payload;
    });
  }

  onBack = () => {
    this.location.back();
  };
}
