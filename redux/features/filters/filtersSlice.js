import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    isGlutenFree: false,
    isLactoseFree: false,
    isVegan: false,
    isVegeterian: false,
  },
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    saveFilters: (state, action) => {
      state.filters = {
        ...state.filters,
      };
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = filtersSlice.actions;

export default filtersSlice.reducer;
