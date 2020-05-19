import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import decks from "./reducers/decks";
import middleware from "./middlewares";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
//components
import Home from "./components/Home";
import AddDeck from "./components/AddDeck";
import Deck from "./components/Deck";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
//helpers
import { setLocalNotification } from "./helpers";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * @description Main Component
 */

export default function App() {
  const store = createStore(decks, middleware);

  useEffect(() => {
    setLocalNotification();
  }, []);

  function getHeaderTitle(route) {
    // Access the tab navigator's state using `route.state`
    const routeName = route.state
      ? // Get the currently active route name in the tab navigator
        route.state.routes[route.state.index].name
      : // If state doesn't exist, we need to default to `screen` param if available, or the initial screen
        // In our case, it's "Home" as that's the first screen inside the navigator
        route.params?.screen || "Home";

    switch (routeName) {
      case "Home":
        return "Home";
      case "AddDeck":
        return "Add new deck";
    }
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={"NestedNav"}
            component={NestedNav}
            options={({ route }) => ({
              headerTitle: getHeaderTitle(route),
            })}
          ></Stack.Screen>
          <Stack.Screen name={"Deck"} component={Deck}></Stack.Screen>
          <Stack.Screen
            name={"AddCard"}
            component={AddCard}
            options={{ title: "Add new card" }}
          ></Stack.Screen>
          <Stack.Screen
            name={"Quiz"}
            component={Quiz}
            options={{ title: "Quiz" }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const NestedNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "ios-home";
          } else if (route.name === "AddDeck") {
            iconName = "ios-add-circle";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Home" component={Home}></Tab.Screen>
      <Tab.Screen name="AddDeck" component={AddDeck}></Tab.Screen>
    </Tab.Navigator>
  );
};
