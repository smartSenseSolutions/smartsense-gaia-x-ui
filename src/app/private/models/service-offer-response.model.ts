import { APIResponse } from 'src/app/shared/models';

export interface ServiceOfferResponsePayloadModel {
  id: number;
  enterpriseName: string;
  enterpriseId: number;
  credentialId: number;
  subDomainName: string;
  subjectDid: string;
  name: string;
  producedBy: string;
  copyrightOwnedBy: string;
  description: number;
  accessType: string;
  requestType: string;
  formatType: string;
  terms: string;
  termsHash: string;
  offerLink: string;
}

export type ServiceOfferResponse = APIResponse<
  ServiceOfferResponsePayloadModel[]
>;
