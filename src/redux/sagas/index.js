import { all } from "redux-saga/effects";
import auth from "./auth";
import location from "./location";
import industry from "./industry";
import talent from "./talent";
import talentFile from "./talentFile";
import status from "./status";
import functionalTitle from "./functionalTitle";
import seniority from "./seniority";
import company from "./company";
import companyType from "./company.type";
import processStatus from "./processStatus";
import relocation from "./relocation";
import currency from "./currency";

export default function* rootSaga() {
  yield all([
    auth(),
    location(),
    industry(),
    talent(),
    talentFile(),
    status(),
    functionalTitle(),
    seniority(),
    company(),
    companyType(),
    processStatus(),
    relocation(),
    currency(),
  ]);
}
