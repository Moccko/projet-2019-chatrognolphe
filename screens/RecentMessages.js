// TODO : FlatList won't update with the right content
import React from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  StatusBar,
  SafeAreaView
} from "react-native";
import ConversationItem from "../components/ConversationItem";
import { connect } from "react-redux";

class RecentMessages extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <FlatList
          data={this.props.channels}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ConversationItem conversation={item} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  channels: state.channels
});
export default connect(mapStateToProps)(RecentMessages);

const primaryColor = "#ff09a3";
const black = "black";
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
    backgroundColor: lightGray
    // marginLeft: "14%"
  }
});
