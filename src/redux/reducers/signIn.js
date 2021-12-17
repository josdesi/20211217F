import {
  AUTH_SIGN_IN,
  AUTH_SIGN_IN_CLEAR,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_IN_FAILURE,
} from "../types";

const initState = {
  success: false,
  error: false,
  loading: false,
  payload: {},
};

const state = (state = initState, action) => {
  switch (action.type) {
    case AUTH_SIGN_IN:
      return {
        ...state,
        payload: action.payload,
        loading: true,
        success: false,
        error: false,
      };

    case AUTH_SIGN_IN_CLEAR:
      return { ...initState };

    case AUTH_SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
      };

    case AUTH_SIGN_IN_FAILURE:
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
