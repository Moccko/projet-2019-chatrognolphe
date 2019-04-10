import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Moment from "moment";
import SvgUri from "expo-svg-uri";

class Message extends React.Component {
  renderTimestamp(message) {
    return (
      <Text style={styles.time}>
        {Moment(message.sent.seconds, "X").format("HH:mm")}
      </Text>
    );
  }

  renderAvatar(user) {
    return (
      <View style={styles.avatarContainer}>
        <SvgUri width="35" height="35" source={{ uri: user.avatar }} />
      </View>
    );
  }

  render() {
    const { message, user, style, currentUser } = this.props;
    const isSender = message.sender === currentUser.id;

    return (
      <View style={styles.container}>
        {isSender && this.renderTimestamp(message)}
        <View style={{ flexDirection: "row" }}>
          {!isSender && this.renderAvatar(user)}
          <View
            style={[styles.message, styles[isSender ? "sender" : "receiver"]]}
          >
            <Text style={[styles[`${style}Label`], styles.label]}>
              {`${
                user && user.nickname
                  ? user.nickname
                  : (user.fname + user.lname).toLowerCase()
              }$ ${message.content}`}
            </Text>
          </View>
          {isSender && this.renderAvatar(user)}
        </View>
        {!isSender && this.renderTimestamp(message)}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user
});

export default connect(mapStateToProps)(Message);

const white = "white";
const black = "black";
const darkGrey = "#333";
const lightGrey = "#555";
const primaryColor = "lime";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  message: {
    margin: 1,
    padding: 10,
    borderRadius: 25,
    maxWidth: "80%"
  },
  sender: {
    // height: 75,
    backgroundColor: lightGrey,
    alignSelf: "flex-end"
  },
  label: {
    fontFamily: "source-code-pro",
    color: white
  },
  senderLabel: {
    color: white,
    textAlign: "right"
  },
  receiver: {
    backgroundColor: primaryColor,
    alignSelf: "flex-start"
  },
  receiverLabel: {
    color: "black",
    textAlign: "left"
  },
  time: {
    color: darkGrey
  }
  // avatarContainer: {
  //   width: 10,
  //   height: 10
  // }
});
