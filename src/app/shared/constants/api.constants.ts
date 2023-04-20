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
      METHOD: HttpMethodEnum.GET,
      URL: `${BASE_URL}/enterprises/{id}`,
    },
    RESUME_SUBDOMAIN: {
      METHOD: HttpMethodEnum.GET,
      URL: `${BASE_URL}/subdomain/{enterpriseId}`,
    },
    RESUME_CERTIFICATE: {
      METHOD: HttpMethodEnum.GET,
      URL: `${BASE_URL}/certificate/{enterpriseId}`,
    },
    RESUME_INGRESS: {
      METHOD: HttpMethodEnum.GET,
      URL: `${BASE_URL}/ingress/{enterpriseId}`,
    },
    RESUME_DID: {
      METHOD: HttpMethodEnum.GET,
      URL: `${BASE_URL}/did/{enterpriseId}`,
    },
    RESUME_PARTICIPANT: {
      METHOD: HttpMethodEnum.GET,
      URL: `${BASE_URL}/participant/{enterpriseId}`,
    },
  },
  ENTERPRISE: {
    CATALOGUE: {
      METHOD: HttpMethodEnum.GET,
      URL: `${BASE_URL}/catalogue`,
    },
    VCS: {
      METHOD: HttpMethodEnum.POST,
      URL: `${BASE_URL}/enterprises/vcs`,
    },
    SERVICE_OFFERS: {
      METHOD: HttpMethodEnum.GET,
      URL: `${BASE_URL}/enterprises/service-offers`,
    },
    SERVICE_OFFER_DETAIL: {
      METHOD: HttpMethodEnum.GET,
      URL: `${BASE_URL}/enterprises/service-offers`,
    },
  },
};
