import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpMethodEnum } from '../../enums';
import { HttpOptions, blobHttpOptions } from '../../models';
import { HttpHelperService } from '../http-helper/http-helper.service';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root',
})
export class ApiManagerService extends HttpHelperService {
  /**
   * Constructor
   * @param sharedService
   * @param http
   */
  constructor(sharedService: SharedService, http: HttpClient) {
    super(sharedService, http);
  }

  /**
   * method name : override httpHelperMethod
   * purpose : handle loader, and call overload in parent class for getting Observable of response
   * created : Sep 24 2018 11:30 AM
   * Revision :
   */
  override httpHelperMethod<T1>(
    methodType: HttpMethodEnum,
    url: string,
    params = {},
    httpOptions: HttpOptions,
    showSnackBar: boolean,
    showLoader: boolean,
    searchParams = {},
    filesObj?: ({ reqKey: string } & File)[]
  ): Observable<T1> {
    if (showLoader) {
      this.sharedService.setLoader(true);
    }
    if (
      methodType === HttpMethodEnum.POST_MULTIPART ||
      methodType === HttpMethodEnum.PUT_MULTIPART
    ) {
      const formData = this.createFormDataObject(params, filesObj);
      params = formData;
    }
    return super.httpHelperMethod<T1>(
      methodType,
      url,
      params,
      httpOptions,
      showSnackBar,
      showLoader,
      searchParams
    );
  }

  /**
   * HttpOptions header for APIs
   */
  get httpOptions(): { headers: HttpHeaders } {
    return { headers: new HttpHeaders({}) };
  }

  /**
   * Header with token
   */
  get authorizationHttpOptions(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        Authorization: `${this.sharedService.getToken()}`,
      }),
    };
  }

  /**
   * return formData object from filesObject
   */
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  createFormDataObject = (params: any, filesObj: any): FormData => {
    const formData = new FormData();
    for (const obj of filesObj) {
      for (const file of obj.files) {
        formData.append(obj.reqKey, file, file.name);
      }
    }
    if (params && Object.keys(params).length) {
      for (const docKey in params) {
        if (typeof params[docKey] === 'object') {
          formData.append(docKey, JSON.stringify(params[docKey]));
        } else {
          formData.append(docKey, params[docKey]);
        }
      }
    }
    return formData;
  };

  /**
   * Header for blob
   */
  get blobHttpOptions(): blobHttpOptions {
    return {
      responseType: 'blob',
    };
  }

  /**
   * Header for auth blob
   */
  get authBlobHttpOptions(): blobHttpOptions {
    return {
      headers: new HttpHeaders({
        Authorization: `${this.sharedService.getToken()}`,
      }),
      responseType: 'blob',
    };
  }
}
