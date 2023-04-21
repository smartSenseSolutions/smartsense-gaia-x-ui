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
  constructor(
    private serviceOfferingService: ServiceOfferingService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ServiceOfferResponsePayloadModel | never> {
    const internalState = this.router.getCurrentNavigation()?.extras
      ?.state as any;
    if (internalState) {
      return of(internalState.service);
    } else {
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
}
