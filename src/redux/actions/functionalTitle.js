import {
  FUNCTIONAL_TITLE_GET_ALL,
  FUNCTIONAL_TITLE_GET_ALL_SUCCESS,
  FUNCTIONAL_TITLE_GET_ALL_FAILURE,
} from "../types";

export const dispatchGetFunctionalTitles = (user) => ({
  type: FUNCTIONAL_TITLE_GET_ALL,
  payload: { user },
});

export const dispatchSuccessGetFunctionalTitles = (payload = {}) => ({
  type: FUNCTIONAL_TITLE_GET_ALL_SUCCESS,
  payload,
});

export const dispatchFailureGetFunctionalTitles = (payload = {}) => ({
  type: FUNCTIONAL_TITLE_GET_ALL_FAILURE,
  payload,
});
