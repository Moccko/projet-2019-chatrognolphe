import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class Message extends React.Component {
  render() {
    const { message } = this.props;

    return (
      message && (
        <View style={[styles.message, styles[this.props.style]]}>
          <Text style={[styles[`${this.props.style}Label`], styles.label]}>
            {message.content}
          </Text>
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  message: {
    margin: 1,
    padding: 10,
    borderRadius: 25
  },
  sender: {
    // height: 75,
    backgroundColor: "#555",
    alignSelf: "flex-end"
  },
  label: {
    color: "white",
    fontFamily: "source-code-pro"
  },
  senderLabel: {
    textAlign: "right"
  },
  receiver: {
    backgroundColor: "green",
    alignSelf: "flex-start"
  },
  receiverLabel: {
    textAlign: "left"
  }
});
