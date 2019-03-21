import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

class Message extends React.Component {
  render() {
    const { message, user, style, currentUser } = this.props;

    return (
      message && (
        <View
          style={[
            styles.message,
            styles[message.sender === currentUser.id ? "sender" : "receiver"]
          ]}
        >
          <Text style={[styles[`${style}Label`], styles.label]}>
            {`${
              user && user.nickname ? user.nickname : user.fname.toLowerCase()
            }$ ${message.content}`}
          </Text>
        </View>
      )
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
  message: {
    margin: 1,
    padding: 10,
    borderRadius: 25
  },
  sender: {
    // height: 75,
    backgroundColor: lightGrey,
    alignSelf: "flex-end"
  },
  label: {
    fontFamily: "source-code-pro"
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
  nameLabel: {
    color: primaryColor,
    textAlign: "center"
  }
});
