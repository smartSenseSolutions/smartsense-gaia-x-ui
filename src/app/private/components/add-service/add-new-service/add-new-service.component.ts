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
import { MatCheckboxModule } from '@angular/material/checkbox';

import { Router } from '@angular/router';
import { AddServiceModel } from 'src/app/private/models';
import { FormBaseComponent } from 'src/app/shared/components';
import {
  AddServiceValidationConstant,
  RouteConstants,
} from 'src/app/shared/constants';
import {
  RESOURCE_CONTAIN_PII,
  ACCESS_TYPES,
  FORMAT_TYPES,
  REQUEST_TYPES,
  RESOURCE_LICENCE,
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
    MatCheckboxModule,
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

  readonly RESOURCE_LICENCE = RESOURCE_LICENCE;
  readonly ACCESS_TYPES = ACCESS_TYPES;
  readonly REQUEST_TYPES = REQUEST_TYPES;
  readonly FORMAT_TYPES = FORMAT_TYPES;
  readonly RESOURCE_CONTAIN_PII = RESOURCE_CONTAIN_PII;

  addServiceForm: any;
  validationMsg = new AddServiceValidationConstant();

  constructor(
    fb: FormBuilder,
    private location: Location,
    private route: Router
  ) {
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
        this.addServiceFormData
          ? this.addServiceFormData.accessType
          : ACCESS_TYPES[0].value,
        Validators.required
      ),
      requestType: new FormControl(
        this.addServiceFormData
          ? this.addServiceFormData.requestType
          : REQUEST_TYPES[0].value,
        Validators.required
      ),
      formatType: new FormControl(
        this.addServiceFormData
          ? this.addServiceFormData.formatType
          : FORMAT_TYPES[0].value,
        Validators.required
      ),
      terms: new FormControl(
        this.addServiceFormData ? this.addServiceFormData.terms : '',
        Validators.required
      ),
      addResource: new FormControl(false),
    });
  };

  onAddServiceFormSubmit = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      const params = form.getRawValue();

      if (params['addResource']) {
        params['resource'] = {
          name: params['resourceName'],
          description: params['resourceDescription'],
          containsPII: params['resourceContainsPII'],
          policy: params['resourcePolicy'],
          license: params['resourceLicence'],
          copyrightOwnedBy: params['copyrightOwner'],
        };

        delete params['resourceName'];
        delete params['resourceDescription'];
        delete params['resourceContainsPII'];
        delete params['resourcePolicy'];
        delete params['resourceLicence'];
        delete params['copyrightOwner'];
      }
      delete params['addResource'];

      this.onAddServiceFormComplete.emit(params);
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
    ]);
  };

  onChangeAddResource = () => {
    const addServiceFormGroup = this.addServiceForm as FormGroup;
    const resourceControlsName = [
      'resourceName',
      'resourcePolicy',
      'resourceDescription',
      'resourceContainsPII',
      'resourceLicence',
      'copyrightOwner',
    ];
    if (this.formControls.addResource.value) {
      addServiceFormGroup.addControl(
        resourceControlsName[0],
        new FormControl(
          this.addServiceFormData && this.addServiceFormData.resource
            ? this.addServiceFormData.resource.name
            : '',
          Validators.required
        )
      );
      addServiceFormGroup.addControl(
        resourceControlsName[1],
        new FormControl({
          value: 'default: allow',
          disabled: true,
        })
      );
      addServiceFormGroup.addControl(
        resourceControlsName[2],
        new FormControl(
          this.addServiceFormData && this.addServiceFormData.resource
            ? this.addServiceFormData.resource.description
            : '',
          Validators.required
        )
      );
      addServiceFormGroup.addControl(
        resourceControlsName[3],
        new FormControl(
          {
            value:
              this.addServiceFormData && this.addServiceFormData.resource
                ? this.addServiceFormData.resource.containsPII
                : RESOURCE_CONTAIN_PII[1].value,
            disabled: true,
          },
          Validators.required
        )
      );
      addServiceFormGroup.addControl(
        resourceControlsName[4],
        new FormControl('EPL-2.0', Validators.required)
      );
      addServiceFormGroup.addControl(
        resourceControlsName[5],
        new FormControl(
          this.addServiceFormData && this.addServiceFormData.resource
            ? this.addServiceFormData.resource.copyrightOwnedBy
            : '',
          Validators.required
        )
      );
    } else {
      resourceControlsName.map((controlName: string) => {
        addServiceFormGroup.removeControl(controlName);
      });
    }
  };
}
