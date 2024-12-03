import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const ListItem = ({ children }) => {
  return (
    <View style={styles.listItem}>
      <Text>{children}</Text>
    </View>
  );
};

const MealDetailScreen = (props) => {
  const { meals } = useSelector((state) => state.meals);
  const { mealId } = props.route.params;
  const selectedMeal = meals.find((meal) => meal.id === mealId);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text>{selectedMeal.duration}m</Text>
        <Text>{selectedMeal.complexity.toUpperCase()}</Text>
        <Text>{selectedMeal.affordability.toUpperCase()}</Text>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map((ingredient) => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step) => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#351401",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  },
});

export default MealDetailScreen;
