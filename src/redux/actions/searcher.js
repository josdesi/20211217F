import { SEARCHER_SET_DATA, SEARCHER_CLEAR } from "../types";

export const dispatchSetSearcherData = (payload = {}) => ({
  type: SEARCHER_SET_DATA,
  payload,
});

export const dispatchClearSearcher = () => ({
  type: SEARCHER_CLEAR,
});
