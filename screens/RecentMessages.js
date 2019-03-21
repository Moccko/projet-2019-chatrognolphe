// TODO : FlatList won't update with the right content
import React from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  StatusBar
} from "react-native";
import ConversationItem from "../components/ConversationItem";
import { DB } from "../data/Database";
import { SafeAreaView } from "react-navigation";
import { connect } from "react-redux";

class RecentMessages extends React.Component {
  state = {
    conversations: []
  };

  componentDidMount() {
    // Listen to updates on conversations
    this.channelsListener = DB.collection("channels").onSnapshot(snapshot => {
      const conversations = [];
      snapshot.forEach(conversation => {
        const c = conversation.data();
        c.id = conversation.id;
        conversations.push(c);
      });
      this.setState({ conversations: conversations });
    });
  }

  componentWillUnmount() {
    // Detach the listener
    this.channelsListener();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <FlatList
          data={this.state.conversations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ConversationItem conversation={item} />}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                // width: "86%",
                // backgroundColor: "#CED0CE"
                backgroundColor: "#555"
                // marginLeft: "14%"
              }}
            />
          )}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps)(RecentMessages);

const primaryColor = "#ff09a3";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    justifyContent: "center",
    backgroundColor: "black"
  }
});
