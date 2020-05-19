import React from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { connect } from "react-redux";
//components
import DeckPreview from "./DeckPreview";

/**
 * @description Home Component, displays a list of all the decks the user created
 */

const Home = ({ store, navigation }) => {
  return (
    <View style={styles.container}>
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
        ListEmptyComponent={EmptyDecks}
      />
    </View>
  );
};

const mapStateToProps = (store = {}) => {
  return { store };
};

export default connect(mapStateToProps)(Home);

const EmptyDecks = () => {
  return (
    <View style={styles.container}>
      <Text>Start adding some Decks!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
});
