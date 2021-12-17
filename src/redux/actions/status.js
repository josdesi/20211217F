import {
  STATUS_GET_ALL,
  STATUS_GET_ALL_SUCCESS,
  STATUS_GET_ALL_FAILURE,
} from "../types";

export const dispatchGetStatuses = (user) => ({
  type: STATUS_GET_ALL,
  payload: { user },
});

export const dispatchSuccessGetStatuses = (payload = {}) => ({
  type: STATUS_GET_ALL_SUCCESS,
  payload,
});

export const dispatchFailureGetStatuses = (payload = {}) => ({
  type: STATUS_GET_ALL_FAILURE,
  payload,
});
