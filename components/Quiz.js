import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
//helpers
import { clearLocalNotifications, setLocalNotification } from "../helpers";

/**
 * @description Quiz Component
 */

const Quiz = ({ route, store, navigation }) => {
  const { deckId } = route.params;
  const deck = store[deckId];
  const [quizState, setQuizState] = useState(0);
  const [numCorrectAnsw, setNumCorrectAnsw] = useState(0);
  const [quizOver, setQuizOver] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (quizState === deck.questions.length) setQuizOver(true);
    clearLocalNotifications().then(setLocalNotification);
  }, [quizState]);

  if (deck.questions.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.endQuizContainer}>
          <Text style={styles.titleText}>There are no cards in this deck!</Text>
          <Text>Add some question before starting a Quiz</Text>
          <TouchableOpacity
            style={[styles.restartQuizButton, { marginTop: 50 }]}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (quizOver)
    return (
      <View style={styles.container}>
        <View style={styles.endQuizContainer}>
          <Text style={styles.titleText}>The quiz is ended!</Text>
          <Text style={styles.titleText}>
            You answered correctly {numCorrectAnsw} questions out of{" "}
            {deck.questions.length}
          </Text>
          <TouchableOpacity
            style={styles.restartQuizButton}
            onPress={() => {
              setQuizState(0);
              setNumCorrectAnsw(0);
              setShowAnswer(false);
              setQuizOver(false);
            }}
          >
            <Text>RESTART QUIZ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.goBackButton}
            onPress={() => {
              navigation.navigate("Deck", { deckId: deckId });
            }}
          >
            <Text>GO BACK</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  if (deck.questions[quizState]) {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Card {quizState + 1 + " / " + deck.questions.length}
        </Text>
        {showAnswer ? (
          <Text style={styles.questionText}>
            {deck.questions[quizState].answer}
          </Text>
        ) : (
          <Text style={styles.questionText}>
            {deck.questions[quizState].quest}
          </Text>
        )}
        <TouchableOpacity
          style={styles.showButton}
          onPress={() => {
            setShowAnswer((prev) => !prev);
          }}
        >
          <Text style={styles.deleteText}>
            {showAnswer ? "Show Question" : "Show Answer"}
          </Text>
        </TouchableOpacity>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.correctButton}
            onPress={() => {
              setNumCorrectAnsw((oldValue) => oldValue + 1);
              setQuizState((oldValue) => oldValue + 1);
              setShowAnswer(false);
            }}
          >
            <Text>CORRECT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.incorrectButton}
            onPress={() => {
              setQuizState((oldValue) => oldValue + 1);
              setShowAnswer(false);
            }}
          >
            <Text>INCORRECT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>This deck does not exists</Text>
    </View>
  );
};

const mapStateToProps = (store) => {
  return { store };
};

export default connect(mapStateToProps)(Quiz);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
  },
  endQuizContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 20,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 20,
    marginBottom: 200,
  },
  correctButton: {
    alignItems: "center",
    backgroundColor: "green",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: 250,
  },
  incorrectButton: {
    alignItems: "center",
    backgroundColor: "red",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: 250,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36,
  },
  showButton: {
    alignItems: "center",
    margin: 10,
    padding: 10,
    width: 250,
  },
  questionText: {
    fontSize: 30,
    margin: 30,
    marginBottom: 10,
  },
  deleteText: {
    color: "red",
  },
  goBackButton: {
    alignItems: "center",
    backgroundColor: "#ADD8E6",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: 250,
  },
  restartQuizButton: {
    alignItems: "center",
    backgroundColor: "#ff7f50",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: 250,
  },
});
