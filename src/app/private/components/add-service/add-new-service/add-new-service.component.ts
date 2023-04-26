import { CommonModule, Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { AddServiceModel } from 'src/app/private/models';
import { FormBaseComponent } from 'src/app/shared/components';
import { AddServiceValidationConstant, RouteConstants } from 'src/app/shared/constants';
import {
  ACCESS_TYPES,
  FORMAT_TYPES,
  REQUEST_TYPES,
} from './add-new-service.constants';

@Component({
  selector: 'app-add-new-service',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './add-new-service.component.html',
  styleUrls: ['./add-new-service.component.scss'],
})
export class AddNewServiceComponent
  extends FormBaseComponent
  implements OnInit
{
  @Input() addServiceFormData: AddServiceModel | undefined;
  @Output() onAddServiceFormComplete = new EventEmitter<AddServiceModel>();

  readonly ACCESS_TYPES = ACCESS_TYPES;
  readonly REQUEST_TYPES = REQUEST_TYPES;
  readonly FORMAT_TYPES = FORMAT_TYPES;

  addServiceForm: any;
  validationMsg = new AddServiceValidationConstant();

  constructor(fb: FormBuilder, private location: Location , private route : Router) {
    super(fb);
  }

  ngOnInit() {
    this.initialization();
  }

  initialization = () => {
    this.addServiceForm = new FormGroup({
      name: new FormControl(
        this.addServiceFormData ? this.addServiceFormData.name : '',
        Validators.required
      ),
      policy: new FormControl(
        this.addServiceFormData ? this.addServiceFormData.policy : '',
        Validators.required
      ),
      description: new FormControl(
        this.addServiceFormData ? this.addServiceFormData.description : '',
        Validators.required
      ),
      accessType: new FormControl(
        this.addServiceFormData ? this.addServiceFormData.accessType : ACCESS_TYPES[0].value,
        Validators.required
      ),
      requestType: new FormControl(
        this.addServiceFormData ? this.addServiceFormData.requestType : REQUEST_TYPES[0].value,
        Validators.required
      ),
      formatType: new FormControl(
        this.addServiceFormData ? this.addServiceFormData.formatType : FORMAT_TYPES[0].value,
        Validators.required
      ),
      terms: new FormControl(
        this.addServiceFormData ? this.addServiceFormData.terms : '',
        Validators.required
      ),
    });
  };

  onAddServiceFormSubmit = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      this.onAddServiceFormComplete.emit(form.getRawValue());
    }
  };

  onBackClick = () => {
    this.location.back();
  };

  get formControls() {
    return this.addServiceForm.controls;
  }

  onCancel = () => {
    this.route.navigate([
      `${RouteConstants.SmartX}/${RouteConstants.MyServiceOfferings}`,
    ])
  }
}
