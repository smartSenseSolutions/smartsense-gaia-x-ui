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
    SERVICE_OFFERS_DETAIL_WITH_OFFER_ID: {
      METHOD: HttpMethodEnum.POST,
      URL: `${BASE_URL}/enterprises/service-offers/{offer_id}/details`,
    },
    CREATE_VP: {
      METHOD: HttpMethodEnum.GET,
      URL: `${BASE_URL}/enterprises/vc/{credential_name}/vp`,
    },
  },
};
