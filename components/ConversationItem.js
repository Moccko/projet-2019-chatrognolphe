import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "../components/Icon";
import Moment from "moment";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { DB } from "../data/Database";

class ConversationItem extends React.Component {
  users = {};

  state = {
    lastUpdate: "",
    title: "",
    lastMessage: ""
  };

  onPress = () => {
    this.props.navigation.navigate("Conversation", {
      title: this.state.title,
      id: this.props.conversation.id
    });
  };

  get usersString() {
    const { user, users, allUsers } = this.props;

    return users
      .filter(val => val !== user.id)
      .reduce(
        (acc, val, ind) =>
          `${acc}${ind === 0 ? "" : ", "}${allUsers[val].fname}`,
        ""
      );
  }

  getInfos = async conversationSnapshot => {
    const title = await conversationSnapshot.get("title");

    // Store title or users
    this.setState({ title: !!title ? title : this.usersString });
  };

  updateLastMessage = messagesSnapshot => {
    // Get the last message
    if (!messagesSnapshot.empty) {
      const message = messagesSnapshot.docs[0].data();
      this.setState({
        lastMessage: message.content,
        lastUpdate: Moment(message.sent.seconds).format("HH:mm")
      });
    } else {
      const { conversation } = this.props;
      const creation = Moment(conversation.creation.seconds, "X").format(
        "HH:mm"
      );
      this.setState({
        lastMessage: `Conversation créée à ${creation}`,
        lastUpdate: creation
      });
    }
  };

  componentDidMount() {
    const { conversation } = this.props;

    const channelRef = DB.collection("channels").doc(conversation.id);
    this.lastMessageListener = DB.collection("messages")
      .where("channel", "==", channelRef)
      .orderBy("sent", "desc")
      .limit(1)
      .onSnapshot(this.updateLastMessage);
    this.channelListener = channelRef.onSnapshot(this.getInfos);
  }

  componentWillUnmount() {
    this.lastMessageListener();
    this.channelListener();
  }

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.onPress}>
        <View style={styles.content}>
          <Text style={styles.users}>{this.state.title}</Text>
          <Text style={styles.message}>{this.state.lastMessage}</Text>
        </View>
        <Text style={[styles.when, styles.right]}>{this.state.lastUpdate}</Text>
        <TouchableOpacity style={styles.right}>
          <Icon
            name="cog"
            size={30}
            color={primaryColor}
            style={styles.settingsBtn}
            os
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => ({ user: state.user, allUsers: state.users });

export default connect(mapStateToProps)(withNavigation(ConversationItem));

// const primaryColor = "#ff09a3";
const primaryColor = "lime";
const white = "white";

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
    color: white,
    fontFamily: "source-code-pro"
  },
  users: {
    fontSize: 20,
    color: primaryColor,
    fontFamily: "source-code-pro"
  },
  message: {
    fontSize: 14,
    color: white,
    fontFamily: "source-code-pro"
  },
  settingsBtn: {
    padding: 10,
    marginRight: -10
  }
});
