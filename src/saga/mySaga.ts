import { all } from "redux-saga/effects";
import updatePackageSaga from "./updatePackageSaga";
import addPackageSaga from "./addPackageSaga";
import updateTicketStatusSaga from "./updateTicketStatusSaga";

function* rootSaga() {
  yield all([addPackageSaga(), updatePackageSaga(), updateTicketStatusSaga()]);
}

export default rootSaga;
