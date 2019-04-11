// TODO : group messages not to always display hour, enable multiline input message
import React from "react";
import {
  ScrollView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  Alert,
  Keyboard,
  Platform,
  StyleSheet
} from "react-native";
import { DB, Admin } from "../data/Database";
import Message from "../components/Message";
import Icon from "../components/Icon";
import Moment from "moment";
import { connect } from "react-redux";

class Conversation extends React.Component {
  inputRef = undefined;
  scrollViewRef = undefined;

  state = {
    conversation: [],
    messageInput: ""
  };

  updateMessages = messagesSnapshot => {
    const messages = messagesSnapshot.docs.map(m => {
      const sender = m.data().sender.id;

      return {
        ...m.data(),
        sender
      };
    });

    this.setState({ conversation: messages }, () =>
      this.scrollViewRef.scrollToEnd({ animated: true })
    );
  };

  componentDidMount() {
    this.conversation = this.props.navigation.getParam("channel");

    const messagesRef = DB.collection("messages")
      .where("channel", "==", this.conversation.ref)
      .orderBy("sent", "asc");

    // Listen to updates on this conversation
    this.conversationListener = messagesRef.onSnapshot(this.updateMessages);

    this.keyboardShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => this.scrollViewRef.scrollToEnd({ animated: true })
    );
  }

  componentWillUnmount() {
    // Detach the listener
    this.conversationListener();
    this.keyboardShowListener.remove();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.scrollViewRef.scrollToEnd({ animated: true });
  }

  send = () => {
    const { messageInput } = this.state;
    if (messageInput.length) {
      DB.collection("messages")
        .add({
          content: messageInput,
          channel: this.conversation.ref,
          sender: this.props.user.ref,
          sent: Admin.Timestamp.now()
        })
        .then(() => {
          // Clear the input on send
          this.setState({ messageInput: "" }, () => this.inputRef.clear());
        })
        .catch(error =>
          Alert.alert(
            "Impossible d'envoyer le message",
            `Veuillez réessayer plus tard. ${error}.`
          )
        );
    }
  };

  render() {
    const { users } = this.props;
    if (this.state.conversation.length)
      this.timestamp = Moment(this.state.conversation[0].sent, "X").subtract(
        1,
        "days"
      );

    const Date = props => {
      const { timestamp } = props;
      let shouldShow = false;
      if (timestamp.isAfter(this.timestamp)) {
        this.timestamp = timestamp.clone();
        this.timestamp.add(1, "days");
        shouldShow = true;
      }
      return (
        shouldShow && (
          <Text style={styles.sent}>{timestamp.format("Do MMMM YYYY")}</Text>
        )
      );
    };

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.messagesContainer}
          ref={ref => (this.scrollViewRef = ref)}
        >
          {this.state.conversation.length > 0 &&
            this.state.conversation.map((message, index) => (
              <View key={index}>
                <Date timestamp={Moment(message.sent.seconds, "X")} />
                <Message message={message} user={users[message.sender]} />
              </View>
            ))}
        </ScrollView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={88}>
          <View style={styles.inputArea}>
            <TouchableOpacity style={styles.inputAddon}>
              <Icon name="add" color="#555" size={40} os />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              onChangeText={text => this.setState({ messageInput: text })}
              ref={ref => (this.inputRef = ref)}
              keyboardAppearance="dark"
              placeholder=">_"
              placeholderTextColor="#555"
            />
            <TouchableOpacity style={styles.inputSend} onPress={this.send}>
              <Icon
                name="send"
                color={this.state.messageInput.length ? "lime" : "#555"}
                size={30}
                os
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({ user: state.user, users: state.users });

export default connect(mapStateToProps)(Conversation);

const black = "black";
const darkGrey = "#333";
const lightGrey = "#555";
const primaryColor = "lime";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black
  },
  messagesContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    padding: 10
  },
  inputArea: {
    flex: 0,
    flexDirection: "row",
    backgroundColor: darkGrey,
    alignItems: "center"
  },
  inputAddon: {
    marginLeft: 10,
    marginRight: 5
  },
  inputSend: {
    padding: 10
  },
  input: {
    height: 40,
    borderRadius: 25,
    padding: 10,
    flex: 1,
    backgroundColor: black,
    color: primaryColor,
    margin: 5,
    fontFamily: "source-code-pro"
  },
  sent: {
    color: lightGrey,
    textAlign: "center",
    margin: 5
  }
});
