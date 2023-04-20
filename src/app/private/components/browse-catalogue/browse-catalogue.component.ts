import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { Observable, map, startWith } from 'rxjs';
import { CardBoxComponent } from '../../../shared/components/card-box/card-box.component';
import { ProductData } from '../../models';

@Component({
  selector: 'app-browse-catalogue',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    CardBoxComponent,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
  ],
  templateUrl: './browse-catalogue.component.html',
  styleUrls: ['./browse-catalogue.component.scss'],
})
export class BrowseCatalogueComponent {
  productList: ProductData[] = [
    {
      image: '../../../../assets/images/service-catalog-1.png',
      title: 'Ball Bearing',
      discription:
        'This Vacuum Pump encompasses four different types of mechanism for the engines above 2000 bhp.',
      company: 'Hella KGaA Hueck & Co.',
    },
    {
      image: '../../../../assets/images/service-catalog-1.png',
      title: 'Ball Bearing',
      discription:
        'This Vacuum Pump encompasses four different types of mechanism for the engines above 2000 bhp.',
      company: 'Hella KGaA Hueck & Co.',
    },
    {
      image: '../../../../assets/images/service-catalog-1.png',
      title: 'Ball Bearing',
      discription:
        'This Vacuum Pump encompasses four different types of mechanism for the engines above 2000 bhp.',
      company: 'Hella KGaA Hueck & Co.',
    },
    {
      image: '../../../../assets/images/service-catalog-1.png',
      title:
        'Ball Bearing Ball Bearing Ball Bearing Ball Bearing Ball Bearing all Bearing',
      discription:
        'This Vacuum Pump encompasses four different types of mechanism for the engines above 2000 bhp. types of mechanism for the engines above 2000 bhp.',
      company: 'Hella KGaA Hueck & Co.  ',
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

  onShowFilter = () => {
  };
}
