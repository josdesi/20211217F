import {
  RELOCATION_GET_ALL,
  RELOCATION_GET_ALL_SUCCESS,
  RELOCATION_GET_ALL_FAILURE,
} from "../types";

export const dispatchGetRelocations = (user) => ({
  type: RELOCATION_GET_ALL,
  payload: { user },
});

export const dispatchSuccessGetRelocations = (payload = {}) => ({
  type: RELOCATION_GET_ALL_SUCCESS,
  payload,
});

export const dispatchFailureGetRelocations = (payload = {}) => ({
  type: RELOCATION_GET_ALL_FAILURE,
  payload,
});
