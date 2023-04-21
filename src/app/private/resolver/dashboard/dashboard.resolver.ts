import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, EMPTY, forkJoin, map, Observable } from 'rxjs';
import { ServiceOfferingService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class DashboardResolver implements Resolve<boolean> {
  constructor(private serviceOfferingService: ServiceOfferingService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return forkJoin([
      this.serviceOfferingService.getServiceOffers({}),
      this.serviceOfferingService.getEnterpriseDetail(),
    ]).pipe(
      map((response) => {
        return {
          serviceOfferCount: response[0].payload.length,
          enterpriseDetail: response[1].payload,
        };
      }),
      catchError((error) => {
        return EMPTY;
      })
    );
  }
}
