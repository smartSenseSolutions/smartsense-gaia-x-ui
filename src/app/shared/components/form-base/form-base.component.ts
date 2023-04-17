import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Form,
} from '@angular/forms';

@Component({
  selector: 'app-form-base',
  standalone: true,
  templateUrl: './form-base.component.html',
  styleUrls: ['./form-base.component.scss'],
})
export class FormBaseComponent implements OnChanges {
  // Angular variables
  @Input() canFocusField: boolean | undefined;
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
  protected onSubmit(form: FormGroup) {
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
      const abstractControl = (group as any).controls[key];
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
  onBlur = (form: FormGroup) => {
    for (const field in form.controls) {
      const control = form.get(field);
      control?.markAsUntouched({ onlySelf: true });
    }
    return;
  };

  /**
   * @param formControl(Required Field)
   */
  isRequiredField = (formControl: FormControl) => {
    return formControl.touched && formControl.hasError('required');
  };

  /**
   * @param formControl(Valid field)
   */
  isValidField = (formControl: FormControl) => {
    return formControl.touched && formControl.hasError('pattern');
  };

  isInvalidDateField = (formControl: FormControl) => {
    return formControl.touched && formControl.invalid;
  };

  getDatePickerErrors = (ctrl: any) => {
    if (Object.keys(ctrl.errors).length === 1) {
      return Object.keys(ctrl.errors)[0];
    } else {
      return Object.keys(ctrl.errors)[2];
    }
  };

  /**
   * @param formControl(Valid Length)
   */
  isValidLength = (formControl: FormControl) => {
    return (
      formControl.touched &&
      (formControl.hasError('minlength') || formControl.hasError('maxlength'))
    );
  };

  /**
   * @param formControl
   */
  isValidNumber = (formControl: FormControl) => {
    return (
      formControl.touched &&
      (formControl.hasError('min') || formControl.hasError('max'))
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
