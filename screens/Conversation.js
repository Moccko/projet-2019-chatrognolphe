// TODO : group messages not to always display hour
import React from "react";
import {
  ScrollView,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  Alert,
  StyleSheet
} from "react-native";
import { DB, Admin } from "../data/Database";
import Message from "../components/Message";
import Icon from "../components/Icon";
import Moment from "moment";
import { connect } from "react-redux";

class Conversation extends React.Component {
  inputRef = undefined;

  state = {
    conversation: {},
    messageInput: ""
  };

  componentDidMount() {
    Moment.locale("fr");

    const id = this.props.navigation.getParam("id");
    this.conversation = DB.collection("channels").doc(id);
    // Listen to updates on this conversation
    this.conversationListener = this.conversation.onSnapshot(snapshot => {
      this.setState({ conversation: snapshot.data() });
    });
  }

  componentWillUnmount() {
    // Detach the listener
    this.conversationListener();
  }

  send = () => {
    const { messageInput } = this.state;
    if (messageInput.length) {
      this.conversation
        .update({
          messages: Admin.FieldValue.arrayUnion({
            content: this.state.messageInput,
            read: Admin.Timestamp.now(),
            sender: this.props.user.id,
            sent: Admin.Timestamp.now()
          })
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
    const { navigation } = this.props;
    const users = navigation.getParam("users");

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.messagesContainer}
          style={styles.messages}
        >
          {this.state.conversation.messages &&
            this.state.conversation.messages.map((message, index) => (
              <View key={index}>
                <Text style={styles.sent}>
                  {Moment(message.sent.seconds, "X").format(
                    "Do MMM YYYY hh:mm"
                  )}
                </Text>
                <Message message={message} user={users[message.sender]} />
              </View>
            ))}
        </ScrollView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={88}>
          <View style={styles.inputArea}>
            <TouchableOpacity style={styles.inputAddon}>
              <Icon name="add" color="#555" size={40} />
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
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

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
    flex: 1,
    justifyContent: "flex-end"
  },
  messages: {
    width: Dimensions.get("window").width,
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
