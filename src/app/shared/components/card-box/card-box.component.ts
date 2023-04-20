import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ServiceOfferResponsePayloadModel } from '../../../private/models';

@Component({
  selector: 'app-card-box',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './card-box.component.html',
  styleUrls: ['./card-box.component.scss'],
})
export class CardBoxComponent {
  @Input() serviceList: ServiceOfferResponsePayloadModel[] = [];
  @Input() showCompany: boolean = true;
  @Output() onViewDetailClickEvent =
    new EventEmitter<ServiceOfferResponsePayloadModel>();

  image: string = '../../../../assets/images/service-catalog-1.png';

  onViewDetailsClick = (service: ServiceOfferResponsePayloadModel) => {
    this.onViewDetailClickEvent.emit(service);
  };
}
