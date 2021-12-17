import { SENIORITY_GET_ALL } from "../types";
import { all, takeEvery, fork, put, call } from "redux-saga/effects";
import { getAll as apiGetAll } from "../../services/api/seniorities";
import {
  dispatchSuccessGetSeniorities,
  dispatchFailureGetSeniorities,
} from "../actions";
import { errorParse } from "../../utils/exception";

function* getAll({ payload }) {
  try {
    const { user } = payload;
    const data = yield call(apiGetAll, user);
    yield put(dispatchSuccessGetSeniorities(data));
  } catch (error) {
    const { data } = errorParse(error);
    yield put(dispatchFailureGetSeniorities(data));
  }
}

function* watchGetAll() {
  yield takeEvery(SENIORITY_GET_ALL, getAll);
}

export default function* rootSaga() {
  yield all([fork(watchGetAll)]);
}
