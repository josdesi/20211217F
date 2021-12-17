import {
  AUTH_SIGN_OUT,
  AUTH_SIGN_OUT_CLEAR,
  AUTH_SIGN_OUT_SUCCESS,
} from "../types";

const initState = {
  success: false,
  error: false,
  loading: false,
  payload: {},
};

const state = (state = initState, action) => {
  switch (action.type) {
    case AUTH_SIGN_OUT:
      return {
        ...state,
        payload: action.payload,
        loading: true,
        success: false,
        error: false,
      };

    case AUTH_SIGN_OUT_CLEAR:
      return { ...initState };

    case AUTH_SIGN_OUT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
      };

    default:
      return { ...state };
  }
};

export default state;
