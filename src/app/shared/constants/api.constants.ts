import { HttpMethodEnum } from '../enums';

export const BASE_URL = 'https://gaiaxapi.proofsense.in';

export const API_CONSTANTS = {
  LOGIN: {
    METHOD: HttpMethodEnum.POST,
    URL: `${BASE_URL}/login`,
  },
  LOGIN_QR_CODE: {
    METHOD: HttpMethodEnum.POST,
    URL: `https://gaiax.vereign.com/ocm/proof/v1/send-out-of-band-presentation-request`,
  },
  LOGIN_QR_POLL: {
    METHOD: HttpMethodEnum.GET,
    URL: `${BASE_URL}/verify/presentation`,
  },
  TINY_URL:{
    METHOD: HttpMethodEnum.POST,
    URL: `${BASE_URL}/tinyurl`,
  },
  ADMIN: {
    SIGN_UP: {
      METHOD: HttpMethodEnum.POST,
      URL: `${BASE_URL}/register`,
    },
    SIGN_UP_QR_CODE: {
      METHOD: HttpMethodEnum.POST,
      URL: 'https://gaiax.vereign.com/ocm/connection/v1/invitation-url?alias=trust',
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
    DETAIL: {
      METHOD: HttpMethodEnum.GET,
      URL: `${BASE_URL}/enterprises`,
    },
    VCS: {
      METHOD: HttpMethodEnum.POST,
      URL: `${BASE_URL}/enterprises/vcs`,
    },
    SERVICE_OFFERS: {
      METHOD: HttpMethodEnum.GET,
      URL: `${BASE_URL}/enterprises/service-offers`,
    },
    CREATE_SERVICE_OFFER: {
      METHOD: HttpMethodEnum.POST,
      URL: `${BASE_URL}/enterprises/service-offers`,
    },
    CATALOGUE: {
      METHOD: HttpMethodEnum.GET,
      URL: `${BASE_URL}/catalogue`,
    },
    SERVICE_OFFERS_DETAIL_WITH_OFFER_ID: {
      METHOD: HttpMethodEnum.GET,
      URL: `${BASE_URL}/enterprises/service-offers/{offer_id}/details`,
    },
    CREATE_VP: {
      METHOD: HttpMethodEnum.GET,
      URL: `${BASE_URL}/enterprises/vc/{credential_name}/vp`,
    },
  },
};
