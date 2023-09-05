export interface LoginRequestModel {
  type: number;
  email: string;
  password: string;
}

export interface EnterpriseLoginPollRequestModel {
  proofRecordId: string;
}
