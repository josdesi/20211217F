import {
  SENIORITY_GET_ALL,
  SENIORITY_GET_ALL_SUCCESS,
  SENIORITY_GET_ALL_FAILURE,
} from "../types";

export const dispatchGetSeniorities = (user) => ({
  type: SENIORITY_GET_ALL,
  payload: { user },
});

export const dispatchSuccessGetSeniorities = (payload = {}) => ({
  type: SENIORITY_GET_ALL_SUCCESS,
  payload,
});

export const dispatchFailureGetSeniorities = (payload = {}) => ({
  type: SENIORITY_GET_ALL_FAILURE,
  payload,
});
