import { APIResponse } from 'src/app/shared/models';

export interface SignupResponsePayloadModel {
  token: string;
  session: {
    enterpriseId: number;
    email: string;
    role: number;
  };
}

export type SignupResponseModel = APIResponse<SignupResponsePayloadModel>;
