import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import decks from "./reducers/decks";
import middleware from "./middlewares";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AsyncStorage } from "react-native";
//components
import Home from "./components/Home";
import AddDeck from "./components/AddDeck";
import Deck from "./components/Deck";
import AddCard from "./components/AddCard";
//actions
import { setDecks } from "./actions/decks";
import { set } from "react-native-reanimated";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const store = createStore(decks, middleware);
  const STORAGE_KEY = "yourKey";

  useEffect(() => {
    store.subscribe(() =>
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState()))
    );
  }, []);

  useEffect(() => {
    // checking the async storage for previous stored data
    AsyncStorage.getItem(STORAGE_KEY)
      .then(JSON.parse)
      .then((data) => {
        store.dispatch(setDecks(data));
      });
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={"NestedNav"} component={NestedNav}></Stack.Screen>
          <Stack.Screen name={"Profile"} component={Profile}></Stack.Screen>
          <Stack.Screen name={"Deck"} component={Deck}></Stack.Screen>
          <Stack.Screen name={"AddCard"} component={AddCard}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const NestedNav = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home}></Tab.Screen>
      <Tab.Screen name="Add Deck" component={AddDeck}></Tab.Screen>
    </Tab.Navigator>
  );
};

const Profile = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
