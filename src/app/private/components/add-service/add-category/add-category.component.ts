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
  selector: 'app-add-category',
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
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent extends FormBaseComponent implements OnInit {
  @Input() addServiceDataFormData: AddServiceDataModel | undefined;
  @Output() onAddServiceDataComplete = new EventEmitter<AddServiceDataModel>();
  @Output() onBackEventClick = new EventEmitter<void>();

  // Constant variables
  readonly validationMsg = new ValidationConstant();

  addServiceDataForm: any;

  ngOnInit() {
    this.initialization();
  }

  initialization = () => {
    this.addServiceDataForm = this.fb.group({
      meta: this.fb.array([]),
    });
    this.addGroup();
    // this.addGroupParameter(0);
  };

  addGroup = () => {
    const dataGroupForm = this.fb.group({
      name: ['', Validators.required],
      parameters: this.fb.array([
        this.fb.group({
          name: ['', Validators.required],
          value: ['', Validators.required],
        })
      ]),
    });
    this.metaGroups.push(dataGroupForm);

  };

  removeGroup = (index: number) => {
    this.metaGroups.removeAt(index);
  };

  addGroupParameter = (index: number) => {
    const parameters = this.metaGroupParameters(index);

    const parameterForm = this.fb.group({
      name: ['', Validators.required],
      value: ['', Validators.required],
    });
    parameters.push(parameterForm);
  };

  removeGroupParameter = (groupIndex: number, parameterIndex: number) => {
    // const group = this.metaGroups.controls[groupIndex] as FormGroup;
    const parameters = this.metaGroupParameters(groupIndex);
    parameters.removeAt(parameterIndex);
  };

  onAddServiceFormSubmit = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      this.onAddServiceDataComplete.emit(form.getRawValue());
    }
  };

  onBackClick = () => {
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
}
