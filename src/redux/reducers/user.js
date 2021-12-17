import { toObjectParse, getUserInitialState } from "../../utils";
import { USER_SET_DATA, USER_CLEAR } from "../types";

const userData = toObjectParse(localStorage.getItem("userData"));
const initState = getUserInitialState(userData);

const state = (state = initState, action) => {
  switch (action.type) {
    case USER_SET_DATA:
      return {
        ...state,
        ...action.payload,
      };

    case USER_CLEAR:
      return {};

    default:
      return { ...state };
  }
};

export default state;
