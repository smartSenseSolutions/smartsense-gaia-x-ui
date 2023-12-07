export interface ConnectionResponse {
  statusCode: number;
  message: string;
  data: {
    records: {
      status: string;
    };
  };
}
export type ConnectionResponseModel = ConnectionResponse;
