import { USER_SET_DATA, USER_CLEAR } from "../types";

export const dispatchSetUserData = (payload = {}) => ({
  type: USER_SET_DATA,
  payload,
});

export const dispatchClearUser = () => ({
  type: USER_CLEAR,
});
