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

  render() {
    const { user, selectUser, selected } = this.props;

    return (
      <TouchableOpacity style={styles.container} onPress={selectUser}>
        <Text style={styles.user}>{`${user.fname} ${user.lname} // ${
          user.nickname
        }`}</Text>

        {selected && (
          <Icon
            name="checkmark-circle-outline"
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
const white = "white";
const darkGray = "#111";
const gray = "#333";
const lightGray = "#555";

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
    // backgroundColor: "#111"
  },
  user: {
    fontSize: 14,
    color: white,
    fontFamily: "source-code-pro"
  },
  settingsBtn: {
    padding: 10,
    marginRight: -10
  }
});
