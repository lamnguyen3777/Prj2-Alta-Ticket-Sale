import { PayloadAction } from "@reduxjs/toolkit";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { updatePackage } from "../api/crudData";
import { TicketPackage } from "../models/Ticket";
import {
  requestUpdatePackage,
  requestUpdatePackageFail,
  requestUpdatePackageSuccess,
  updatePackageItem,
} from "../slice/Filter/crudSlice";
import { hiddenModal } from "../slice/ModalSlice";

function* updatePackageWatcher({ payload }: PayloadAction<TicketPackage>) {
  console.log(payload.id);
  try {
    yield delay(500);
    const isUpdateCompleted: boolean = yield call(updatePackage, payload);

    if (isUpdateCompleted) {
      yield put(requestUpdatePackageSuccess());
      yield put(updatePackageItem(payload));
      yield put(hiddenModal());
    } else {
      yield put(requestUpdatePackageFail());
    }
  } catch (error) {
    yield put(requestUpdatePackageFail());
  }
}

function* updatePackageSaga() {
  yield takeLatest(requestUpdatePackage, updatePackageWatcher);
}

export default updatePackageSaga;
