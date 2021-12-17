import { COMPANY_TYPE_GET_ALL, COMPANY_TYPE_GET_ALL_SUCCESS } from "../types";

const initState = {
  success: false,
  error: false,
  loading: false,
  payload: {},
};

const state = (state = initState, action) => {
  switch (action.type) {
    case COMPANY_TYPE_GET_ALL:
      return {
        ...state,
        payload: action.payload,
        loading: true,
        success: false,
        error: false,
      };

    case COMPANY_TYPE_GET_ALL_SUCCESS:
      return {
        ...state,
        payload: action.payload,
        loading: false,
        success: true,
        error: false,
      };

    default:
      return { ...state };
  }
};

export default state;
