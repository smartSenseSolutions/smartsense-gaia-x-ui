import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONSTANTS } from 'src/app/shared/constants';
import { ApiManagerService } from 'src/app/shared/services';
import { LoginRequestModel } from '../../models/login/login-request.model';
import { LoginResponseModel } from '../../models/login/login-response.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private apiManager: ApiManagerService,
    private httpClient: HttpClient
  ) {}

  login = (loginRequest: LoginRequestModel): Observable<LoginResponseModel> => {
    // return this.apiManager.httpHelperMethod<LoginResponseModel>(
    //   API_CONSTANTS.LOGIN.METHOD,
    //   API_CONSTANTS.LOGIN.URL,
    //   loginRequest,
    //   this.apiManager.httpOptions,
    //   true,
    //   true
    // );
    return this.httpClient.get<LoginResponseModel>('../assets/mock/mock-login-response.json')
  };
}
