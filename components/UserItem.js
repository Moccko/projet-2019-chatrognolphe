import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "../components/Icon";

export default class UserItem extends React.Component {
  users = {};

  state = {
    lastUpdate: "",
    title: "",
    lastMessage: ""
  };

  componentWillUnmount() {
    this.usersListener();
    this.lastMessageListener();
    this.channelListener();
  }

  render() {
    const { user, selectUser, selected } = this.props;

    return (
      <TouchableOpacity style={styles.container} onPress={selectUser}>
        <Text style={styles.message}>{`${user.fname} ${user.lname}`}</Text>

        {selected && (
          <Icon
            name="checkmark-circle"
            size={30}
            color={primaryColor}
            style={styles.settingsBtn}
            os
          />
        )}
      </TouchableOpacity>
    );
  }
}

// const primaryColor = "#ff09a3";
const primaryColor = "lime";

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center"
    // backgroundColor: "#111"
  },
  content: {
    flex: 1,
    flexDirection: "column"
  },
  right: { marginLeft: 5 },
  when: {
    color: "white",
    fontFamily: "source-code-pro"
  },
  users: {
    fontSize: 20,
    color: primaryColor,
    fontFamily: "source-code-pro"
  },
  message: {
    fontSize: 14,
    color: "white",
    fontFamily: "source-code-pro"
  },
  settingsBtn: {
    padding: 10,
    marginRight: -10
  }
});
