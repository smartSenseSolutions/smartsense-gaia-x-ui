import { SignStepOneModel } from "./signup-step-one.model";
import { SignStepTwoModel } from "./signup-step-two.model";

export interface SignupRequestModel extends  SignStepOneModel, SignStepTwoModel{
    headquarterAddress: string;
    legalAddress: string;
}
