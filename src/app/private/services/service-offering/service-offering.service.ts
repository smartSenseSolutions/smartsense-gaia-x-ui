import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONSTANTS } from 'src/app/shared/constants';
import { ApiManagerService } from 'src/app/shared/services';
import { ServiceOfferRequest, ServiceOfferResponse } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class ServiceOfferingService {
  constructor(private apiManager: ApiManagerService) {}

  getServiceOffers = (
    request: ServiceOfferRequest
  ): Observable<ServiceOfferResponse> => {
    return this.apiManager.httpHelperMethod<ServiceOfferResponse>(
      API_CONSTANTS.ENTERPRISE.SERVICE_OFFERS.METHOD,
      API_CONSTANTS.ENTERPRISE.SERVICE_OFFERS.URL,
      request,
      this.apiManager.authorizationHttpOptions,
      true,
      true
    );
  };
  
  getCatalogue = (
    request: ServiceOfferRequest
  ): Observable<ServiceOfferResponse> => {
    return this.apiManager.httpHelperMethod<ServiceOfferResponse>(
      API_CONSTANTS.ENTERPRISE.CATALOGUE.METHOD,
      API_CONSTANTS.ENTERPRISE.CATALOGUE.URL,
      request,
      this.apiManager.authorizationHttpOptions,
      true,
      true
    );
  };
}
