/**
 * Http constants
 * @enum HttpMethodEnum
 */
export enum HttpMethodEnum {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PUT_MULTIPART = 'putMultiPart',
  POST_MULTIPART = 'postMultiPart',
  POST_MULTIPART_UNIQUE = 'postMultiPartUnique',
}

/**
 * Key Enum for autocomplete
 * @enum KeyEnum
 */
export enum KeyEnum {
  ESCAPE = 27,
  ENTER = 13,
  ARROW_UP = 38,
  ARROW_DOWN = 40,
  TAB = 9,
}

/**
 * Http Status Code Enum
 * @enum HttpStatus
 */
export enum HttpStatus {
  SUCCESS = 200,
  BAS_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
}

/**
 * Devices media query Enum
 */
export enum MediaQuery {
  MOBILE = '(min-width: 320px) and (max-width: 599px)',
  TABLET = '(min-width: 600px) and (max-width: 1180px)',
}

/**
 * Device type Enum
 */
export enum DeviceType {
  MOBILE = 'Mobile',
  TABLET = 'Tablet',
  DESKTOP = 'Desktop',
}

export enum RouteType {
  Public = 1,
  Private = 2,
}


export enum UserType {
  Admin = 1,
  Enterprise = 2,
}
