import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { FormBaseComponent } from 'src/app/shared/components';
import { AddServiceValidationConstant } from 'src/app/shared/constants';

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
    MatButtonModule
  ],
  templateUrl: './add-new-service.component.html',
  styleUrls: ['./add-new-service.component.scss'],
})
export class AddNewServiceComponent
  extends FormBaseComponent
  implements OnInit
{
  addServiceForm: any;
  validationMsg = new AddServiceValidationConstant();

  constructor(fb: FormBuilder) {
    super(fb);
  }

  ngOnInit() {
    this.initialization();
  }

  initialization = () => {
    this.addServiceForm = new FormGroup({
      serviceName: new FormControl('', Validators.required),
      policies: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      accessType: new FormControl('', Validators.required),
      requestType: new FormControl('', Validators.required),
      formatType: new FormControl('', Validators.required),
      termsAndCondition: new FormControl('', Validators.required),
    });
  };

  onAddServiceFormSubmit = (form: FormGroup) => {};

  get formControls() {
    return this.addServiceForm.controls;
  }
}
