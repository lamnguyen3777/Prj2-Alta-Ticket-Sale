import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateTime } from "../../components/Calendar";
import { Time } from "../../components/TimePicker";
import { TicketPackage } from "../../models/Ticket";


interface EditModal {
  edit: TicketPackage;
}

const initialState: EditModal = {
  edit: {
    id: "",
    name: "",
    appliedDate: { day: 0, month: 0, year: 0 },
    appliedTime: { hour: 0, minute: 0, second: 0 },
    expireDate: { day: 0, month: 0, year: 0 },
    expireTime: { hour: 0, minute: 0, second: 0 },
    simplePrice: 0,
    comboPrice: 0,
    quantityForCombo: 0,
    status: 0,
  },
};

export const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    editTicket: (state, action: PayloadAction<TicketPackage>) => {
      state.edit = { ...action.payload };
    },
    resetTicket: (state, action: PayloadAction) => {
      state.edit = initialState.edit;
    },
  },
});

export const { editTicket, resetTicket } = editSlice.actions;

export default editSlice.reducer;
