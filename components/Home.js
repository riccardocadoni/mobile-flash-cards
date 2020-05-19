import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import { setDeck, setQuestion, deleteDeck } from "../actions/decks";
import { connect } from "react-redux";
//components
import DeckPreview from "./DeckPreview";

const Home = ({ dispatch, store, navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home component</Text>
      <FlatList
        data={Object.keys(store)}
        renderItem={({ item }) => (
          <DeckPreview
            title={item}
            cardsNumber={store[item].questions.length}
            navigation={navigation}
          ></DeckPreview>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const mapStateToProps = (store = {}) => {
  return { store };
};

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

/* //exaple decks
 const deck1 = {
    deck1: {
      id: "deck1",
      title: "title1",
      questions: [
        {
          question: "question",
          answer: "answer",
        },
      ],
    },
  };
  const deck2 = {
    deck2: {
      id: "deck2",
      title: "title2",
      questions: [
        {
          question: "question2",
          answer: "answer2",
        },
      ],
    },
  };
  const question = { hi: "hi" }; */
