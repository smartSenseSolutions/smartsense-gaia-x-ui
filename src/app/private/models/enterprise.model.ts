export interface EnterpriseModel {
  id: number;
  email: string;
  did: string;
  password: string;
  legalName: string;
  subDomainName: string;
  legalRegistrationNumber: string;
  legalRegistrationType: string;
  headquarterAddress: string;
  legalAddress: string;
  status: number;
  didJson: string;
  participantJson: string;
  certificateChain: string;
}
