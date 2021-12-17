import {
  TALENT_FILE_GET_ALL,
  TALENT_FILE_GET_ALL_CLEAR,
  TALENT_FILE_GET_ALL_SUCCESS,
  TALENT_FILE_GET_ALL_FAILURE,
} from "../types";

const initState = {
  success: false,
  error: false,
  loading: false,
  payload: {},
};

const state = (state = initState, action) => {
  switch (action.type) {
    case TALENT_FILE_GET_ALL_CLEAR:
      return { ...initState };

    case TALENT_FILE_GET_ALL:
      return {
        ...state,
        payload: action.payload,
        loading: true,
        success: false,
        error: false,
      };

    case TALENT_FILE_GET_ALL_SUCCESS:
      return {
        ...state,
        payload: action.payload,
        loading: false,
        success: true,
        error: false,
      };

    case TALENT_FILE_GET_ALL_FAILURE:
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
