import {
  INDUSTRY_GET_ALL,
  INDUSTRY_GET_ALL_SUCCESS,
  INDUSTRY_GET_ALL_FAILURE,
} from "../types";

export const dispatchGetIndustries = (user) => ({
  type: INDUSTRY_GET_ALL,
  payload: { user },
});

export const dispatchSuccessGetIndustries = (payload = {}) => ({
  type: INDUSTRY_GET_ALL_SUCCESS,
  payload,
});

export const dispatchFailureGetIndustries = (payload = {}) => ({
  type: INDUSTRY_GET_ALL_FAILURE,
  payload,
});
