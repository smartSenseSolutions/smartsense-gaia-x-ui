import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONSTANTS } from 'src/app/shared/constants';
import { ApiManagerService } from 'src/app/shared/services';
import { SignupRequestModel } from '../../models/signup/signup-request.model';
import { SignupResponseModel } from '../../models/signup/signup-response.model';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(private apiManager: ApiManagerService) {}

  signup = (
    signupRequest: SignupRequestModel
  ): Observable<SignupResponseModel> => {
    return this.apiManager.httpHelperMethod<SignupResponseModel>(
      API_CONSTANTS.ADMIN.SIGN_UP.METHOD,
      API_CONSTANTS.ADMIN.SIGN_UP.URL,
      signupRequest,
      this.apiManager.httpOptions,
      true,
      true
    );
  };

  getEnterprise = (enterpriseId: number): Observable<SignupResponseModel> => {
    return this.apiManager.httpHelperMethod<SignupResponseModel>(
      API_CONSTANTS.ADMIN.SIGN_UP.METHOD,
      API_CONSTANTS.ADMIN.SIGN_UP.URL,
      {},
      this.apiManager.httpOptions,
      true,
      true
    );
  };

  resumeSubdomain = (): Observable<SignupResponseModel> => {
    return this.apiManager.httpHelperMethod<SignupResponseModel>(
      API_CONSTANTS.ADMIN.SIGN_UP.METHOD,
      API_CONSTANTS.ADMIN.SIGN_UP.URL,
      {},
      this.apiManager.httpOptions,
      true,
      true
    );
  };

  resumeCertificate = (): Observable<SignupResponseModel> => {
    return this.apiManager.httpHelperMethod<SignupResponseModel>(
      API_CONSTANTS.ADMIN.SIGN_UP.METHOD,
      API_CONSTANTS.ADMIN.SIGN_UP.URL,
      {},
      this.apiManager.httpOptions,
      true,
      true
    );
  };

  resumeIngress = (): Observable<SignupResponseModel> => {
    return this.apiManager.httpHelperMethod<SignupResponseModel>(
      API_CONSTANTS.ADMIN.SIGN_UP.METHOD,
      API_CONSTANTS.ADMIN.SIGN_UP.URL,
      {},
      this.apiManager.httpOptions,
      true,
      true
    );
  };

  resumeDID = (): Observable<SignupResponseModel> => {
    return this.apiManager.httpHelperMethod<SignupResponseModel>(
      API_CONSTANTS.ADMIN.SIGN_UP.METHOD,
      API_CONSTANTS.ADMIN.SIGN_UP.URL,
      {},
      this.apiManager.httpOptions,
      true,
      true
    );
  };

  resumeParticipant = (): Observable<SignupResponseModel> => {
    return this.apiManager.httpHelperMethod<SignupResponseModel>(
      API_CONSTANTS.ADMIN.SIGN_UP.METHOD,
      API_CONSTANTS.ADMIN.SIGN_UP.URL,
      {},
      this.apiManager.httpOptions,
      true,
      true
    );
  };
}
