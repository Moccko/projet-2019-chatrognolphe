// TODO : FlatList won't update with the right content
import React from "react";
import { View, Text, FlatList, Dimensions, StyleSheet } from "react-native";
import ConversationItem from "../components/ConversationItem";
import { DB } from "../data/Database";

export default class RecentMessages extends React.Component {
  state = {
    conversations: []
  };

  componentDidMount() {
    DB.collection("channels").onSnapshot(snapshot => {
      const conversations = [];
      snapshot.forEach(conversation => conversations.push(conversation.data()));
      this.setState({ conversations: conversations });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.conversations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ConversationItem conversation={item} />}
        />
      </View>
    );
  }
}

const primaryColor = "#ff09a3";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    justifyContent: "center"
  }
});
