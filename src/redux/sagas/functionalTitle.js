import { FUNCTIONAL_TITLE_GET_ALL } from "../types";
import { all, takeEvery, fork, put, call } from "redux-saga/effects";
import { getAll as apiGetAll } from "../../services/api/functionalTitles";
import {
  dispatchSuccessGetFunctionalTitles,
  dispatchFailureGetFunctionalTitles,
} from "../actions";
import { errorParse } from "../../utils/exception";

function* getAll({ payload }) {
  try {
    const { user } = payload;
    const data = yield call(apiGetAll, user);
    yield put(dispatchSuccessGetFunctionalTitles(data));
  } catch (error) {
    const { data } = errorParse(error);
    yield put(dispatchFailureGetFunctionalTitles(data));
  }
}

function* watchGetAll() {
  yield takeEvery(FUNCTIONAL_TITLE_GET_ALL, getAll);
}

export default function* rootSaga() {
  yield all([fork(watchGetAll)]);
}
