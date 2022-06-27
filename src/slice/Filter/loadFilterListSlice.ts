import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TicketListData } from "../../models/Ticket";

const initialState: TicketListData[] = []

const loadFilterListSlice = createSlice({
    name: 'ticketList',
    initialState,
    reducers: {
        loadFilterList: (state,action: PayloadAction<TicketListData[]>) =>{
            state = action.payload;
        }
    }
})

export const {loadFilterList} = loadFilterListSlice.actions;

export default loadFilterListSlice.reducer