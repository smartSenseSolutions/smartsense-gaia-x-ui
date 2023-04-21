import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  AddServiceDataModel,
  AddServiceModel,
  AddServiceOfferRequest,
} from 'src/app/private/models';
import { ServiceOfferingService } from 'src/app/private/services';
import { RouteConstants } from 'src/app/shared/constants';
import { AddServiceStep } from './add-service-container.constants';
import { AddNewServiceComponent } from '../add-new-service/add-new-service.component';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-add-service-container',
  standalone: true,
  imports: [CommonModule, AddNewServiceComponent, AddCategoryComponent],
  templateUrl: './add-service-container.component.html',
  styleUrls: ['./add-service-container.component.scss'],
})
export class AddServiceContainerComponent {
  // Constant variables
  readonly AddServiceStep = AddServiceStep;

  stepOneData: AddServiceModel | undefined;
  stepTwoData: AddServiceDataModel | undefined;

  // Status variables
  activeStep: AddServiceStep = AddServiceStep.ONE;

  constructor(
    private router: Router,
    private serviceOfferingService: ServiceOfferingService
  ) {}

  onStepOneComplete = (stepOneData: AddServiceModel) => {
    debugger
    this.activeStep = AddServiceStep.TWO;
    this.stepOneData = stepOneData;
    console.log(this.stepOneData)
  };

  onStepTwoComplete = (stepTwoData: AddServiceDataModel) => {
    this.stepTwoData = stepTwoData;
    const addServiceRequest: AddServiceOfferRequest = {
      ...this.stepOneData!,
      ...this.stepTwoData,
    };
    console.log(addServiceRequest)
    // this.serviceOfferingService
    //   .createServiceOffer(addServiceRequest)
    //   .subscribe((response) => {
        this.router.navigate([
          `${RouteConstants.SmartX}/${RouteConstants.MyServiceOfferings}`,
        ]);
      // });
  };

  onBackClick = () => {
    this.activeStep = AddServiceStep.ONE;
  };
}
