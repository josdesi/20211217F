import {
  TALENT_INIT,
  TALENT_CLEAR,
  TALENT_GET,
  TALENT_GET_SUCCESS,
  TALENT_GET_FAILURE,
  TALENT_GET_ALL,
  TALENT_GET_ALL_CLEAR,
  TALENT_GET_ALL_SUCCESS,
  TALENT_GET_ALL_FAILURE,
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

export const dispatchInitTalent = () => ({
  type: TALENT_INIT,
});

export const dispatchClearTalent = () => ({
  type: TALENT_CLEAR,
});

export const dispatchGetTalent = (payload = {}) => ({
  type: TALENT_GET,
  payload,
});

export const dispatchSuccessGetTalent = (payload = {}) => ({
  type: TALENT_GET_SUCCESS,
  payload,
});

export const dispatchFailureGetTalent = (payload = {}) => ({
  type: TALENT_GET_FAILURE,
  payload,
});

export const dispatchGetTalents = (payload = {}) => ({
  type: TALENT_GET_ALL,
  payload,
});

export const dispatchClearGetTalents = () => ({
  type: TALENT_GET_ALL_CLEAR,
});

export const dispatchSuccessGetTalents = (payload = {}) => ({
  type: TALENT_GET_ALL_SUCCESS,
  payload,
});

export const dispatchFailureGetTalents = (payload = {}) => ({
  type: TALENT_GET_ALL_FAILURE,
  payload,
});

export const dispatchStoreTalent = (payload = {}) => ({
  type: TALENT_STORE,
  payload,
});

export const dispatchSuccessStoreTalent = (payload = {}) => ({
  type: TALENT_STORE_SUCCESS,
  payload,
});

export const dispatchFailureStoreTalent = (payload = {}) => ({
  type: TALENT_STORE_FAILURE,
  payload,
});

export const dispatchPatchTalent = (payload = {}) => ({
  type: TALENT_PATCH,
  payload,
});

export const dispatchSuccessPatchTalent = (payload = {}) => ({
  type: TALENT_PATCH_SUCCESS,
  payload,
});

export const dispatchFailurePatchTalent = (payload = {}) => ({
  type: TALENT_PATCH_FAILURE,
  payload,
});

export const dispatchDestroyTalent = (payload = {}) => ({
  type: TALENT_DESTROY,
  payload,
});

export const dispatchSuccessDestroyTalent = (payload = {}) => ({
  type: TALENT_DESTROY_SUCCESS,
  payload,
});

export const dispatchFailureDestroyTalent = (payload = {}) => ({
  type: TALENT_DESTROY_FAILURE,
  payload,
});
