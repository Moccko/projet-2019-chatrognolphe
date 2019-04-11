import React from "react";
import {
  Text,
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  SafeAreaView
} from "react-native";
import ConversationItem from "../components/ConversationItem";
import { connect } from "react-redux";

class RecentMessages extends React.Component {
  render() {
    const { channels } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        {channels.length ? (
          <FlatList
            data={this.props.channels}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <ConversationItem conversation={item} users={item.users} />
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        ) : (
          <Text style={styles.fallbackText}>
            Vous n'avez pas encore de discussion. Créez-en une avec un être
            humain !
          </Text>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  channels: state.channels
});
export default connect(mapStateToProps)(RecentMessages);

const primaryColor = "lime";
const white = "white";
const black = "black";
const gray = "#333";
const lightGray = "#555";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    justifyContent: "center",
    backgroundColor: black
  },
  separator: {
    height: 1,
    // width: "86%",
    // backgroundColor: "#CED0CE"
    backgroundColor: gray
    // marginLeft: "14%"
  },
  fallbackText: {
    color: primaryColor,
    textAlign: "center",
    margin: 15,
    fontSize: 18,
    fontFamily: "source-code-pro"
  }
});
