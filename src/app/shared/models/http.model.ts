import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

/**
 * Http Response Common Model
 * @interface
 */
export interface APIResponse<T> {
    /** Status Code */
    status: number;
    /** Message */
    message?: string;
    /** Response Payload */
    payload: T;
}

/**
 * Http Options required in Making Http Request
 * @interface
 */
export interface HttpOptions {
    /** headers */
    headers?: HttpHeaders | { [header: string]: string | string[] };
    /** Context */
    context?: HttpContext;
    /** Observe */
    observe?: 'body';
    /** Query Parameters */
    params?:
        | HttpParams
        | {
              [param: string]:
                  | string
                  | number
                  | boolean
                  | ReadonlyArray<string | number | boolean>;
          };
    /** Flag for Progress */
    reportProgress?: boolean;
    /** With Credentials */
    withCredentials?: boolean;
}

export interface JsonHttpOptions extends HttpOptions {
    /** Response Type */
    responseType?: 'json';
}

export interface blobHttpOptions extends HttpOptions {
    /** Response Type */
    responseType?: 'blob';
}
