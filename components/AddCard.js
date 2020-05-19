import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { connect } from "react-redux";
import { setQuestion } from "../actions/decks";

const AddDeck = ({ dispatch, navigation, route }) => {
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
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text>Insert Quest and Answer</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setQuest(text)}
        value={quest}
      ></TextInput>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setAnswer(text)}
        value={answer}
      ></TextInput>
      <Button
        onPress={createCard}
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
