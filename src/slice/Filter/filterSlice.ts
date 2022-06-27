import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterInput } from "../../components/Filter";
import { CheckingFilter } from "../../pages/CheckTicket";
import { getNow } from "../../utils/dateTime";
interface FilterType {
  filter: FilterInput;
  search: string;
  checkingFilter: CheckingFilter;
}
const initialState: FilterType = {
  filter: {
    status: -1,
    checkInPorts: "0",
    dateFrom: {day: 0, month: 0, year: 0},
    dateTo: {day: 0, month: 0, year: 0},
  },
  search: "",
  checkingFilter: {
    status: -1,
    searchKey: "",
    dateFrom: getNow(),
    dateTo: {
      ...getNow(),
      day: getNow().day + 1,
    }
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filter: (state, action: PayloadAction<FilterInput>) => {
      state.filter = action.payload;
    },
    search: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    checkingFilter: (state, action:PayloadAction<CheckingFilter>) =>{
      state.checkingFilter = action.payload
    },
  },
});

export const { filter, search, checkingFilter } = filterSlice.actions;

export default filterSlice.reducer;
