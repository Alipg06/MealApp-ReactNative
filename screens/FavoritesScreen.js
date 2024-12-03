import React from "react";
import { useSelector } from "react-redux";

import MealList from "../components/MealList";
import { StyleSheet, Text, View } from "react-native";

const FavoritesScreen = (props) => {
  const { favouriteMeals } = useSelector((state) => state.meals);
  if (favouriteMeals.length === 0 || !favouriteMeals) {
    return (
      <View style={styles.content}>
        <Text style={styles.title}>
          No favourite meals found. Start adding some!
        </Text>
      </View>
    );
  }
  return <MealList listData={favouriteMeals} navigation={props.navigation} />;
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
export default FavoritesScreen;
