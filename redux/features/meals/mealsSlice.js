import { createSlice } from "@reduxjs/toolkit";
import { MEALS } from "../../../data/dummy-data";

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favouriteMeals: [],
};

export const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    toggleFavourite: (state, action) => {
      const { mealId } = action.payload;
      const existingIndex = state.favouriteMeals.findIndex(
        (meal) => meal.id === mealId
      );

      if (existingIndex >= 0) {
        state.favouriteMeals = state.favouriteMeals.filter(
          (meal) => meal.id !== mealId
        );
      } else {
        const meal = state.meals.find((meal) => meal.id === mealId);
        if (meal) {
          state.favouriteMeals.push(meal);
        }
      }
    },
    setFilters: (state, action) => {
      const { filters } = action.payload;
      const filteredMeals = state.meals.filter((meal) => {
        if (filters.isGlutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (filters.isLactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (filters.isVegan && !meal.isVegan) {
          return false;
        }
        if (filters.isVegetarian && !meal.isVegetarian) {
          return false;
        }
        return true;
      });
      state.filteredMeals = filteredMeals;
    },
  },
});

// Export actions and reducer
export const { toggleFavourite, setFilters } = mealsSlice.actions;
export default mealsSlice.reducer;
