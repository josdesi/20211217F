import { SEARCHER_SET_DATA, SEARCHER_CLEAR, SEARCHER_TRIGGER } from "../types";

const initState = {
  loading: false,
  id: null,
  quickSearch: null,
  industries: [],
  locations: [],
};

const state = (state = initState, action) => {
  switch (action.type) {
    case SEARCHER_SET_DATA:
      return {
        ...state,
        ...action.payload,
      };

    case SEARCHER_TRIGGER:
      return {
        ...state,
        ...action.payload,
        loading: true,
      };

    case SEARCHER_CLEAR:
      return { ...initState };

    default:
      return { ...state };
  }
};

export default state;
