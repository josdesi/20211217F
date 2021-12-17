import {
  TALENT_FILE_GET_ALL,
  TALENT_FILE_GET_ALL_CLEAR,
  TALENT_FILE_GET_ALL_SUCCESS,
  TALENT_FILE_GET_ALL_FAILURE,
  TALENT_FILE_UPLOAD,
  TALENT_FILE_UPLOAD_INIT,
  TALENT_FILE_UPLOAD_CLEAR,
  TALENT_FILE_UPLOAD_SUCCESS,
  TALENT_FILE_UPLOAD_FAILURE,
  TALENT_FILE_DESTROY,
  TALENT_FILE_DESTROY_SUCCESS,
  TALENT_FILE_DESTROY_FAILURE,
  TALENT_FILE_STATE_ID_REMOVE,
} from "../types";

export const dispatchClearTalentFiles = () => ({
  type: TALENT_FILE_GET_ALL_CLEAR,
});

export const dispatchGetAllTalentFiles = (payload = {}) => ({
  type: TALENT_FILE_GET_ALL,
  payload,
});

export const dispatchSuccessGetAllTalentFiles = (payload = {}) => ({
  type: TALENT_FILE_GET_ALL_SUCCESS,
  payload,
});

export const dispatchFailureGetAllTalentFiles = (payload = {}) => ({
  type: TALENT_FILE_GET_ALL_FAILURE,
  payload,
});

export const dispatchUploadTalentFile = (payload = {}) => ({
  type: TALENT_FILE_UPLOAD,
  payload,
});

export const dispatchInitTalentFile = (payload = {}) => ({
  type: TALENT_FILE_UPLOAD_INIT,
  payload,
});

export const dispatchClearUploadTalentFile = (payload = {}) => ({
  type: TALENT_FILE_UPLOAD_CLEAR,
  payload,
});

export const dispatchSuccessUploadTalentFile = (payload = {}) => ({
  type: TALENT_FILE_UPLOAD_SUCCESS,
  payload,
});

export const dispatchFailureUploadTalentFile = (payload = {}) => ({
  type: TALENT_FILE_UPLOAD_FAILURE,
  payload,
});

export const dispatchDestroyTalentFile = (payload = {}) => ({
  type: TALENT_FILE_DESTROY,
  payload,
});

export const dispatchSuccessDestroyTalentFile = (payload = {}) => ({
  type: TALENT_FILE_DESTROY_SUCCESS,
  payload,
});

export const dispatchFailureDestroyTalentFile = (payload = {}) => ({
  type: TALENT_FILE_DESTROY_FAILURE,
  payload,
});

export const dispatchRemoveTalentFileStateId = (stateId) => ({
  type: TALENT_FILE_STATE_ID_REMOVE,
  payload: { stateId },
});
