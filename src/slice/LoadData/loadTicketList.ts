import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TicketListData } from "../../models/Ticket";

interface ITicketSlice {
  list: TicketListData[];
}
const initialState: ITicketSlice = {
  list: [],
};

const ticketsSlice = createSlice({
  name: "loadList",
  initialState,
  reducers: {
    loadTicketList: (state, action: PayloadAction<TicketListData[]>) => {
      state.list = action.payload;
    },
    requestUpdateStatus: (state,action:PayloadAction<TicketListData>) =>{

    },
    updateDate: (state, action: PayloadAction<TicketListData>) => {
      const index = state.list.findIndex(
        (item) => item.bookingCode === action.payload.bookingCode
      );
      if (index !== -1) {
        state.list[index].status = 0;
        state.list[index].usingDate = action.payload.usingDate;
      }
    },
  },
});

export const { loadTicketList, updateDate,requestUpdateStatus } = ticketsSlice.actions;

export default ticketsSlice.reducer;
