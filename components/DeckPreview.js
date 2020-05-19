import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";

const DeckPreview = ({ title, cardsNumber, navigation }) => {
  return (
    <TouchableHighlight
      onPress={() => navigation.navigate("Deck", { id: title })}
    >
      <View style={styles.container}>
        <Text>{title}</Text>
        <Text>{cardsNumber + "cards"}</Text>
      </View>
    </TouchableHighlight>
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
  },
});
