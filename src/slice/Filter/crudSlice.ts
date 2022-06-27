import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TicketListData, TicketPackage } from "../../models/Ticket";
export interface CRUD {
  createPackage?: TicketPackage;
  updatePackage?: TicketPackage;
  isLoading: boolean;
  packageListOrigin: TicketPackage[];
  packageList: TicketPackage[];
}

const initialState: CRUD = {
  isLoading: false,
  packageListOrigin: [],
  packageList: [],
};

const crudSlice = createSlice({
  name: "crud",
  initialState,
  reducers: {
    requestCreatePackage: (state, action: PayloadAction<TicketPackage>) => {
      state.isLoading = true;
    },
    requestCreatePackageSuccess: (state) => {
      state.isLoading = false;
    },
    requestCreatePackageFail: (state) => {
      state.isLoading = false;
    },
    requestUpdatePackage: (state, action: PayloadAction<TicketPackage>) => {
      state.isLoading = true;
    },
    requestUpdatePackageSuccess: (state) => {
      state.isLoading = false;
    },
    requestUpdatePackageFail: (state) => {
      state.isLoading = false;
    },
    updatePackageListOrigin: (
      state,
      action: PayloadAction<TicketPackage[]>
    ) => {
      state.packageListOrigin = action.payload;
    },
    updatePackageList: (state, action: PayloadAction<TicketPackage[]>) => {
      state.packageList = action.payload;
    },
    updatePackageItem: (state, action: PayloadAction<TicketPackage>) => {
      const { id } = action.payload;

      const index = state.packageList.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.packageList.splice(index, 1, action.payload);
      }
    },

    createPackageItem: (state, action: PayloadAction<TicketPackage>) => {
      state.packageList.push(action.payload);
    },
  },
});

export const {
  requestCreatePackage,
  requestCreatePackageFail,
  requestCreatePackageSuccess,
  requestUpdatePackage,
  requestUpdatePackageFail,
  requestUpdatePackageSuccess,
  updatePackageList,
  updatePackageListOrigin,
  updatePackageItem,
  createPackageItem,
} = crudSlice.actions;

export default crudSlice.reducer;
