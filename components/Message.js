import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Moment from "moment";
import SvgUri from "expo-svg-uri";

class Message extends React.Component {
  static renderTimestamp(message) {
    return (
      <Text style={styles.time}>
        {Moment(message.sent.seconds, "X").format("HH:mm")}
      </Text>
    );
  }

  static renderAvatar(user) {
    return (
      <SvgUri
        width="35"
        height="35"
        source={{ uri: user.avatar }}
        style={styles.avatar}
      />
    );
  }

  render() {
    const { message, user, currentUser } = this.props;
    const isSender = message.sender === currentUser.id;

    return (
      <View style={styles.container}>
        {isSender && Message.renderTimestamp(message)}
        <View
          style={[styles.contentContainer, isSender && styles.senderContainer]}
        >
          {!isSender && Message.renderAvatar(user)}
          {message.content ? (
            <View
              style={[
                styles.message,
                isSender ? styles.sender : styles.receiver
              ]}
            >
              <Text
                style={[
                  isSender ? styles.senderLabel : styles.receiverLabel,
                  styles.label
                ]}
              >
                {`${
                  user && user.nickname
                    ? user.nickname
                    : (user.fname + user.lname).toLowerCase()
                }$ ${message.content}`}
              </Text>
            </View>
          ) : (
            <Image
              source={{ uri: message.gif }}
              style={[
                styles.gif,
                { width: message.width, height: message.height }
              ]}
            />
          )}
        </View>
        {!isSender && Message.renderTimestamp(message)}
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
    borderRadius: 25
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    maxWidth: "80%"
  },
  senderContainer: {
    // flexDirection: "row",
    // alignItems: "flex-end",
    // backgroundColor: "red"
  },
  sender: {
    // height: 75,
    backgroundColor: lightGrey,
    alignSelf: "flex-end",
    justifyContent: "flex-end"
  },
  receiver: {
    backgroundColor: primaryColor,
    alignSelf: "flex-start"
  },
  label: {
    fontFamily: "source-code-pro",
    color: white
  },
  senderLabel: {
    color: white,
    textAlign: "right"
  },
  receiverLabel: {
    color: black,
    textAlign: "left"
  },
  time: {
    color: darkGrey
  },
  avatar: {
    marginRight: 3,
    marginBottom: 3
  },
  gif: {
    borderRadius: 25,
    alignSelf: "flex-end"
  }
});
