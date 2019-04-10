// TODO : FlatList won't update with the right content
import React from "react";
import {
  Text,
  ScrollView,
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
        <ScrollView>
          {channels.length ? (
            <FlatList
              data={this.props.channels}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <ConversationItem conversation={item} />
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          ) : (
            <Text
              style={{
                color: "white",
                textAlign: "center",
                margin: 15,
                fontSize: 18
              }}
            >
              Vous n'avez pas encore de discussion. Créez-en une avec un être
              humain !
            </Text>
          )}
        </ScrollView>
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
