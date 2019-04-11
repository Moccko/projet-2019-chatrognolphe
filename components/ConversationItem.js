import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Platform
} from "react-native";
import Icon from "../components/Icon";
import Moment from "moment";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { DB } from "../data/Database";
import Swipeable from "react-native-swipeable";

class ConversationItem extends React.Component {
  users = {};

  state = {
    lastUpdate: "",
    title: "",
    lastMessage: ""
  };

  onPress = () => {
    const { navigation, conversation } = this.props;
    navigation.navigate("Conversation", {
      title: this.state.title,
      channel: conversation
    });
  };

  get usersString() {
    const { user, users, allUsers } = this.props;

    return users
      .filter(val => val !== user.id)
      .reduce(
        (acc, val, ind) => `${acc}${ind > 0 && ", "}${allUsers[val].fname}`,
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

  editConversation = () => {
    const { conversation, navigation } = this.props;
    navigation.navigate("Conversation_Options", { channel: conversation });
  };

  deleteConversation = () => {
    const { conversation } = this.props;
    Alert.alert(
      "Minute papillon",
      "Tu es sûr de vouloir supprimer cette conversation ? Cette action est irréversible, même pour Chuck Norris.",
      [
        {
          text: "Mdr je voulais juste tester",
          style: "cancel"
        },
        {
          text: "C'est mon dernier mot Jean-Pierre",
          onPress: () => {
            DB.collection("messages")
              .where("channel", "==", conversation.ref)
              .get()
              .then(messagesSnapshot => {
                messagesSnapshot.forEach(m => m.ref.delete());
                conversation.ref
                  .delete()
                  .catch(e =>
                    Alert.alert(
                      "Erreur",
                      `Impossible de supprimer la conversation : ${e.toString()}`
                    )
                  );
              })
              .catch(e =>
                Alert.alert(
                  "Erreur",
                  `Impossible de supprimer les messages associés : ${e.toString()}`
                )
              );
          }
        }
      ],
      { cancelable: true }
    );
  };

  componentDidMount() {
    const { conversation } = this.props;

    this.lastMessageListener = DB.collection("messages")
      .where("channel", "==", conversation.ref)
      .orderBy("sent", "desc")
      .limit(1)
      .onSnapshot(this.updateLastMessage);
    this.channelListener = conversation.ref.onSnapshot(this.getInfos);
  }

  componentWillUnmount() {
    this.lastMessageListener();
    this.channelListener();
  }

  render() {
    const rightButtons = [
      <TouchableOpacity
        style={[styles.rightSwipeItem, styles.moreBtn]}
        onPress={this.editConversation}
      >
        <Icon name="cog" os color={white} size={30} />
      </TouchableOpacity>,
      <TouchableOpacity
        style={[styles.rightSwipeItem, styles.deleteBtn]}
        onPress={this.deleteConversation}
      >
        <Icon name="close" os color={white} size={48} />
      </TouchableOpacity>
    ];

    return (
      <Swipeable rightButtons={rightButtons}>
        <TouchableOpacity style={styles.container} onPress={this.onPress}>
          <View style={styles.content}>
            <Text style={styles.users}>{this.state.title}</Text>
            <Text style={styles.message}>{this.state.lastMessage}</Text>
          </View>
          {Platform.OS === "android" && (
            <View style={{ flexDirection: "column", justifyContent: "center" }}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.androidNoSwipeBtn}
                  onPress={this.editConversation}
                >
                  <Icon
                    name="cog"
                    os
                    color={white}
                    size={23}
                    style={styles.androidIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.androidNoSwipeBtn}
                  onPress={this.deleteConversation}
                >
                  <Icon
                    name="close"
                    os
                    color={white}
                    size={32}
                    style={styles.androidIcon}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={[styles.when, styles.right]}>
                  {this.state.lastUpdate}
                </Text>
              </View>
            </View>
          )}

          {Platform.OS === "ios" && (
            <Text style={[styles.when, styles.right]}>
              {this.state.lastUpdate}
            </Text>
          )}
        </TouchableOpacity>
      </Swipeable>
    );
  }
}

const mapStateToProps = state => ({ user: state.user, allUsers: state.users });

export default connect(mapStateToProps)(withNavigation(ConversationItem));

// const primaryColor = "#ff09a3";
const primaryColor = "lime";
const white = "white";
const darkGray = "#111";
const gray = "#333";
const lightGray = "#555";
const red = "red";

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
  rightSwipeItem: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 20
  },
  moreBtn: {
    backgroundColor: gray
  },
  deleteBtn: {
    backgroundColor: red
  },
  androidNoSwipeBtn: {
    flex: 0,
    justifyContent: "center"
  },
  androidIcon: {
    alignSelf: "flex-end",
    marginRight: 5
  }
});
