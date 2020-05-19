import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { setDeck } from "../actions/decks";

/**
 * @description Add Deck Component
 */

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
    setTitle("");
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Insert a title for the new deck!</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setTitle(text)}
        placeholder="Title.."
        value={title}
      ></TextInput>
      <TouchableOpacity
        onPress={createDeck}
        disabled={isButtonDisabled}
        style={
          isButtonDisabled
            ? { ...styles.createButton, ...styles.disabledCreateButton }
            : styles.createButton
        }
      >
        <Text>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

export default connect()(AddDeck);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 30,
  },
  titleText: {
    fontSize: 30,
    marginBottom: 20,
  },
  textInput: {
    flexDirection: "row",
    height: 60,
    width: 250,
    borderColor: "gray",
    borderRadius: 10,
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  createButton: {
    alignItems: "center",
    backgroundColor: "#ADD8E6",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: 250,
    marginTop: 50,
  },
  disabledCreateButton: {
    alignItems: "center",
    backgroundColor: "grey",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: 250,
    marginTop: 50,
  },
});
