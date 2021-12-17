import {
  CURRENCY_GET_ALL,
  CURRENCY_GET_ALL_SUCCESS,
  CURRENCY_GET_ALL_FAILURE,
} from "../types";

export const dispatchGetCurrencies = (user) => ({
  type: CURRENCY_GET_ALL,
  payload: { user },
});

export const dispatchSuccessGetCurrencies = (payload = {}) => ({
  type: CURRENCY_GET_ALL_SUCCESS,
  payload,
});

export const dispatchFailureGetCurrencies = (payload = {}) => ({
  type: CURRENCY_GET_ALL_FAILURE,
  payload,
});
