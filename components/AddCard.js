import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { setQuestion } from "../actions/decks";

/**
 * @description Add Card Component
 */

const AddCard = ({ dispatch, navigation, route }) => {
  const { deckId } = route.params;
  const [quest, setQuest] = useState("");
  const [answer, setAnswer] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    quest != "" && answer != "" && setIsButtonDisabled(false);
    !isButtonDisabled &&
      quest === "" &&
      answer === "" &&
      setIsButtonDisabled(true);
  }, [quest, answer]);

  const createCard = () => {
    const card = { quest, answer };
    dispatch(setQuestion(deckId, card));
    navigation.navigate("Deck", { id: deckId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Insert a question and an answer:</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setQuest(text)}
        placeholder="Question.."
        value={quest}
      ></TextInput>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setAnswer(text)}
        placeholder="Answer.."
        value={answer}
      ></TextInput>
      <TouchableOpacity
        onPress={createCard}
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

export default connect()(AddCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
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
    backgroundColor: "orange",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: 250,
    marginTop: 80,
  },
  disabledCreateButton: {
    alignItems: "center",
    backgroundColor: "grey",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: 250,
    marginTop: 80,
  },
});
