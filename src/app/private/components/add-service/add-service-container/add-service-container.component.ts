import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  AddServiceDataModel,
  AddServiceModel,
  AddServiceOfferRequest,
  LabelLevelModel,
} from 'src/app/private/models';
import { ServiceOfferingService } from 'src/app/private/services';
import { RouteConstants } from 'src/app/shared/constants';

import { AddNewServiceComponent } from '../add-new-service/add-new-service.component';
import { AddServiceDataComponent } from '../add-service-data/add-service-data.component';
import { AddServiceStep } from './add-service-container.constants';
import { LabelLevelComponent } from '../label-level/label-level.component';

@Component({
  selector: 'app-add-service-container',
  standalone: true,
  imports: [
    CommonModule,
    AddNewServiceComponent,
    AddServiceDataComponent,
    LabelLevelComponent,
  ],
  templateUrl: './add-service-container.component.html',
  styleUrls: ['./add-service-container.component.scss'],
})
export class AddServiceContainerComponent {
  // Constant variables
  readonly AddServiceStep = AddServiceStep;

  stepOneData: AddServiceModel | undefined;
  stepTwoData: AddServiceDataModel | undefined;
  stepThreeData: any | undefined;

  // Status variables
  activeStep: AddServiceStep = AddServiceStep.ONE;

  constructor(
    private router: Router,
    private serviceOfferingService: ServiceOfferingService
  ) {}

  onStepOneComplete = (stepOneData: AddServiceModel) => {
    this.activeStep = AddServiceStep.TWO;
    this.stepOneData = stepOneData;
  };

  onStepTwoComplete = (stepTwoData: AddServiceDataModel) => {
    this.activeStep = AddServiceStep.THREE;
    this.stepTwoData = stepTwoData;
  };

  onStepThreeComplete = (stepThreeData: any) => {
    this.stepThreeData = stepThreeData;

    const addServiceRequest: AddServiceOfferRequest = {
      ...this.stepOneData!,
      ...this.stepTwoData!,
      labelLevel: stepThreeData,
    };

    this.serviceOfferingService
      .createServiceOffer(addServiceRequest)
      .subscribe((response) => {
        this.router.navigate([
          `${RouteConstants.SmartX}/${RouteConstants.MyServiceOfferings}`,
        ]);
      });
  };

  onBackClick = (stepTwoData: AddServiceDataModel) => {
    this.stepTwoData = stepTwoData;
    this.activeStep = AddServiceStep.ONE;
  };
}
