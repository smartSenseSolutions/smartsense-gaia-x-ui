export interface AddServiceModel {
  name: string;
  policy: string;
  description: string;
  accessType: string;
  requestType: string;
  formatType: string;
  terms: string;

  resource: {
    name: string;
    description: string;
    containsPII: boolean;
    policy: string;
    license: string;
    copyrightOwnedBy: string;
  };
}
