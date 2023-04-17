import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SignStepOneModel, SignStepTwoModel } from 'src/app/public/models';
import { FormBaseComponent } from 'src/app/shared/components';
import { ValidationConstant } from 'src/app/shared/constants';
@Component({
  selector: 'app-signup-step-two',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatSelectModule,
    FormsModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
  encapsulation: ViewEncapsulation.None,

  templateUrl: './signup-step-two.component.html',
  styleUrls: ['./signup-step-two.component.scss'],
})
export class SignupStepTwoComponent extends FormBaseComponent {
  @Input() stepTwoFormData: SignStepTwoModel | undefined;
  @Output() onStepTwoComplete = new EventEmitter<SignStepTwoModel>();
  @Output() onBackEventClick = new EventEmitter<void>();

  // Data variables
  registrationTypes = [
    { label: 'Tax ID', value: 'taxID' },
    { label: 'VAT ID', value: 'vatID' },
    { label: 'EUID', value: 'EUID' },
    { label: 'EORI', value: 'EORI' },
    { label: 'LEI Code', value: 'leiCode' },
  ];

  // Constant variables
  readonly validationMsg = new ValidationConstant();

  signupForm = new FormGroup({
    legalName: new FormControl('', [Validators.required]),
    subDomainName: new FormControl('', [Validators.required]),
    legalRegistrationType: new FormControl('', [Validators.required]),
    legalRegistrationNumber: new FormControl('', [Validators.required]),
    headquarterAddress: new FormControl('', [Validators.required]),
    legalAddress: new FormControl('', [Validators.required]),
    termsAndConditions: new FormControl(false, [Validators.required]),
  });

  constructor(protected override fb: FormBuilder) {
    super(fb);
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      legalName: new FormControl(
        this.stepTwoFormData ? this.stepTwoFormData.legalName : '',
        [Validators.required]
      ),
      subDomainName: new FormControl(
        this.stepTwoFormData ? this.stepTwoFormData.subDomainName : '',
        [Validators.required]
      ),
      legalRegistrationType: new FormControl(
        this.stepTwoFormData ? this.stepTwoFormData.legalRegistrationType : '',
        [Validators.required]
      ),
      legalRegistrationNumber: new FormControl(
        this.stepTwoFormData
          ? this.stepTwoFormData.legalRegistrationNumber
          : '',
        [Validators.required]
      ),
      headquarterAddress: new FormControl(
        this.stepTwoFormData ? this.stepTwoFormData.headquarterAddress : '',
        [Validators.required]
      ),
      legalAddress: new FormControl(
        this.stepTwoFormData ? this.stepTwoFormData.legalAddress : '',
        [Validators.required]
      ),
      termsAndConditions: new FormControl(
        this.stepTwoFormData ? this.stepTwoFormData.termsAndConditions : false,
        [Validators.required]
      ),
    });
  }

  onSameAddressCheckboxChange = (event: MatCheckboxChange) => {
    const legalAddressCtrl = this.signupForm.controls['legalAddress'];
    if (event.checked) {
      legalAddressCtrl.disable();
    } else {
      legalAddressCtrl.setValue('');
      legalAddressCtrl.enable();
    }
  };

  onSignupStepTwoFormSubmit = (signupForm: FormGroup) => {
    if (this.onSubmit(signupForm)) {
      const legalAddressCtrl = this.signupForm.controls['legalAddress'];
      if (!legalAddressCtrl.value) {
        legalAddressCtrl.setValue(
          this.signupForm.controls['headquarterAddress'].getRawValue()
        );
      } 
      this.onStepTwoComplete.emit(signupForm.getRawValue());
    }
  };

  onBackClick = () => {
    this.onBackEventClick.emit();
  };

  // Helper methods
  get formControls() {
    return this.signupForm.controls;
  }

  getRegistrationNumberLabel = (registrationType: string) => {
    return registrationType
      ? this.registrationTypes.find((type) => (type.value = registrationType))
          ?.label
      : '';
  };
}
