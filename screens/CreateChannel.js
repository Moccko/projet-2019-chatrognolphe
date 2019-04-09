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
import UserItem from "../components/UserItem";
import { connect } from "react-redux";

class CreateChannel extends React.Component {
  state = {
    selectedUsers: []
  };

  selectUser = user => {};

  render() {
    const { users, user } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <FlatList
          data={Object.values(users).filter(u => u.id !== user.id)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <UserItem user={item} selectUser={() => this.selectUser(item.id)} />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  users: state.users
});
export default connect(mapStateToProps)(CreateChannel);

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
