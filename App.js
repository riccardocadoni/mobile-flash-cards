import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import decks from "./reducers/decks";
import middleware from "./middlewares";
//components
import Home from "./components/Home";

export default function App() {
  const store = createStore(decks, middleware);
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text>Hello world!</Text>
        <Home></Home>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
