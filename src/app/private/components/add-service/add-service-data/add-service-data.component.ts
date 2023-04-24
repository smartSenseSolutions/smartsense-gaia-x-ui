import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AddServiceDataModel } from 'src/app/private/models';
import { FormBaseComponent } from 'src/app/shared/components';
import { ValidationConstant } from 'src/app/shared/constants';

@Component({
  selector: 'app-add-service-data',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './add-service-data.component.html',
  styleUrls: ['./add-service-data.component.scss'],
})
export class AddServiceDataComponent
  extends FormBaseComponent
  implements OnInit
{
  @Input() addServiceDataFormData: AddServiceDataModel | undefined;
  @Output() onAddServiceDataComplete = new EventEmitter<AddServiceDataModel>();
  @Output() onBackEventClick = new EventEmitter<void>();

  // Constant variables
  readonly validationMsg = new ValidationConstant();

  addServiceDataForm: any;

  ngOnInit() {
    if (this.addServiceDataFormData) {
      // If service data already available then prefill the data
      const groups = Object.keys(this.addServiceDataFormData.meta);
      this.initialize();
      for (let groupName of groups) {
        // Loop all groups in already available data to prefill the form
        const groupParameters = this.addServiceDataFormData.meta[groupName];
        this.addGroup(groupName, groupParameters);
      }
    } else {
      // If no previous data available then create fresh empty form
      this.initialize();
      this.addGroup();
    }
  }

  initialize = () => {
    this.addServiceDataForm = this.fb.group({
      meta: this.fb.array([]),
    });
  };

  addGroup = (groupName?: String, parameters?: { [key: string]: string }) => {
    let parameterForms: FormGroup[] = [];
    if (parameters) {
      // If group and parameters passed to function then create form group for each parameter & populate group with this data.
      const parameterKeys = Object.keys(parameters);
      for (const key of parameterKeys) {
        parameterForms.push(
          this.fb.group({
            name: [key, Validators.required],
            value: [parameters[key], Validators.required],
          })
        );
      }
    } else { // If not data passed then create an empty parameter form group & populate group with this empty parameter form group.
      parameterForms.push(
        this.fb.group({
          name: ['', Validators.required],
          value: ['', Validators.required],
        })
      );
    }

    const dataGroupForm = this.fb.group({
      name: [groupName || '', Validators.required],
      parameters: this.fb.array(parameterForms),
    });
    this.metaGroups.push(dataGroupForm);
    this.metaGroups.updateValueAndValidity();
  };

  removeGroup = (index: number) => {
    this.metaGroups.removeAt(index);
    this.metaGroups.updateValueAndValidity();
  };

  addGroupParameter = (index: number) => {
    const parameters = this.metaGroupParameters(index);
    const parameterForm = this.fb.group({
      name: ['', Validators.required],
      value: ['', Validators.required],
    });
    parameters.push(parameterForm);
    this.metaGroups.updateValueAndValidity();
  };

  removeGroupParameter = (groupIndex: number, parameterIndex: number) => {
    const parameters = this.metaGroupParameters(groupIndex);
    parameters.removeAt(parameterIndex);
    this.metaGroups.updateValueAndValidity();
  };

  onAddServiceFormSubmit = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      const metaData = this.getServiceDataFormData();
      this.onAddServiceDataComplete.emit(metaData);
    }
  };

  onBackClick = () => {
    const metaData = this.getServiceDataFormData();
    this.onAddServiceDataComplete.emit(metaData);
    this.onBackEventClick.emit();
  };

  //Helper methods
  get metaGroups() {
    return this.addServiceDataForm.controls['meta'] as FormArray;
  }

  metaGroupParameters(groupIndex: number) {
    return (this.metaGroups.controls[groupIndex] as FormGroup).controls[
      'parameters'
    ] as FormArray;
  }

  getServiceDataFormData = () => {
    const formValue = this.addServiceDataForm.getRawValue();
    const metaData: AddServiceDataModel = { meta: {} };
    for (let group of formValue.meta) {
      metaData.meta[group.name] = {};
      for (let parameter of group.parameters) {
        metaData.meta[group.name][parameter.name] = parameter.value;
      }
    }
    return metaData;
  };

  metaGroupLength(index : number) :number {
    return this.metaGroupParameters(index).length;
  }
}
