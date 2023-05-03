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

export type LoginQRResponseModel = APIResponse<LoginResponsePayloadModel>;
