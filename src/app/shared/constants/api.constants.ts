import { HttpMethodEnum } from "../enums";

export const BASE_URL = 'http://gaiax.proofsense.in:30016';

export const API_CONSTANTS = {
    LOGIN :{
        METHOD : HttpMethodEnum.POST,
        URL :`${BASE_URL}/login`
    },
    SIGN_UP :{
        METHOD : HttpMethodEnum.POST,
        URL :`${BASE_URL}/register`
    },
    CATALOGUE :{
        METHOD : HttpMethodEnum.POST,
        URL :`${BASE_URL}/catalogue`
    },
    VCS :{
        METHOD : HttpMethodEnum.POST,
        URL :`${BASE_URL}/enterprises/vcs`
    },
}