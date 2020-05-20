import {
  SET_NEW_DECK,
  SET_NEW_QUESTION,
  DELETE_DECK,
  SET_DECKS,
  INITIAL_DATA,
} from "../actions/decks";

const decks = (store = {}, action) => {
  switch (action.type) {
    case SET_DECKS:
      return {
        ...store,
        ...action.decks,
      };

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
    case INITIAL_DATA:
      return {
        ...store,
        ...action.data,
      };

    default:
      break;
  }
};
export default decks;
