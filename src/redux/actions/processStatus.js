import {
  PROCESS_STATUS_GET_ALL,
  PROCESS_STATUS_GET_ALL_SUCCESS,
  PROCESS_STATUS_GET_ALL_FAILURE,
} from "../types";

export const dispatchGetProcessStatuses = (user) => ({
  type: PROCESS_STATUS_GET_ALL,
  payload: { user },
});

export const dispatchSuccessGetProcessStatuses = (payload = {}) => ({
  type: PROCESS_STATUS_GET_ALL_SUCCESS,
  payload,
});

export const dispatchFailureGetProcessStatuses = (payload = {}) => ({
  type: PROCESS_STATUS_GET_ALL_FAILURE,
  payload,
});
