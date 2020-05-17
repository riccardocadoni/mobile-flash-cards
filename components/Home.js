import React, { useEffect } from "react";
import { Text } from "react-native";
import { setDeck, setQuestion, deleteDeck } from "../actions/decks";
import { connect } from "react-redux";

const Home = ({ dispatch }) => {
  //exaple decks
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
  const question = { hi: "hi" };

  useEffect(() => {
    //dispatch
  }, []);

  return <Text>Home component</Text>;
};

export default connect()(Home);
