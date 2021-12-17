import {
  COMPANY_TYPE_GET_ALL,
  COMPANY_TYPE_GET_ALL_SUCCESS,
  COMPANY_TYPE_GET_ALL_FAILURE,
} from "../types";

export const dispatchGetCompanyTypes = (user) => ({
  type: COMPANY_TYPE_GET_ALL,
  payload: { user },
});

export const dispatchSuccessGetCompanyTypes = (payload = {}) => ({
  type: COMPANY_TYPE_GET_ALL_SUCCESS,
  payload,
});

export const dispatchFailureGetCompanyTypes = (payload = {}) => ({
  type: COMPANY_TYPE_GET_ALL_FAILURE,
  payload,
});
