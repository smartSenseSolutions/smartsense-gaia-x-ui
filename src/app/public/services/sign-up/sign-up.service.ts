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
  constructor(
    private apiManager: ApiManagerService,
    private httpClient: HttpClient
  ) {}

  signup = (
    signupRequest: SignupRequestModel
  ): Observable<SignupResponseModel> => {
    return this.apiManager.httpHelperMethod<SignupResponseModel>(
      API_CONSTANTS.SIGN_UP.METHOD,
      API_CONSTANTS.SIGN_UP.URL,
      signupRequest,
      this.apiManager.httpOptions,
      true,
      true
    );
    // return this.httpClient.get<SignupResponseModel>(
    //   '../assets/mock/mock-login-response.json'
    // );
  };

  getStatus = (): Observable<SignupResponseModel> => {
    let signupRequest: any ={};

    return this.apiManager.httpHelperMethod<SignupResponseModel>(
      API_CONSTANTS.SIGN_UP.METHOD,
      API_CONSTANTS.SIGN_UP.URL,
      signupRequest,
      this.apiManager.httpOptions,
      true,
      true
    );
    // return this.httpClient.get<SignupResponseModel>(
    //   '../assets/mock/mock-login-response.json'
    // );
  };

  retrySignup = (): Observable<SignupResponseModel> => {
    let signupRequest: any ={};
    return this.apiManager.httpHelperMethod<SignupResponseModel>(
      API_CONSTANTS.SIGN_UP.METHOD,
      API_CONSTANTS.SIGN_UP.URL,
      signupRequest,
      this.apiManager.httpOptions,
      true,
      true
    );
    // return this.httpClient.get<SignupResponseModel>(
    //   '../assets/mock/mock-login-response.json'
    // );
  };
}
