import {
  TALENT_FILE_DESTROY,
  TALENT_FILE_DESTROY_SUCCESS,
  TALENT_FILE_DESTROY_FAILURE,
} from "../types";

const initState = {
  success: false,
  error: false,
  loading: false,
  payload: {},
};

const state = (state = initState, action) => {
  switch (action.type) {
    case TALENT_FILE_DESTROY:
      return {
        ...state,
        payload: action.payload,
        loading: true,
        success: false,
        error: false,
      };

    case TALENT_FILE_DESTROY_SUCCESS:
      return {
        ...state,
        payload: action.payload,
        loading: false,
        success: true,
        error: false,
      };

    case TALENT_FILE_DESTROY_FAILURE:
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
