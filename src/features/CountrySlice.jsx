import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countries: null,
};

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
  },
});

export const { setCountries } = countrySlice.actions;

export const selectCountries = (state) => state.country.countries;

export default countrySlice.reducer;
