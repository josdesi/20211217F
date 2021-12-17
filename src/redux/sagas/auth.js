import { AUTH_SIGN_IN, AUTH_SIGN_OUT } from "../types";
import { all, takeEvery, call, put } from "redux-saga/effects";
import { signIn as apiSignIn } from "../../services/api/auth";
import {
  errorParse,
  parseUserResponse,
  getUserInitialState,
} from "../../utils";
import {
  dispatchSignInSuccess,
  dispatchSignInFailure,
  dispatchSetUserData,
  dispatchClearUser,
  dispatchSignOutSuccess,
} from "../actions";

function* signIn({ payload }) {
  try {
    const data = yield call(apiSignIn, payload);
    const userParsed = parseUserResponse(data);
    localStorage.setItem("userData", JSON.stringify(userParsed));

    yield put(dispatchSetUserData(getUserInitialState(userParsed)));
    yield put(dispatchSignInSuccess(userParsed));
  } catch (error) {
    const { data } = errorParse(error);
    yield put(dispatchSignInFailure(data));
  }
}

function* signOut() {
  localStorage.clear();
  yield put(dispatchClearUser());
  yield put(dispatchSignOutSuccess());
}

function* watchSignIn() {
  yield takeEvery(AUTH_SIGN_IN, signIn);
}

function* watchSignOut() {
  yield takeEvery(AUTH_SIGN_OUT, signOut);
}

export default function* rootSaga() {
  yield all([call(watchSignIn), call(watchSignOut)]);
}
