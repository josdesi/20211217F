import {
  TALENT_FILE_UPLOAD,
  TALENT_FILE_UPLOAD_INIT,
  TALENT_FILE_UPLOAD_CLEAR,
  TALENT_FILE_UPLOAD_SUCCESS,
  TALENT_FILE_UPLOAD_FAILURE,
  TALENT_FILE_STATE_ID_REMOVE,
} from "../types";
import { isEmptyObject } from "../../utils/dataTypes";
const stateStructure = {
  success: false,
  error: false,
  loading: false,
  payload: {},
};

const initState = {
  emptyStatesId: true,
  loading: false,
};

const state = (state = initState, action) => {
  const stateId = action.payload?.stateId;
  if (!stateId) return { ...state };

  const keys = Object.keys(state);
  const loading = keys.some(
    (key) => key != stateId && !isEmptyObject(state[key]) && state[key].loading
  );

  switch (action.type) {
    case TALENT_FILE_UPLOAD_INIT:
      return {
        ...state,
        emptyStatesId: false,
        [stateId]: { ...stateStructure },
      };

    case TALENT_FILE_UPLOAD_CLEAR:
      return { ...initState };

    case TALENT_FILE_UPLOAD:
      return {
        ...state,
        loading: true,
        [stateId]: {
          ...state[stateId],
          payload: action.payload,
          loading: true,
          success: false,
          error: false,
        },
      };

    case TALENT_FILE_UPLOAD_SUCCESS:
      return {
        ...state,
        loading,
        [stateId]: {
          ...state[stateId],
          payload: action.payload,
          loading: false,
          success: true,
          error: false,
        },
      };

    case TALENT_FILE_UPLOAD_FAILURE:
      return {
        ...state,
        loading,
        [stateId]: {
          ...state[stateId],
          payload: action.payload,
          loading: false,
          success: false,
          error: true,
        },
      };
    case TALENT_FILE_STATE_ID_REMOVE:
      delete state[stateId];

      return {
        ...state,
        loading,
        emptyStatesId: keys.length === 2,
      };

    default:
      return { ...state };
  }
};

export default state;
