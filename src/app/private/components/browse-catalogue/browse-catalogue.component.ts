import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import {
  Observable,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap,
} from 'rxjs';
import { ShareInformationDialogComponent } from 'src/app/shared/components';
import { RouteConstants } from 'src/app/shared/constants';
import { CardBoxComponent } from '../../../shared/components/card-box/card-box.component';
import { ServiceOfferResponsePayloadModel } from '../../models';
import { ServiceOfferingService } from '../../services';

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
    RouterModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  templateUrl: './browse-catalogue.component.html',
  styleUrls: ['./browse-catalogue.component.scss'],
})
export class BrowseCatalogueComponent {
  serviceList: ServiceOfferResponsePayloadModel[];
  productControl = new FormControl('');
  filteredProducts!: Observable<string[]>;
  productControlChangesObservable: Subscription;
  isLoading: boolean = false;

  constructor(
    private route: Router,
    private dialog: MatDialog,
    private serviceOfferingService: ServiceOfferingService
  ) {}

  ngOnInit() {
    this.subscribeProductControlChanges();
  }

  ngOnDestroy() {
    this.productControlChangesObservable.unsubscribe();
  }

  subscribeProductControlChanges() {
    this.productControlChangesObservable = this.productControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((searchText) => {
          this.isLoading = true;
          return this.serviceOfferingService.getCatalogue(searchText);
        })
      )
      .subscribe(
        (searchResult) => {
          this.serviceList = searchResult.payload;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
        }
      );
  }

  // private _normalizeValue(value: string): string {
  //   return value.toLowerCase().replace(/\s/g, '');
  // }

  onShowFilter = () => {};

  onViewDetailClick = (service: ServiceOfferResponsePayloadModel) => {
    const dialogRef = this.dialog.open(ShareInformationDialogComponent, {
      width: '60rem',
      data: service,
    });
    dialogRef.afterClosed().subscribe((success) => {
      if (success) {
        this.route.navigate(
          [
            `${RouteConstants.SmartX}/${RouteConstants.BrowseCatalogue}/${RouteConstants.Detail}`,
          ],
          { state: { service: success } }
        );
      }
    });
  };
}
