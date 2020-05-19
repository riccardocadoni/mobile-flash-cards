import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";
//action
import { deleteDeck } from "../actions/decks";

const Deck = ({ dispatch, route, store, navigation }) => {
  const { id } = route.params;
  const deck = store[id];

  if (deck)
    return (
      <View style={styles.container}>
        <Text>DECK COMPONENT</Text>
        <Text>{deck.title}</Text>
        <Button
          title="ADD CARD"
          onPress={() => {
            navigation.navigate("AddCard", { deckId: id });
          }}
        ></Button>
        <Button
          title="DELETE DECK"
          onPress={() => {
            dispatch(deleteDeck(id));
            navigation.navigate("Home");
          }}
        ></Button>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text>This Deck does not exists</Text>
    </View>
  );
};

const mapStateToProps = (store = {}) => {
  return { store };
};

export default connect(mapStateToProps)(Deck);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
