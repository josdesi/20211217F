import {
  TALENT_FILE_GET_ALL,
  TALENT_FILE_UPLOAD,
  TALENT_FILE_DESTROY,
} from "../types";
import { all, takeEvery, fork, put, call } from "redux-saga/effects";
import {
  upload as apiUpload,
  getAll as apiGetAll,
  destroy as apiDestroy,
} from "../../services/api/talentFiles";
import {
  dispatchSuccessGetAllTalentFiles,
  dispatchFailureGetAllTalentFiles,
  dispatchSuccessUploadTalentFile,
  dispatchFailureUploadTalentFile,
  dispatchSuccessDestroyTalentFile,
  dispatchFailureDestroyTalentFile,
} from "../actions";
import { errorParse } from "../../utils/exception";

function* getAll({ payload }) {
  const { user, id } = payload;
  try {
    const data = yield call(apiGetAll, user, id);
    yield put(dispatchSuccessGetAllTalentFiles(data));
  } catch (error) {
    const { data } = errorParse(error);
    yield put(dispatchFailureGetAllTalentFiles(data));
  }
}

function* store({ payload }) {
  const { stateId, user, talentId, data } = payload;
  try {
    const response = yield call(apiUpload, user, talentId, data);
    yield put(dispatchSuccessUploadTalentFile({ stateId, ...response }));
  } catch (error) {
    const { data } = errorParse(error);
    yield put(dispatchFailureUploadTalentFile({ stateId, ...data }));
  }
}

function* destroy({ payload }) {
  const { user, talentId, id } = payload;
  try {
    yield call(apiDestroy, user, talentId, id);
    yield put(dispatchSuccessDestroyTalentFile({ id }));
  } catch (error) {
    const { data } = errorParse(error);
    yield put(dispatchFailureDestroyTalentFile({ id, ...data }));
  }
}

function* watchGetAll() {
  yield takeEvery(TALENT_FILE_GET_ALL, getAll);
}

function* watchUpload() {
  yield takeEvery(TALENT_FILE_UPLOAD, store);
}

function* watchDestroy() {
  yield takeEvery(TALENT_FILE_DESTROY, destroy);
}

export default function* rootSaga() {
  yield all([fork(watchGetAll), fork(watchUpload), fork(watchDestroy)]);
}
