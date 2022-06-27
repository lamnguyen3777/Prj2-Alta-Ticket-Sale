import { PayloadAction } from "@reduxjs/toolkit";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { TicketListData } from "../models/Ticket";
import {
  requestUpdateStatus,
  updateDate,
} from "../slice/LoadData/loadTicketList";
import { updateTicketStatus as update } from "../api/crudData";
import { hiddenModal } from "../slice/ModalSlice";

function* updateWatcher({ payload }: PayloadAction<TicketListData>) {
  yield delay(300);
  try {
    yield put(updateDate(payload));
    const isUpdate: boolean = yield call(update, payload);

    if (isUpdate) {
      yield put(updateDate({ ...payload, status: payload.status }));
      yield put(hiddenModal());
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateTicketStatusSaga() {
  yield takeLatest(requestUpdateStatus, updateWatcher);
}

export default updateTicketStatusSaga;
