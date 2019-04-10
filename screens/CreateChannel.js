import React from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import UserItem from "../components/UserItem";
import { connect } from "react-redux";
import Icon from "../components/Icon";

import { DB, Admin } from "../data/Database";

class CreateChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredUsers: this.props.users,
      selectedUsers: []
    };
  }

  title = "";

  filterUsers = text => {
    const { users } = this.props;

    const filteredUsers = Object.values(users).filter(
      user =>
        user.fname.search(text) !== -1 ||
        user.lname.search(text) !== -1 ||
        user.nickname.search(text) !== -1 ||
        user.email.search(text) !== -1
    );

    this.setState({ filteredUsers });
  };

  selectUser = selectedUser => {
    const { selectedUsers } = this.state;
    let newUsers;
    if (selectedUsers.find(id => id === selectedUser)) {
      newUsers = selectedUsers.filter(id => id !== selectedUser);
    } else {
      newUsers = [selectedUser, ...selectedUsers];
    }
    this.setState({ selectedUsers: newUsers });
  };

  createChannel = () => {
    const { user, users, navigation } = this.props;

    DB.collection("channels")
      .add({
        title: this.title,
        users: [
          ...this.state.selectedUsers.map(user => users[user].ref),
          user.ref
        ],
        creation: Admin.Timestamp.now()
      })
      .then(async channel =>
        navigation.navigate("Conversation", {
          title: (await channel.get()).data().title,
          id: channel.id
        })
      );
  };

  render() {
    const { user } = this.props;
    const { filteredUsers, selectedUsers } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.channelTitleContainer}>
          <TextInput
            style={styles.channelTitleInput}
            onChangeText={text => (this.title = text)}
            keyboardAppearance="dark"
            placeholder="Nommer la conversation"
            placeholderTextColor={lightGray}
          />
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            onChangeText={this.filterUsers}
            keyboardAppearance="dark"
            placeholder=">_ Recherche"
            placeholderTextColor={lightGray}
          />
        </View>
        <FlatList
          data={Object.values(filteredUsers).filter(u => u.id !== user.id)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <UserItem
              user={item}
              selectUser={() => this.selectUser(item.id)}
              selected={selectedUsers.find(id => id === item.id)}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
        {this.state.selectedUsers.length > 0 && (
          <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={60}>
            <TouchableOpacity
              style={styles.fab}
              onPress={this.createChannel}
              pointerEvents="box-none"
            >
              <Icon
                name="send"
                os
                color="white"
                size={36}
                style={styles.icon}
              />
            </TouchableOpacity>
          </KeyboardAvoidingView>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  users: state.users
});
export default connect(mapStateToProps)(CreateChannel);

// const primaryColor = "#ff09a3";
const primaryColor = "lime";
const white = "white";
const darkGray = "#111";
const gray = "#333";
const lightGray = "#555";
const black = "black";

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
  channelTitleContainer: {
    height: 75
  },
  channelTitleInput: {
    flex: 1,
    fontSize: 22,
    padding: 15,
    fontFamily: "source-code-pro",
    color: primaryColor
  },
  searchContainer: {
    flex: 0,
    flexDirection: "row",
    backgroundColor: darkGray,
    alignItems: "center"
  },
  searchInput: {
    height: 40,
    borderRadius: 25,
    padding: 10,
    flex: 1,
    backgroundColor: black,
    color: primaryColor,
    margin: 5,
    fontFamily: "source-code-pro"
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: primaryColor,
    position: "absolute",
    bottom: 50,
    right: 25,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  icon: {
    marginTop: 5,
    marginRight: 3
  }
});
