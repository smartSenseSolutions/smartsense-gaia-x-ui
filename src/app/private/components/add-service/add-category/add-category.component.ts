import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AddServiceDataModel } from 'src/app/private/models';
import { SignStepTwoModel } from 'src/app/public/models';
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
  ],
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent {
  @Input() addServiceDataFormData: AddServiceDataModel | undefined;
  @Output() onAddServiceDataComplete = new EventEmitter<AddServiceDataModel>();
  @Output() onBackEventClick = new EventEmitter<void>();

  // Constant variables
  readonly validationMsg = new ValidationConstant();

  onBackClick = () => {
    this.onBackEventClick.emit();
  };
}
