import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONSTANTS } from 'src/app/shared/constants';
import { ApiManagerService } from 'src/app/shared/services';
import {
  EnterpriseLoginPollRequestModel,
  EnterpriseLoginPollResponseModel,
  EnterpriseQRLoginResponseModel,
  LoginRequestModel,
  LoginResponseModel,
} from '../../models';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private apiManager: ApiManagerService) {}

  getLoginQR = (): Observable<EnterpriseQRLoginResponseModel> => {
    return this.apiManager.httpHelperMethod<EnterpriseQRLoginResponseModel>(
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
      false,
      false
    );
  };

  pollLoginStatus = (
    loginPollRequest: EnterpriseLoginPollRequestModel
  ): Observable<EnterpriseLoginPollResponseModel> => {
    return this.apiManager.httpHelperMethod<EnterpriseLoginPollResponseModel>(
      API_CONSTANTS.LOGIN_QR_POLL.METHOD,
      API_CONSTANTS.LOGIN_QR_POLL.URL,
      loginPollRequest,
      this.apiManager.httpOptions,
      false,
      false
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
