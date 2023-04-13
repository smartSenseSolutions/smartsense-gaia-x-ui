import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, finalize, throwError } from 'rxjs';
import { HttpMethodEnum } from '../../enums';
import { HttpOptions } from '../../models';
import { SharedService } from '../shared/shared.service';
import { Response } from '../../models';
import { AppMessageConstants } from '../../constants';
import { isEmptyValue } from '../../functions';


@Injectable({
  providedIn: 'root',
})
export class HttpHelperService {
  /**
   * Base url variable
   */
  _baseUrl: string = '';

  /**
   * @ignore
   * @param sharedService
   * @param http
   */
  constructor(
    protected sharedService: SharedService,
    protected http: HttpClient
  ) {}

  /**
   * purpose : to return Observable of any(http response,error)
   * created : Sep 24 2018 11:30 AM
   * Revision :
   */
  protected httpHelperMethod<T1>(
    methodType: HttpMethodEnum,
    url: string,
    params = {},
    httpOptions: HttpOptions,
    showSnackBar: boolean,
    showLoader: boolean,
    searchParams: Record<string, unknown>
  ): Observable<Response<T1>> {
    return this.apiCall<T1>(
      methodType,
      url,
      params,
      httpOptions,
      searchParams
    ).pipe(
      tap((response: Response<T1>) => {
        this.setSnackBarMessage(response, showSnackBar);
        return response || {};
      }),
      catchError(this.handleError()),
      finalize(() => {
        if (showLoader) {
          this.sharedService.setLoader(false);
        }
      })
    );
  }

  /**
   * method name : apiCall
   * purpose : Communicate with server to get api data
   * created : Sep 24 2018 11:30 AM
   */

  private apiCall<T1>(
    methodType: HttpMethodEnum,
    url: string,
    params = {},
    httpOptions: HttpOptions,
    searchParams = {}
  ): Observable<Response<T1>> {
    url = `${this._baseUrl}` + url;
    switch (methodType) {
      case HttpMethodEnum.GET:
        return this.http.get<Response<T1>>(
          this.prepareEndpoint(url, params, searchParams),
          httpOptions
        );
      case HttpMethodEnum.POST:
      case HttpMethodEnum.POST_MULTIPART:
        if (searchParams) {
          httpOptions.params = searchParams;
        }
        return this.http.post<Response<T1>>(url, params, httpOptions);
      case HttpMethodEnum.PUT:
      case HttpMethodEnum.PUT_MULTIPART:
        return this.http.put<Response<T1>>(url, params, httpOptions);
      case HttpMethodEnum.DELETE:
        return this.http.delete<Response<T1>>(
          this.prepareEndpoint(url, params),
          httpOptions
        );
      default:
        return this.http.get<Response<T1>>(
          this.prepareEndpoint(url, params, searchParams),
          httpOptions
        );
    }
  }

  /**
   * method name : handleError
   * purpose : handler error for api call
   * created : Sep 24 2018 11:30 AM
   */
  private handleError() {
    return (error: HttpErrorResponse): Observable<never> => {
      if (error.status === 401) {
        this.sharedService.setSnackBar(AppMessageConstants.SESSION_MSG)
      }
      // TODO: send the error to remote logging infrastructure
      return throwError(error);
    };
  }

  /**
   * method name : prepareEndpoint
   * purpose : Prepare end point with query string
   * created : Sep 24 2018 11:30 AM
   */
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  private prepareEndpoint(endPoint: string, params: any, searchParams = {}) {
    if (!isEmptyValue(searchParams)) {
      params['search'] = JSON.stringify(searchParams);
    }
    if (Object.keys(params).length) {
      if (params) {
        endPoint += '?';
      }
      let count = 0;
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          endPoint +=
            count > 0 ? `&${key}=${params[key]}` : `${key}=${params[key]}`;
          count++;
        }
      }
    }
    return endPoint;
  }

  /**
   * method name : setSnackBarMessage
   * purpose : Set snake bar
   * created : Sep 24 2018 11:30 AM
   */
  private setSnackBarMessage<T>(res: Response<T>, show?: boolean) {
    const msg = res['message'];
    if (show && msg) {
      this.sharedService.setSnackBar(msg);
    }
  }
}
