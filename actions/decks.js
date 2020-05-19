export const SET_DECKS = "SET_DECKS";
export const SET_NEW_DECK = "SET_NEW_DECK";
export const SET_NEW_QUESTION = "SET_NEW_QUESTION";
export const DELETE_DECK = "DELETE_DECK";

export const setDecks = (decks) => ({
  type: SET_DECKS,
  decks,
});

export const setDeck = (deck) => ({
  type: SET_NEW_DECK,
  deck,
});

export const setQuestion = (deckId, question) => ({
  type: SET_NEW_QUESTION,
  deckId,
  question,
});

export const deleteDeck = (deckId) => ({
  type: DELETE_DECK,
  deckId,
});
