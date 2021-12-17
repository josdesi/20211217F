import { CURRENCY_GET_ALL } from "../types";
import { all, takeEvery, fork, put, call } from "redux-saga/effects";
import { getAll as apiGetAll } from "../../services/api/currencies";
import {
  dispatchSuccessGetCurrencies,
  dispatchFailureGetCurrencies,
} from "../actions";
import { errorParse } from "../../utils/exception";

function* getAll({ payload }) {
  try {
    const { user } = payload;
    const data = yield call(apiGetAll, user);
    yield put(dispatchSuccessGetCurrencies(data));
  } catch (error) {
    const { data } = errorParse(error);
    yield put(dispatchFailureGetCurrencies(data));
  }
}

function* watchGetAll() {
  yield takeEvery(CURRENCY_GET_ALL, getAll);
}

export default function* rootSaga() {
  yield all([fork(watchGetAll)]);
}
