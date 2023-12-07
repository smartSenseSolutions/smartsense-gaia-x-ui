import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONSTANTS } from 'src/app/shared/constants';
import { ApiManagerService } from 'src/app/shared/services';
import { SignupRequestModel } from '../../models/signup/signup-request.model';
import {
  SignupQRResponseModel,
  SignupResponseModel,
} from '../../models/signup/signup-response.model';
import { parseAPI } from 'src/app/shared/functions';
import { ConnectionResponse } from '../../models/signup/connection.model';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(private apiManager: ApiManagerService) {}

  getSignupQR = (): Observable<SignupQRResponseModel> => {
    return this.apiManager.httpHelperMethod<SignupQRResponseModel>(
      API_CONSTANTS.ADMIN.SIGN_UP_QR_CODE.METHOD,
      API_CONSTANTS.ADMIN.SIGN_UP_QR_CODE.URL,
      {},
      this.apiManager.httpOptions,
      false,
      false
    );
  };

  verifyConnection = (connectionId: string): Observable<ConnectionResponse> => {
    return this.apiManager.httpHelperMethod<ConnectionResponse>(
      API_CONSTANTS.ADMIN.VERIFY_CONNECTION.METHOD,
      API_CONSTANTS.ADMIN.VERIFY_CONNECTION.URL + `/${connectionId}`,
      {},
      this.apiManager.httpOptions,
      false,
      false
    );
  };

  signup = (
    signupRequest: SignupRequestModel
  ): Observable<SignupResponseModel> => {
    return this.apiManager.httpHelperMethod<SignupResponseModel>(
      API_CONSTANTS.ADMIN.SIGN_UP.METHOD,
      API_CONSTANTS.ADMIN.SIGN_UP.URL,
      signupRequest,
      this.apiManager.authorizationHttpOptions,
      true,
      true
    );
  };

  getEnterprise = (enterpriseId: number): Observable<SignupResponseModel> => {
    const templateParams = {
      id: enterpriseId,
    };
    return this.apiManager.httpHelperMethod<SignupResponseModel>(
      API_CONSTANTS.ADMIN.GET_ENTERPRISE.METHOD,
      parseAPI(API_CONSTANTS.ADMIN.GET_ENTERPRISE.URL, templateParams),
      {},
      this.apiManager.authorizationHttpOptions,
      true,
      false
    );
  };

  resumeSubdomain = (enterpriseId: number): Observable<SignupResponseModel> => {
    const templateParams = {
      enterpriseId,
    };
    return this.apiManager.httpHelperMethod<SignupResponseModel>(
      API_CONSTANTS.ADMIN.RESUME_SUBDOMAIN.METHOD,
      parseAPI(API_CONSTANTS.ADMIN.RESUME_SUBDOMAIN.URL, templateParams),
      {},
      this.apiManager.authorizationHttpOptions,
      true,
      false
    );
  };

  resumeCertificate = (
    enterpriseId: number
  ): Observable<SignupResponseModel> => {
    const templateParams = {
      enterpriseId,
    };
    return this.apiManager.httpHelperMethod<SignupResponseModel>(
      API_CONSTANTS.ADMIN.RESUME_CERTIFICATE.METHOD,
      parseAPI(API_CONSTANTS.ADMIN.RESUME_CERTIFICATE.URL, templateParams),
      {},
      this.apiManager.authorizationHttpOptions,
      true,
      false
    );
  };

  resumeIngress = (enterpriseId: number): Observable<SignupResponseModel> => {
    const templateParams = {
      enterpriseId,
    };
    return this.apiManager.httpHelperMethod<SignupResponseModel>(
      API_CONSTANTS.ADMIN.RESUME_INGRESS.METHOD,
      parseAPI(API_CONSTANTS.ADMIN.RESUME_INGRESS.URL, templateParams),
      {},
      this.apiManager.authorizationHttpOptions,
      true,
      false
    );
  };

  resumeDID = (enterpriseId: number): Observable<SignupResponseModel> => {
    const templateParams = {
      enterpriseId,
    };
    return this.apiManager.httpHelperMethod<SignupResponseModel>(
      API_CONSTANTS.ADMIN.RESUME_DID.METHOD,
      parseAPI(API_CONSTANTS.ADMIN.RESUME_DID.URL, templateParams),
      {},
      this.apiManager.authorizationHttpOptions,
      true,
      false
    );
  };

  resumeParticipant = (
    enterpriseId: number
  ): Observable<SignupResponseModel> => {
    const templateParams = {
      enterpriseId,
    };
    return this.apiManager.httpHelperMethod<SignupResponseModel>(
      API_CONSTANTS.ADMIN.RESUME_PARTICIPANT.METHOD,
      parseAPI(API_CONSTANTS.ADMIN.RESUME_PARTICIPANT.URL, templateParams),
      {},
      this.apiManager.authorizationHttpOptions,
      true,
      false
    );
  };
}
