import { SET_NEW_DECK, SET_NEW_QUESTION, DELETE_DECK } from "../actions/decks";

const decks = (store = {}, action) => {
  switch (action.type) {
    case SET_NEW_DECK:
      return {
        ...store,
        ...action.deck,
      };

    case SET_NEW_QUESTION:
      const newQuestArr = store[action.deckId].questions.concat(
        action.question
      );
      return {
        ...store,
        [action.deckId]: {
          ...store[action.deckId],
          questions: newQuestArr,
        },
      };
    case DELETE_DECK:
      const { [action.deckId]: deckId, ...newStore } = store;
      return {
        ...newStore,
      };

    default:
      break;
  }
};
export default decks;
