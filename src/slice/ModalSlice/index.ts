import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TicketListData } from "../../models/Ticket";

export enum ModalStatus {
  HIDDEN_MODAL = 0,
  ADD_MODAL = 1,
  UPDATE_MODAL = 2,
  FILTER_MODAL = 3,
  CHANGE_DATE_MODAL = 4,
}
export interface IModalState {
  modalState: number;
  datePicker: boolean;
  changeDateModal: TicketListData | undefined;
}
const initialState: IModalState = {
  modalState: ModalStatus.HIDDEN_MODAL,
  datePicker: false,
  changeDateModal: undefined,
};

const modelSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    displayAddModal: (state) => {
      state.modalState = ModalStatus.ADD_MODAL;
    },
    displayUpdateModal: (state) => {
      state.modalState = ModalStatus.UPDATE_MODAL;
    },
    displayFilterModal: (state) => {
      state.modalState = ModalStatus.FILTER_MODAL;
    },
    hiddenModal: (state) => {
      state.modalState = ModalStatus.HIDDEN_MODAL;
    },
    displayChangeDateModal: (state,action: PayloadAction<TicketListData>) => {
      state.modalState = ModalStatus.CHANGE_DATE_MODAL;
      state.changeDateModal = action.payload;
    },
  },
});

export const {
  displayAddModal,
  displayFilterModal,
  displayUpdateModal,
  hiddenModal,
  displayChangeDateModal
} = modelSlice.actions;

export default modelSlice.reducer;
