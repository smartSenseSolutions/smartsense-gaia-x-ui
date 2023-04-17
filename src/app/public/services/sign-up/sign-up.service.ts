import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiManagerService, SharedService } from 'src/app/shared/services';
import { SignupRequestModel } from '../../models/signup/signup-request.model';
import { SignupResponseModel } from '../../models/signup/signup-response.model';
import { API_CONSTANTS } from 'src/app/shared/constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  
  constructor(
    private apiManager: ApiManagerService,
    private httpClient: HttpClient
  ) {}

  login = (
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
}
