import {
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

const initState = {
  success: false,
  error: false,
  loading: false,
  data: {},
  payload: {},
};

const state = (state = initState, action) => {
  switch (action.type) {
    case COMPANY_INIT:
      return {
        ...state,
        loading: false,
        success: false,
        error: false,
      };

    case COMPANY_CLEAR:
      return { ...initState };

    case COMPANY_GET:
    case COMPANY_STORE:
    case COMPANY_PATCH:
      return {
        ...state,
        payload: action.payload,
        loading: true,
        success: false,
        error: false,
      };

    case COMPANY_GET_SUCCESS:
    case COMPANY_STORE_SUCCESS:
    case COMPANY_PATCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        payload: {},
        loading: false,
        success: true,
        error: false,
      };

    case COMPANY_GET_FAILURE:
    case COMPANY_STORE_FAILURE:
    case COMPANY_PATCH_FAILURE:
      return {
        ...state,
        payload: action.payload,
        loading: false,
        success: false,
        error: true,
      };

    default:
      return { ...state };
  }
};

export default state;
