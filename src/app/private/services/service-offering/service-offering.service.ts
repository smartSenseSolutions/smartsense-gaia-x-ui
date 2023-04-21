import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupResponseModel } from 'src/app/public/models';
import { API_CONSTANTS } from 'src/app/shared/constants';
import { parseAPI } from 'src/app/shared/functions';
import { ApiManagerService } from 'src/app/shared/services';
import {
  ServiceOfferDetailMetaResponse,
  ServiceOfferDetailResponse,
  ServiceOfferRequest,
  ServiceOfferResponse,
  VPResponseModel,
  VPResponsePayloadModel,
} from '../../models';

@Injectable({
  providedIn: 'root',
})
export class ServiceOfferingService {
  constructor(private apiManager: ApiManagerService) {}

  getEnterpriseDetail = (): Observable<SignupResponseModel> => {
    return this.apiManager.httpHelperMethod<SignupResponseModel>(
      API_CONSTANTS.ENTERPRISE.DETAIL.METHOD,
      API_CONSTANTS.ENTERPRISE.DETAIL.URL,
      {},
      this.apiManager.authorizationHttpOptions,
      true,
      true
    );
  };

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

  getServiceOffersDetail = (
    id: string
  ): Observable<ServiceOfferDetailResponse> => {
    return this.apiManager.httpHelperMethod<ServiceOfferDetailResponse>(
      API_CONSTANTS.ENTERPRISE.SERVICE_OFFERS.METHOD,
      `${API_CONSTANTS.ENTERPRISE.SERVICE_OFFERS.URL}/${id}`,
      {},
      this.apiManager.authorizationHttpOptions,
      true,
      true
    );
  };

  getServiceOffersDetailWithOfferId = (
    request: VPResponsePayloadModel,
    id: number
  ): Observable<ServiceOfferDetailMetaResponse> => {
    return this.apiManager.httpHelperMethod<ServiceOfferDetailMetaResponse>(
      API_CONSTANTS.ENTERPRISE.SERVICE_OFFERS_DETAIL_WITH_OFFER_ID.METHOD,
      parseAPI(
        API_CONSTANTS.ENTERPRISE.SERVICE_OFFERS_DETAIL_WITH_OFFER_ID.URL,
        { offer_id: id }
      ),
      request,
      this.apiManager.authorizationHttpOptions,
      true,
      true
    );
  };

  getParticipantVP = (name: string): Observable<VPResponseModel> => {
    return this.apiManager.httpHelperMethod<VPResponseModel>(
      API_CONSTANTS.ENTERPRISE.CREATE_VP.METHOD,
      parseAPI(API_CONSTANTS.ENTERPRISE.CREATE_VP.URL, {
        credential_name: name,
      }),
      {},
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
