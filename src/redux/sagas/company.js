import {
  COMPANY_GET,
  COMPANY_GET_ALL,
  COMPANY_STORE,
  COMPANY_PATCH,
} from "../types";
import { all, takeEvery, fork, put, call } from "redux-saga/effects";
import {
  getAll as apiGetAll,
  get as apiGet,
  store as apiStore,
  patch as apiPatch,
} from "../../services/api/company";
import {
  dispatchSuccessGetCompany,
  dispatchFailureGetCompany,
  dispatchSuccessGetCompanies,
  dispatchSuccessStoreCompany,
  dispatchFailureStoreCompany,
  dispatchSuccessPatchCompany,
  dispatchFailurePatchCompany,
  dispatchFailureGetCompanies,
} from "../actions";
import { errorParse } from "../../utils/exception";

function* get({ payload }) {
  try {
    const { user, id, params } = payload;
    const data = yield call(apiGet, user, id, params);

    yield put(dispatchSuccessGetCompany(data));
  } catch (error) {
    const { data } = errorParse(error);
    yield put(dispatchFailureGetCompany(data));
  }
}

function* getAll({ payload }) {
  try {
    const { user, params } = payload;
    const data = yield call(apiGetAll, user, params);
    yield put(dispatchSuccessGetCompanies(data));
  } catch (error) {
    const { data } = errorParse(error);
    yield put(dispatchFailureGetCompanies(data));
  }
}

function* store({ payload }) {
  try {
    const { user, data } = payload;
    const response = yield call(apiStore, user, data);
    yield put(dispatchSuccessStoreCompany(response));
  } catch (error) {
    const { data } = errorParse(error);
    yield put(dispatchFailureStoreCompany(data));
  }
}

function* patch({ payload }) {
  try {
    const { user, id, data } = payload;
    const response = yield call(apiPatch, user, id, data);
    yield put(dispatchSuccessPatchCompany(response));
  } catch (error) {
    const { data } = errorParse(error);
    yield put(dispatchFailurePatchCompany(data));
  }
}

function* watchGet() {
  yield takeEvery(COMPANY_GET, get);
}

function* watchGetAll() {
  yield takeEvery(COMPANY_GET_ALL, getAll);
}

function* watchStore() {
  yield takeEvery(COMPANY_STORE, store);
}

function* watchPatch() {
  yield takeEvery(COMPANY_PATCH, patch);
}

export default function* rootSaga() {
  yield all([
    fork(watchGet),
    fork(watchGetAll),
    fork(watchStore),
    fork(watchPatch),
  ]);
}
