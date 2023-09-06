import { AddServiceDataModel } from "./add-service-data.model";
import { AddServiceModel } from "./add-service.model";
import { LabelLevelModel } from './label-level.model';

export interface AddServiceOfferRequest
  extends AddServiceModel,
    AddServiceDataModel {
  labelLevel: any;
}
