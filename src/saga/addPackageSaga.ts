import { PayloadAction } from "@reduxjs/toolkit";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { createPackage } from "../api/crudData";
import { TicketPackage } from "../models/Ticket";
import {
  createPackageItem,
  requestCreatePackage,
  requestCreatePackageFail,
  requestCreatePackageSuccess,
} from "../slice/Filter/crudSlice";
import { hiddenModal } from "../slice/ModalSlice";

function* addPackageWatcher({ payload }: PayloadAction<TicketPackage>) {
  try {
    yield delay(500);

    const isCreateCompleted: TicketPackage | boolean = yield call(
      createPackage,
      payload
    );

    if (isCreateCompleted) {
      yield put(requestCreatePackageSuccess());
      yield put(
        createPackageItem({
          ...payload,
          id: (isCreateCompleted as TicketPackage).id,
        })
      );
      yield put(hiddenModal());
    } else {
      yield put(requestCreatePackageFail());
    }
  } catch (error) {
    yield put(requestCreatePackageFail());
  }
}

function* addPackageSaga() {
  yield takeLatest(requestCreatePackage, addPackageWatcher);
}

export default addPackageSaga;
