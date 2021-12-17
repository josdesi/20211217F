import {
  TALENT_GET,
  TALENT_GET_ALL,
  TALENT_STORE,
  TALENT_PATCH,
  TALENT_DESTROY,
} from "../types";
import { all, takeEvery, fork, put, call } from "redux-saga/effects";
import {
  get as apiGet,
  getAll as apiGetAll,
  store as apiStore,
  patch as apiPatch,
  destroy as apiDestroy,
} from "../../services/api/talents";
import {
  dispatchSuccessGetTalent,
  dispatchFailureGetTalent,
  dispatchSuccessGetTalents,
  dispatchFailureGetTalents,
  dispatchSuccessStoreTalent,
  dispatchFailureStoreTalent,
  dispatchSuccessPatchTalent,
  dispatchFailurePatchTalent,
  dispatchSuccessDestroyTalent,
  dispatchDestroyTalent,
} from "../actions";
import { errorParse } from "../../utils/exception";

function* get({ payload }) {
  try {
    const { user, id, params } = payload;
    const data = yield call(apiGet, user, id, params);

    yield put(dispatchSuccessGetTalent(data));
  } catch (error) {
    const { data } = errorParse(error);
    yield put(dispatchFailureGetTalent(data));
  }
}

function* getAll({ payload }) {
  try {
    const { user, params } = payload;
    const data = yield call(apiGetAll, user, params);
    yield put(dispatchSuccessGetTalents(data));
  } catch (error) {
    const { data } = errorParse(error);
    yield put(dispatchFailureGetTalents(data));
  }
}

function* store({ payload }) {
  try {
    const { user, data } = payload;
    const response = yield call(apiStore, user, data);
    yield put(dispatchSuccessStoreTalent(response));
  } catch (error) {
    const { data } = errorParse(error);
    yield put(dispatchFailureStoreTalent(data));
  }
}

function* patch({ payload }) {
  try {
    const { user, id, data } = payload;
    const response = yield call(apiPatch, user, id, data);
    yield put(dispatchSuccessPatchTalent(response));
  } catch (error) {
    const { data } = errorParse(error);
    yield put(dispatchFailurePatchTalent(data));
  }
}

function* destroy({ payload }) {
  try {
    const { user, id } = payload;
    yield call(apiDestroy, user, id);
    yield put(dispatchSuccessDestroyTalent({}));
  } catch (error) {
    const { data } = errorParse(error);
    yield put(dispatchDestroyTalent(data));
  }
}

function* watchGet() {
  yield takeEvery(TALENT_GET, get);
}

function* watchGetAll() {
  yield takeEvery(TALENT_GET_ALL, getAll);
}

function* watchStore() {
  yield takeEvery(TALENT_STORE, store);
}

function* watchPatch() {
  yield takeEvery(TALENT_PATCH, patch);
}

function* watchDestroy() {
  yield takeEvery(TALENT_DESTROY, destroy);
}

export default function* rootSaga() {
  yield all([
    fork(watchGet),
    fork(watchGetAll),
    fork(watchStore),
    fork(watchPatch),
    fork(watchDestroy),
  ]);
}
