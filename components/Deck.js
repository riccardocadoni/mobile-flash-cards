import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
//action
import { deleteDeck } from "../actions/decks";

/**
 * @description Deck Component, shows the details of the deck, allows the user to start a quiz or add a card
 */

const Deck = ({ dispatch, route, store, navigation }) => {
  const { id } = route.params;
  const deck = store[id];

  if (deck)
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>{deck.title}</Text>
        <Text style={styles.detailText}>
          {deck.questions.length + " cards"}
        </Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            navigation.navigate("AddCard", { deckId: id });
          }}
        >
          <Text>ADD CARD</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quizButton}
          onPress={() => {
            navigation.navigate("Quiz", { deckId: id });
          }}
          disabled={deck.questions.length === 0}
        >
          <Text>QUIZ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            dispatch(deleteDeck(id));
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.deleteText}>DELETE DECK</Text>
        </TouchableOpacity>
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
    padding: 20,
  },
  titleText: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
  detailText: {
    fontSize: 20,
    marginBottom: 200,
  },
  addButton: {
    alignItems: "center",
    backgroundColor: "#ADD8E6",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: 250,
  },
  quizButton: {
    alignItems: "center",
    backgroundColor: "#ff7f50",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: 250,
  },
  deleteButton: {
    alignItems: "center",
    margin: 10,
    padding: 10,
    width: 250,
  },
  deleteText: {
    color: "red",
  },
});
