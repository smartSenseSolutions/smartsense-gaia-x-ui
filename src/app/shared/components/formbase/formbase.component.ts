import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-base',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

  ],
  template: '',
})
export class FormBaseComponent implements OnChanges {
  // Angular variables
  @Input() canFocusField!: boolean;
  @ViewChild('initialFormField', { static: true }) initialFormField: any;

  // State Variables
  isInvalidCtrlSelected = false;
  submitted = false;

  constructor(protected fb: FormBuilder) {}

  //  Life cycle methods
  ngOnChanges(changes: SimpleChanges) {
    if (this.initialFormField && this.canFocusField) {
      this.initialFormField.nativeElement.focus();
    }
  }

  /**
   * On create form
   * @param controlsConfig
   * @param extraConfig
   */
  protected createForm(controlsConfig: any, extraConfig = {}): FormGroup {
    const form = this.fb.group(controlsConfig, extraConfig);
    return form;
  }

  /**
   * On form submit method
   * @param form
   */
  protected onSubmit(form: any) {
    this.submitted = true;
    if (!form.valid) {
      this.isInvalidCtrlSelected = false;
      this.highlightFirstInvalidControl(form);
      return false;
    }
    return true;
  }

  highlightFirstInvalidControl(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key) as any;
      if (
        abstractControl instanceof FormGroup ||
        abstractControl instanceof FormArray
      ) {
        this.highlightFirstInvalidControl(abstractControl);
      } else {
        if (abstractControl.invalid) {
          if (this.isInvalidCtrlSelected) {
            abstractControl.markAsUntouched({ onlySelf: true });
          } else {
            this.isInvalidCtrlSelected = true;
            abstractControl.markAsTouched({ onlySelf: true });

            if (abstractControl.nativeElement) {
              abstractControl.nativeElement.focus();
            }
          }
        }
      }
    });
  }

  /**
   * Form Field Blur method
   * @param formName
   * @param formControls
   */
  onBlur = (formName: any) => {
    for (const field in formName.controls) {
      const control = formName.get(field);
      control.markAsUntouched({ onlySelf: true });
    }
    return;
  };

  /**
   * @param formControl(Required Field)
   */
  isRequiredField = (formControl: AbstractControl) => {
    return formControl.touched && formControl.hasError('required');
  };

  /**
   * @param formControlName(Valid field)
   */
  isValidField = (formControlName: FormControl) => {
    return formControlName.touched && formControlName.hasError('pattern');
  };

  isInvalidDateField = (formControlName: FormControl) => {
    return formControlName.touched && formControlName.invalid;
  };

  getDatePickerErrors = (ctrl: any) => {
    if (Object.keys(ctrl.errors).length === 1) {
      return Object.keys(ctrl.errors)[0];
    } else {
      return Object.keys(ctrl.errors)[2];
    }
  };

  /**
   * @param formControlName(Valid Length)
   */
  isValidLength = (formControlName: FormControl) => {
    return (
      formControlName.touched &&
      (formControlName.hasError('minlength') ||
        formControlName.hasError('maxlength'))
    );
  };

  /**
   * @param formControlName
   */
  isValidNumber = (formControlName: FormControl) => {
    return (
      formControlName.touched &&
      (formControlName.hasError('min') || formControlName.hasError('max'))
    );
  };

  /**
   * @param errorName
   * @param formGroup
   * @param formControl
   * @param submitted
   * Custom Validation method
   */
  hasError = (
    errorName: string,
    formGroup: FormGroup,
    formControl: FormControl,
    submitted: boolean
  ) => {
    return submitted && formGroup.hasError(errorName) && formControl.dirty;
  };
}
