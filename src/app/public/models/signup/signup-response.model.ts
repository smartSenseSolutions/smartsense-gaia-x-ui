import { EnterpriseModel } from 'src/app/private/models/enterprise.model';
import { APIResponse } from 'src/app/shared/models';

export type SignupResponseModel = APIResponse<EnterpriseModel>;

export interface SignupQRResponse {
    statusCode: number;
    message: string;
    data: {
      invitationUrl: string;
      invitation: {
        '@type': string;
        '@id': string;
        label: string;
        recipientKeys: string[];
        serviceEndpoint: string;
        routingKeys: [];
      };
      connection: {
        _tags: {};
        metadata: {};
        id: string;
        createdAt: string;
        did: string;
        didDoc: {
          '@context': string;
          publicKey: [
            {
              id: string;
              controller: string;
              type: string;
              publicKeyBase58: string;
            }
          ];
          service: [
            {
              id: string;
              serviceEndpoint: string;
              type: string;
              priority: number;
              recipientKeys: string[];
              routingKeys: [];
            }
          ];
          authentication: [
            {
              publicKey: string;
              type: string;
            }
          ];
          id: string;
        };
        verkey: string;
        state: string;
        role: string;
        alias: string;
        invitation: {
          '@type': string;
          '@id': string;
          label: string;
          recipientKeys: string[];
          serviceEndpoint: string;
          routingKeys: [];
        };
        multiUseInvitation: boolean;
      };
      invitationUrlShort: string;
    };
  }
export type SignupQRResponseModel = SignupQRResponse;
