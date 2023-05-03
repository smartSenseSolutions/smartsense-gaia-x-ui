import { APIResponse } from "src/app/shared/models";

export interface TinyUrlResponse {
    url: string
  }
  export type TinyUrlResponseModel =
    APIResponse<TinyUrlResponse>;
  