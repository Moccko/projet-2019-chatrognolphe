import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "../components/Icon";
import Moment from "moment";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";

class ConversationItem extends React.Component {
  users = {};

  state = {
    creation: "",
    users: "",
    lastMessage: ""
  };

  onPress = () => {
    this.props.navigation.navigate("Conversation", {
      title: this.state.users,
      id: this.props.conversation.id,
      users: this.users
    });
  };

  componentDidMount() {
    const { conversation } = this.props;

    conversation.users.forEach(u =>
      u.get().then(user => {
        this.users[user.id] = { id: user.id, ...user.data() };
        this.setState({
          users: Object.values(this.users)
            .filter(val => val.id !== this.props.user.id)
            .reduce(
              (acc, val, ind) => `${acc}${ind === 0 ? "" : ", "}${val.fname}`,
              ""
            )
        });
      })
    );

    const lastMessage = conversation.messages.pop();

    this.setState({
      creation: Moment(lastMessage.sent.seconds).format("hh:mm"),
      lastMessage: lastMessage.content
    });
  }

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.onPress}>
        <View style={styles.content}>
          <Text style={styles.users}>{this.state.users}</Text>
          <Text style={styles.message}>{this.state.lastMessage}</Text>
        </View>
        <Text style={[styles.when, styles.right]}>{this.state.creation}</Text>
        <TouchableOpacity style={styles.right}>
          <Icon
            name="cog"
            size={30}
            color={primaryColor}
            style={styles.settingsBtn}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(withNavigation(ConversationItem));

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
