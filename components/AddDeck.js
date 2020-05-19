import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { connect } from "react-redux";
import { setDeck } from "../actions/decks";
//helpers
import { saveDeck } from "../helpers";

const AddDeck = ({ dispatch, navigation }) => {
  const [title, setTitle] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    title != "" && setIsButtonDisabled(false);
    !isButtonDisabled && title === "" && setIsButtonDisabled(true);
  }, [title]);

  const formatDeck = (title) => ({
    [title]: {
      title: title,
      questions: [],
    },
  });

  const createDeck = () => {
    const deck = formatDeck(title);
    dispatch(setDeck(deck));
    saveDeck(deck);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text>Title of new deck</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setTitle(text)}
        value={title}
      ></TextInput>
      <Button
        onPress={createDeck}
        disabled={isButtonDisabled}
        title="Create"
        color="#841584"
      ></Button>
    </View>
  );
};

export default connect()(AddDeck);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    flexDirection: "row",
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
  },
});
