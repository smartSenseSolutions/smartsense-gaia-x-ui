import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
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
import { SignStepTwoModel } from 'src/app/public/models';
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
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signup-step-two.component.html',
  styleUrls: ['./signup-step-two.component.scss'],
})
export class SignupStepTwoComponent extends FormBaseComponent {
  @Input() stepTwoFormData: SignStepTwoModel | undefined;
  @Output() onStepTwoComplete = new EventEmitter<SignStepTwoModel>();
  @Output() onBackEventClick = new EventEmitter<void>();

  // Constant variables
  readonly validationMsg = new ValidationConstant();

  // Data variables
  registrationTypes = [
    { label: 'Tax ID', value: 'taxID' },
    { label: 'VAT ID', value: 'vatID' },
    { label: 'EUID', value: 'EUID' },
    { label: 'EORI', value: 'EORI' },
    { label: 'LEI Code', value: 'leiCode' },
  ];

  signupForm: any;
  // signupForm = new FormGroup({
  //   legalName: new FormControl('', [Validators.required]),
  //   subDomainName: new FormControl('', [Validators.required]),
  //   legalRegistrationType: new FormControl('', [Validators.required]),
  //   legalRegistrationNumber: new FormControl('', [Validators.required]),
  //   addressCountryCode: new FormControl('', [Validators.required]),
  //   addressCode: new FormControl('', [Validators.required]),
  //   streetAddress: new FormControl('', [Validators.required]),
  //   postalCode: new FormControl('', [Validators.required]),
  //   locality: new FormControl('', [Validators.required]),
  //   legalAddressCountryCode: new FormControl('', [Validators.required]),
  //   legalAddressCode: new FormControl('', [Validators.required]),
  //   legalStreetAddress: new FormControl('', [Validators.required]),
  //   legalPostalCode: new FormControl('', [Validators.required]),
  //   legalLocality: new FormControl('', [Validators.required]),
  //   termsAndConditions: new FormControl(false, [Validators.required]),
  // });

  agreeToTerms: boolean = false;

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

      addressCountryCode: new FormControl(
        this.stepTwoFormData ? this.stepTwoFormData.addressCountryCode : '',
        [Validators.required]
      ),

      addressCode: new FormControl(
        this.stepTwoFormData ? this.stepTwoFormData.addressCode : '',
        [Validators.required]
      ),

      streetAddress: new FormControl(
        this.stepTwoFormData ? this.stepTwoFormData.streetAddress : '',
        [Validators.required]
      ),

      postalCode: new FormControl(
        this.stepTwoFormData ? this.stepTwoFormData.postalCode : '',
        [Validators.required]
      ),

      locality: new FormControl(
        this.stepTwoFormData ? this.stepTwoFormData.locality : '',
        [Validators.required]
      ),

      legalAddressCountryCode: new FormControl(
        this.stepTwoFormData
          ? this.stepTwoFormData.legalAddressCountryCode
          : '',
        [Validators.required]
      ),

      legalAddressCode: new FormControl(
        this.stepTwoFormData ? this.stepTwoFormData.legalAddressCode : '',
        [Validators.required]
      ),

      legalStreetAddress: new FormControl(
        this.stepTwoFormData ? this.stepTwoFormData.legalStreetAddress : '',
        [Validators.required]
      ),

      legalPostalCode: new FormControl(
        this.stepTwoFormData ? this.stepTwoFormData.legalPostalCode : '',
        [Validators.required]
      ),

      legalLocality: new FormControl(
        this.stepTwoFormData ? this.stepTwoFormData.legalLocality : '',
        [Validators.required]
      ),

      termsAndConditions: new FormControl(
        this.stepTwoFormData ? this.stepTwoFormData.termsAndConditions : false,
        [Validators.required]
      ),
    });
  }

  onSameAddressCheckboxChange = (event: MatCheckboxChange) => {
    const legalAddressCountryCode =
      this.signupForm.controls['legalAddressCountryCode'];
    const legalAddressCode = this.signupForm.controls['legalAddressCode'];
    const legalStreetAddress = this.signupForm.controls['legalStreetAddress'];
    const legalPostalCode = this.signupForm.controls['legalPostalCode'];
    const legalLocality = this.signupForm.controls['legalLocality'];

    if (event.checked) {
      legalAddressCountryCode.disable();
      legalAddressCode.disable();
      legalStreetAddress.disable();
      legalPostalCode.disable();
      legalLocality.disable();
    } else {
      legalAddressCountryCode.enable();
      legalAddressCode.enable();
      legalStreetAddress.enable();
      legalPostalCode.enable();
      legalLocality.enable();
    }
  };

  onSignupStepTwoFormSubmit = (signupForm: FormGroup) => {
    if (this.onSubmit(signupForm)) {
      const legalAddressCountryCode =
        this.signupForm.controls['legalAddressCountryCode'];
      if (!legalAddressCountryCode.value) {
        legalAddressCountryCode.setValue(
          this.signupForm.controls['addressCountryCode'].getRawValue()
        );
      }

      const legalAddressCode = this.signupForm.controls['legalAddressCode'];
      if (!legalAddressCode.value) {
        legalAddressCode.setValue(
          this.signupForm.controls['addressCountryCode'].getRawValue()
        );
      }

      const legalStreetAddress = this.signupForm.controls['legalStreetAddress'];
      if (!legalStreetAddress.value) {
        legalStreetAddress.setValue(
          this.signupForm.controls['addressCountryCode'].getRawValue()
        );
      }

      const legalPostalCode = this.signupForm.controls['legalPostalCode'];
      if (!legalPostalCode.value) {
        legalPostalCode.setValue(
          this.signupForm.controls['addressCountryCode'].getRawValue()
        );
      }

      const legalLocality = this.signupForm.controls['legalLocality'];
      if (!legalLocality.value) {
        legalLocality.setValue(
          this.signupForm.controls['addressCountryCode'].getRawValue()
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

  agreeToTermsAndServices = () => {
    this.agreeToTerms = true;
  };
}
