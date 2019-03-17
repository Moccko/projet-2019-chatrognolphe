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
  StyleSheet
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { DB } from "../data/Database";
import Message from "../components/Message";
import Icon from "../components/Icon";
import Moment from "moment";

export default class Conversation extends React.Component {
  inputRef = undefined;

  state = {
    conversation: {},
    input: ""
  };

  send = () => {
    const { input } = this.state;
    if (input.length) {
      // Clear the input on send
      this.setState({ input: "" }, () => this.inputRef.clear());
    }
  };

  componentDidMount() {
    const id = this.props.navigation.getParam("id");

    Moment.locale("fr");

    // Listen to updates on this conversation
    this.conversationListener = DB.collection("channels")
      .doc(id)
      .onSnapshot(snapshot => {
        this.setState({ conversation: snapshot.data() });
      });
  }

  componentWillUnmount() {
    // Detach the listener
    this.conversationListener();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.messagesContainer}
          style={styles.messages}
        >
          {this.state.conversation.messages &&
            this.state.conversation.messages.map((message, index) => (
              <View key={index}>
                <Message
                  message={message}
                  style={
                    message.sender === "9XOpwA3LXqTURzaebAPE"
                      ? "sender"
                      : "receiver"
                  }
                />
                <Text style={styles.sent}>
                  {Moment(message.sent.seconds, "X").format(
                    "Do MMM YYYY hh:mm"
                  )}
                </Text>
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
              onChangeText={text => this.setState({ input: text })}
              ref={ref => (this.inputRef = ref)}
              keyboardAppearance="dark"
              placeholder=">_"
              placeholderTextColor="#555"
            />
            <TouchableOpacity style={styles.inputSend} onPress={this.send}>
              <Icon
                name="send"
                color={this.state.input.length ? "lime" : "#555"}
                size={30}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
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
    backgroundColor: "#333",
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
    backgroundColor: "black",
    color: "lime",
    margin: 5,
    fontFamily: "source-code-pro"
  },
  sent: {
    color: "#555",
    textAlign: "center"
  }
});
