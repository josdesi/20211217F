import {
  TALENT_CLEAR,
  TALENT_INIT,
  TALENT_GET,
  TALENT_GET_SUCCESS,
  TALENT_GET_FAILURE,
  TALENT_STORE,
  TALENT_STORE_SUCCESS,
  TALENT_STORE_FAILURE,
  TALENT_PATCH,
  TALENT_PATCH_SUCCESS,
  TALENT_PATCH_FAILURE,
  TALENT_DESTROY,
  TALENT_DESTROY_SUCCESS,
  TALENT_DESTROY_FAILURE,
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
    case TALENT_INIT:
      return {
        ...state,
        loading: false,
        success: false,
        error: false,
      };

    case TALENT_CLEAR:
      return { ...initState };

    case TALENT_GET:
    case TALENT_STORE:
    case TALENT_PATCH:
    case TALENT_DESTROY:
      return {
        ...state,
        payload: action.payload,
        loading: true,
        success: false,
        error: false,
      };

    case TALENT_GET_SUCCESS:
    case TALENT_STORE_SUCCESS:
    case TALENT_PATCH_SUCCESS:
    case TALENT_DESTROY_SUCCESS:
      return {
        ...state,
        data: action.payload,
        payload: {},
        loading: false,
        success: true,
        error: false,
      };

    case TALENT_GET_FAILURE:
    case TALENT_STORE_FAILURE:
    case TALENT_PATCH_FAILURE:
    case TALENT_DESTROY_FAILURE:
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
