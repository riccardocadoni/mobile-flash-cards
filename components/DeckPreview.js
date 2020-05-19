import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

/**
 * @description DeckPreview Component, shows the details of a deck, used in the home component
 * @param {String} title title of the deck
 * @param {Number} cardsNumber number of cards in the deck
 */

const DeckPreview = ({ title, cardsNumber, navigation }) => {
  if (navigation) {
    return (
      <TouchableHighlight
        onPress={() => navigation.navigate("Deck", { id: title })}
      >
        <View style={styles.container}>
          <Text style={styles.titleText}>{title}</Text>
          <Text>{cardsNumber + " cards"}</Text>
        </View>
      </TouchableHighlight>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <Text>{cardsNumber + " cards"}</Text>
    </View>
  );
};

export default DeckPreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ff7f50",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
