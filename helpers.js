import { AsyncStorage } from "react-native";

export const saveDeck = async (deck) => {
  try {
    await AsyncStorage.setItem(
      Object.keys(deck)[0],
      JSON.stringify(deck[Object.keys(deck)[0]])
    );
  } catch (error) {
    // Error saving data
    console.log(error);
  }
};

export const getDeck = async (deckId) => {
  try {
    const value = await AsyncStorage.getItem(deckId);
    if (value !== null) {
      return value;
    }
    return null;
  } catch (error) {
    // Error retrieving data
    console.log(error);
  }
};

export const getDecks = async () => {
  console.log("get decks helper called");
  try {
    const keys = await AsyncStorage.getAllKeys();
    if (keys !== null) {
      return keys.map((key) => getDeck(key).then((res) => res));
    }
    return null;
  } catch (error) {
    // Error retrieving data
    console.log(error);
  }
};
