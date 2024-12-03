import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import FiltersSwitch from "../components/FiltersSwitch";
import { useDispatch } from "react-redux";
import { setFilters } from "../redux/features/meals/mealsSlice";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";

const FiltersScreen = (props) => {
  const dispatch = useDispatch();
  const [screenFilters, setScreenFilters] = useState({
    isGlutenFree: false,
    isLactoseFree: false,
    isVegan: false,
    isVegeterian: false,
  });

  const saveFilters = useCallback(() => {
    dispatch(setFilters({ filters: screenFilters }));
  }, [screenFilters]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            iconName="ios-save"
            onPress={() => {
              saveFilters();
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [props.navigation, saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}> Available Filters / Restrictions</Text>
      <View style={styles.filtersContainer}>
        <FiltersSwitch
          label="Gluten Free"
          state={screenFilters.isGlutenFree}
          onchange={() =>
            setScreenFilters({
              ...screenFilters,
              isGlutenFree: !screenFilters.isGlutenFree,
            })
          }
        />
        <FiltersSwitch
          label="Lactose Free"
          state={screenFilters.isLactoseFree}
          onchange={() =>
            setScreenFilters({
              ...screenFilters,
              isLactoseFree: !screenFilters.isLactoseFree,
            })
          }
        />
        <FiltersSwitch
          label="Vegan"
          state={screenFilters.isVegan}
          onchange={() =>
            setScreenFilters({
              ...screenFilters,
              isVegan: !screenFilters.isVegan,
            })
          }
        />
        <FiltersSwitch
          label="Vegetarian"
          state={screenFilters.isVegeterian}
          onchange={() =>
            setScreenFilters({
              ...screenFilters,
              isVegeterian: !screenFilters.isVegeterian,
            })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 22,
    margin: 20,
    fontFamily: "open-sans-bold",
    textAlign: "center",
  },
  filtersContainer: {
    display: "flex",
    gap: 10,
    padding: 20,
  },
});

export default FiltersScreen;
