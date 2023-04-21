import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { EMPTY, Observable, catchError, map, of } from 'rxjs';
import { ServiceOfferingService } from '../../services';
import { ServiceOfferResponsePayloadModel } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class ServiceOfferingDetailResolver {
  constructor(private serviceOfferingService: ServiceOfferingService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ServiceOfferResponsePayloadModel | never> {
    const id = route.queryParamMap.get('id');
    if (id) {
      return this.serviceOfferingService.getServiceOffersDetail(id).pipe(
        map((response) => {
          return response.payload;
        }),
        catchError((error) => {
          return EMPTY;
        })
      );
    } else {
      return EMPTY;
    }
  }
}
