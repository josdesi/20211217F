import {
  LOCATION_GET_ALL,
  LOCATION_GET_ALL_CLEAR,
  LOCATION_GET_ALL_SUCCESS,
  LOCATION_GET_ALL_FAILURE,
} from "../types";

export const dispatchGetLocations = (user) => ({
  type: LOCATION_GET_ALL,
  payload: { user },
});

export const dispatchClearLocations = (user) => ({
  type: LOCATION_GET_ALL_CLEAR,
  payload: { user },
});

export const dispatchSuccessGetLocations = (payload = {}) => ({
  type: LOCATION_GET_ALL_SUCCESS,
  payload,
});

export const dispatchFailureGetLocations = (payload = {}) => ({
  type: LOCATION_GET_ALL_FAILURE,
  payload,
});
