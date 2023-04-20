import { APIResponse } from 'src/app/shared/models';

export interface VPResponsePayloadModel {
  type: string[];
  '@context': string[];
  proof: Proof;
  verifiableCredential: VerifiableCredential[];
}

export interface VerifiableCredential {
  issuanceDate: string;
  id: string;
  issuer: string;
  proof: Proof;
  type: string[];
  '@context': string[];
  credentialSubject: CredentialSubject;
}
export interface CredentialSubject {
  [key: string]: {
    [key: string]: string;
  };
}
export interface Proof {
  created: string;
  jws: string;
  proofPurpose: string;
  type: string;
  verificationMethod: string;
}

export type VPResponseModel = APIResponse<VPResponsePayloadModel>;
