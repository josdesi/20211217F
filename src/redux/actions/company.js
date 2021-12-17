import {
  COMPANY_GET_ALL,
  COMPANY_GET_ALL_CLEAR,
  COMPANY_GET_ALL_SUCCESS,
  COMPANY_GET_ALL_FAILURE,
  COMPANY_CLEAR,
  COMPANY_INIT,
  COMPANY_GET,
  COMPANY_GET_SUCCESS,
  COMPANY_GET_FAILURE,
  COMPANY_STORE,
  COMPANY_STORE_SUCCESS,
  COMPANY_STORE_FAILURE,
  COMPANY_PATCH,
  COMPANY_PATCH_SUCCESS,
  COMPANY_PATCH_FAILURE,
} from "../types";

export const dispatchInitCompany = () => ({
  type: COMPANY_INIT,
});

export const dispatchClearCompany = () => ({
  type: COMPANY_CLEAR,
});

export const dispatchGetCompany = (payload = {}) => ({
  type: COMPANY_GET,
  payload,
});

export const dispatchSuccessGetCompany = (payload = {}) => ({
  type: COMPANY_GET_SUCCESS,
  payload,
});

export const dispatchFailureGetCompany = (payload = {}) => ({
  type: COMPANY_GET_FAILURE,
  payload,
});

export const dispatchGetCompanies = (payload = {}) => ({
  type: COMPANY_GET_ALL,
  payload,
});

export const dispatchClearGetCompanies = () => ({
  type: COMPANY_GET_ALL_CLEAR,
});

export const dispatchSuccessGetCompanies = (payload = {}) => ({
  type: COMPANY_GET_ALL_SUCCESS,
  payload,
});

export const dispatchFailureGetCompanies = (payload = {}) => ({
  type: COMPANY_GET_ALL_FAILURE,
  payload,
});

export const dispatchStoreCompany = (payload = {}) => ({
  type: COMPANY_STORE,
  payload,
});

export const dispatchSuccessStoreCompany = (payload = {}) => ({
  type: COMPANY_STORE_SUCCESS,
  payload,
});

export const dispatchFailureStoreCompany = (payload = {}) => ({
  type: COMPANY_STORE_FAILURE,
  payload,
});

export const dispatchPatchCompany = (payload = {}) => ({
  type: COMPANY_PATCH,
  payload,
});

export const dispatchSuccessPatchCompany = (payload = {}) => ({
  type: COMPANY_PATCH_SUCCESS,
  payload,
});

export const dispatchFailurePatchCompany = (payload = {}) => ({
  type: COMPANY_PATCH_FAILURE,
  payload,
});
