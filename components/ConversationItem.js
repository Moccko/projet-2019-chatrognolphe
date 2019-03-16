import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "../components/Icon";
import Moment from "moment";

export default class ConversationItem extends React.Component {
  users = [];

  state = {
    creation: "",
    users: "",
    lastMessage: ""
  };

  componentDidMount() {
    const { conversation } = this.props;

    conversation.users.forEach((u, i) =>
      u.get().then(user => {
        this.users = [...this.users, user.data().fname];
        this.setState({
          users: this.users.reduce(
            (acc, val, ind) => `${acc}${ind === 0 ? "" : ", "}${val}`
          )
        });
      })
    );

    const lastMessage = conversation.messages.pop();

    this.setState({
      creation: Moment(lastMessage.sent).format("hh:mm"),
      lastMessage: lastMessage.content
    });
  }

  render() {
    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.users}>{this.state.users}</Text>
          <Text style={styles.message}>{this.state.lastMessage}</Text>
        </View>
        <Text style={[styles.when, styles.right]}>{this.state.creation}</Text>
        <TouchableOpacity style={styles.right}>
          <Icon name="cog" size={30} color={primaryColor} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

const primaryColor = "#ff09a3";

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center"
  },
  content: {
    flex: 1,
    flexDirection: "column"
  },
  right: { marginLeft: 5 },
  when: {},
  users: {
    fontSize: 20,
    color: primaryColor
  },
  message: {
    fontSize: 14
  }
});
