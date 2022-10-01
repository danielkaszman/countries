import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SelectValue: "all",
};

const SelectSlice = createSlice({
  name: "select",
  initialState,
  reducers: {
    setSelectValue: (state, action) => {
      state.SelectValue = action.payload;
    },
  },
});

export const { setSelectValue } = SelectSlice.actions;

export const selectSelectValue = (state) => state.select.SelectValue;

export default SelectSlice.reducer;
