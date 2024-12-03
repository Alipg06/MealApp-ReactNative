import { configureStore } from "@reduxjs/toolkit";
import mealsReducer from "./features/meals/mealsSlice";
import filterReducer from "./features/filters/filtersSlice";

export const store = configureStore({
  reducer: {
    meals: mealsReducer,
    filters: filterReducer,
  },
});
