import { HttpMethodEnum } from '../enums';

export const BASE_URL = 'https://gaiaxapi.proofsense.in';

export const API_CONSTANTS = {
  LOGIN: {
    METHOD: HttpMethodEnum.POST,
    URL: `${BASE_URL}/login`,
  },
  ADMIN: {
    SIGN_UP: {
      METHOD: HttpMethodEnum.POST,
      URL: `${BASE_URL}/register`,
    },
    GET_ENTERPRISE: {
      METHOD: HttpMethodEnum.POST,
      URL: `${BASE_URL}/register`,
    },
    RESUME_SUBDOMAIN: {
      METHOD: HttpMethodEnum.POST,
      URL: `${BASE_URL}/register`,
    },
    RESUME_CERTIFICATE: {
      METHOD: HttpMethodEnum.POST,
      URL: `${BASE_URL}/register`,
    },
    RESUME_INGRESS: {
      METHOD: HttpMethodEnum.POST,
      URL: `${BASE_URL}/register`,
    },
    RESUME_DID: {
      METHOD: HttpMethodEnum.POST,
      URL: `${BASE_URL}/register`,
    },
    RESUME_PARTICIPANT: {
      METHOD: HttpMethodEnum.POST,
      URL: `${BASE_URL}/register`,
    },
  },
  ENTERPRISE: {
    CATALOGUE: {
      METHOD: HttpMethodEnum.POST,
      URL: `${BASE_URL}/catalogue`,
    },
    VCS: {
      METHOD: HttpMethodEnum.POST,
      URL: `${BASE_URL}/enterprises/vcs`,
    },
  },
};
