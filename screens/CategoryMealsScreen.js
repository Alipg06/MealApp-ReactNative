import React from "react";
import MealList from "../components/MealList";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View } from "react-native";

const CategoryMealScreen = (props) => {
  const { filteredMeals } = useSelector((state) => state.meals);
  const { categoryId } = props.route.params;
  const displayedMeals = filteredMeals.filter(
    (meal) => meal.categoryIds.indexOf(categoryId) >= 0
  );

  if (displayedMeals.length === 0 || !displayedMeals) {
    return (
      <View style={styles.content}>
        <Text style={styles.title}>
          No meals found, maybe check your filters!
        </Text>
      </View>
    );
  }

  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
  },
});

export default CategoryMealScreen;
