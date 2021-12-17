import { STATUS_GET_ALL } from "../types";
import { all, takeEvery, fork, put, call } from "redux-saga/effects";
import { getAll as apiGetAll } from "../../services/api/processStatuses";
import {
  dispatchSuccessGetProcessStatuses,
  dispatchFailureGetProcessStatuses,
} from "../actions";
import { errorParse } from "../../utils/exception";

function* getAll({ payload }) {
  try {
    const { user } = payload;
    const data = yield call(apiGetAll, user);
    yield put(dispatchSuccessGetProcessStatuses(data));
  } catch (error) {
    const { data } = errorParse(error);
    yield put(dispatchFailureGetProcessStatuses(data));
  }
}

function* watchGetAll() {
  yield takeEvery(STATUS_GET_ALL, getAll);
}

export default function* rootSaga() {
  yield all([fork(watchGetAll)]);
}
