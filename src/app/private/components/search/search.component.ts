import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Observable, map, startWith } from 'rxjs';
import { ProductData } from '../../models';
import { CardBoxComponent } from '../card-box/card-box.component';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    CardBoxComponent,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule

  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  productList: ProductData[] = [
    {
      image: '../../../../assets/images/service-catalog-1.png',
      articleNumber: 'knaji91',
      group: 'BE POSITIVE',
      gtinNumber: 888898,
    },
    {
      image: '../../../../assets/images/service-catalog-1.png',
      articleNumber: 'knaji91',
      group: 'BE POSITIVE',
      gtinNumber: 888898,
    },
    {
      image: '../../../../assets/images/service-catalog-1.png',
      articleNumber: 'knaji91',
      group: 'BE POSITIVE',
      gtinNumber: 888898,
    },
    {
      image: '../../../../assets/images/service-catalog-1.png',
      articleNumber: 'knaji91',
      group: 'BE POSITIVE',
      gtinNumber: 888898,
    },
  ];

  product = new FormControl('');
  products: string[] = ['Be Positive', 'Audi', 'ISRO', 'Google'];
  filteredProducts!: Observable<string[]>;

  ngOnInit() {
    this.filteredProducts = this.product.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.products.filter((street) =>
      this._normalizeValue(street).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
