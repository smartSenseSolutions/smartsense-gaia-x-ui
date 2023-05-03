import { APIResponse } from 'src/app/shared/models';

export interface LoginResponsePayloadModel {
  token: string;
  session: {
    enterpriseId: number;
    email: string;
    role: number;
  };
}

export type LoginResponseModel = APIResponse<LoginResponsePayloadModel>;

export interface EnterpriseQRLoginResponse {
  statusCode: number;
  message: string;
  data: {
    id: string;
    presentationId: string;
    connectionId: string;
    credentialDefId: string;
    schemaId: string;
    theirDid: string;
    status: string;
    createdDate: string;
    updatedDate: string;
    presentationMessage: string;
    presentationMessageShort: string;
  };
}

export type EnterpriseQRLoginResponseModel = EnterpriseQRLoginResponse;

export interface EnterpriseLoginPollResponse {}
export type EnterpriseLoginPollResponseModel =
  APIResponse<EnterpriseLoginPollResponse>;
