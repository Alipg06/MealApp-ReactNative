import "react-native-gesture-handler";
import * as React from "react";
import * as Font from "expo-font";
import { store } from "./redux/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import HeaderButton from "./components/HeaderButton";
import { DrawerActions } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import FiltersScreen from "./screens/FiltersScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import CategoryMealScreen from "./screens/CategoryMealsScreen";
import { toggleFavourite } from "./redux/features/meals/mealsSlice";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#351401" },
        headerTintColor: "white",
        sceneContainerStyle: { backgroundColor: "#e4baa1" },
        drawerContentStyle: { backgroundColor: "#351401" },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: "#351401",
        drawerActiveBackgroundColor: "#e4baa1",
      }}>
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Filters"
        component={FiltersScreen}
        options={() => ({
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        })}
      />
    </Drawer.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator shifting={true}>
      <Tab.Screen
        name="Drawer"
        component={CategoriesStackNavigator}
        options={{
          tabBarIcon: (tabInfo) => (
            <Ionicons name="ios-restaurant" size={25} color={tabInfo.color} />
          ),
        }}
      />
      <Tab.Screen
        name="FavoritesHome"
        component={FavoritesStackNavigator}
        options={() => ({
          title: "Favorites",
          tabBarIcon: (tabInfo) => (
            <Ionicons name="ios-star" size={25} color={tabInfo.color} />
          ),
        })}
      />
    </Tab.Navigator>
  );
}

function CategoriesStackNavigator() {
  const dispatch = useDispatch();
  const { meals, favouriteMeals } = useSelector((state) => state.meals);

  return (
    <Stack.Navigator
      initialRouteName="Categories "
      screenOptions={{
        headerStyle: {
          backgroundColor: "#351401",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
          color: "white",
        },
        contentStyle: { backgroundColor: "#e4baa1" },
      }}>
      <Stack.Screen
        name="Categories "
        component={CategoriesScreen}
        options={(props) => ({
          headerLeft: () => (
            <HeaderButtons {...props} HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => {
                  props.navigation.dispatch(DrawerActions.toggleDrawer());
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name="CategoryMeals"
        component={CategoryMealScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={(props) => {
          const mealId = props.route.params.mealId;
          const selectedMeal = meals.find((meal) => meal.id === mealId);
          const isSelectedMealFavourite = favouriteMeals.some(
            (meal) => meal.id === mealId
          );
          return {
            headerTitle: props.route.params.title,
            headerRight: () => (
              <HeaderButtons {...props} HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Favorite"
                  iconName={
                    isSelectedMealFavourite ? "ios-star" : "ios-star-outline"
                  }
                  onPress={() => {
                    dispatch(toggleFavourite({ mealId: mealId }));
                  }}
                />
              </HeaderButtons>
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
}

function FavoritesStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Favorites"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#351401",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
          color: "white",
        },
        contentStyle: { backgroundColor: "#e4baa1" },
      }}>
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={(props) => ({
          headerTitle: "Your Favorites",
          headerLeft: () => (
            <HeaderButtons {...props} HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName="ios-menu"
                onPress={() => {
                  props.navigation.dispatch(DrawerActions.toggleDrawer());
                }}
              />
            </HeaderButtons>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function App() {
  const [appIsReady, setAppIsReady] = React.useState(false);

  React.useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
          "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);
  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <MyDrawer />
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
