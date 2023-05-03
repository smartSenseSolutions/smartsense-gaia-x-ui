import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONSTANTS } from 'src/app/shared/constants';
import { ApiManagerService } from 'src/app/shared/services';
import { LoginRequestModel } from '../../models/login/login-request.model';
import {
  LoginQRResponseModel,
  LoginResponseModel,
} from '../../models/login/login-response.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private apiManager: ApiManagerService,
    private httpClient: HttpClient
  ) {}

  getLoginQR = (): Observable<LoginQRResponseModel> => {
    return this.apiManager.httpHelperMethod<LoginQRResponseModel>(
      API_CONSTANTS.LOGIN_QR_CODE.METHOD,
      API_CONSTANTS.LOGIN_QR_CODE.URL,
      {
        attributes: [
          {
            credentialDefId:
              '7KuDTpQh3GJ7Gp6kErpWvM:3:CL:47599:smart-x-member-def',
            attributeName: 'name',
            value: '',
            condition: '',
          },
          {
            credentialDefId:
              '7KuDTpQh3GJ7Gp6kErpWvM:3:CL:47599:smart-x-member-def',
            attributeName: 'email',
            value: '',
            condition: '',
          },
        ],
        options: {
          type: 'Aries1.0',
        },
      },
      this.apiManager.httpOptions,
      true,
      true
    );
  };

  pollLoginStatus = (
    loginRequest: LoginRequestModel
  ): Observable<LoginResponseModel> => {
    return this.apiManager.httpHelperMethod<LoginResponseModel>(
      API_CONSTANTS.LOGIN.METHOD,
      API_CONSTANTS.LOGIN.URL,
      loginRequest,
      this.apiManager.httpOptions,
      true,
      true
    );
  };

  login = (loginRequest: LoginRequestModel): Observable<LoginResponseModel> => {
    return this.apiManager.httpHelperMethod<LoginResponseModel>(
      API_CONSTANTS.LOGIN.METHOD,
      API_CONSTANTS.LOGIN.URL,
      loginRequest,
      this.apiManager.httpOptions,
      true,
      true
    );
  };
}
