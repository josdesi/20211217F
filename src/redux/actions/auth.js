import {
  AUTH_SIGN_IN,
  AUTH_SIGN_IN_CLEAR,
  AUTH_SIGN_IN_FAILURE,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_OUT,
  AUTH_SIGN_OUT_CLEAR,
  AUTH_SIGN_OUT_SUCCESS,
} from "../types";

export const dispatchSignIn = (payload = {}) => ({
  type: AUTH_SIGN_IN,
  payload,
});

export const dispatchClearSignIn = () => ({
  type: AUTH_SIGN_IN_CLEAR,
});

export const dispatchSignInFailure = (payload = {}) => ({
  type: AUTH_SIGN_IN_FAILURE,
  payload,
});

export const dispatchSignInSuccess = (payload = {}) => ({
  type: AUTH_SIGN_IN_SUCCESS,
  payload,
});

export const dispatchSignOut = (payload = {}) => ({
  type: AUTH_SIGN_OUT,
  payload,
});

export const dispatchClearSignOut = (payload = {}) => ({
  type: AUTH_SIGN_OUT_CLEAR,
  payload,
});

export const dispatchSignOutSuccess = () => ({
  type: AUTH_SIGN_OUT_SUCCESS,
});
