//TODO remove current user from allUsers list
import React from "react";
import { connect } from "react-redux";
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
  StyleSheet,
  Dimensions
} from "react-native";
import UserItem from "../components/UserItem";
import Icon from "../components/Icon";

class Conversation_Options extends React.Component {
  constructor(props) {
    super(props);

    this.conversation = this.props.navigation.getParam("channel");

    this.state = {
      filteredUsers: this.props.users,
      selectedUsers: this.conversation.users,
      title: this.conversation.title
    };
  }

  filterUsers = text => {
    const { users } = this.conversation.users;

    const filteredUsers = Object.values(users).filter(
      user =>
        user.fname.search(text) !== -1 ||
        user.lname.search(text) !== -1 ||
        user.nickname.search(text) !== -1 ||
        user.email.search(text) !== -1
    );
    this.setState({ filteredUsers });
  };

  selectUser = selectedUser => {
    const { selectedUsers } = this.state;
    let newUsers;
    if (selectedUsers.find(id => id === selectedUser)) {
      newUsers = selectedUsers.filter(id => id !== selectedUser);
    } else {
      newUsers = [selectedUser, ...selectedUsers];
    }
    this.setState({ selectedUsers: newUsers });
  };

  changeTitleChannel = () => {
    this.conversation.ref.set({ title: this.state.title }, { merge: true });
  };

  sendNewListUsers = () => {
    const { users } = this.props;

    this.conversation.ref.update({
      title: this.conversation.title,
      users: this.state.selectedUsers.map(user => users[user].ref)
    });
  };

  render() {
    const { user } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.channelTitleContainer}>
          <TextInput
            style={styles.channelTitleInput}
            onChangeText={text => (this.state.title = text)}
            keyboardAppearance="dark"
            placeholder="Nommer la conversation"
            placeholderTextColor={lightGray}
          />
        </View>
        <Text style={styles.label}>Modifier la liste des utilisateurs</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            onChangeText={this.filterUsers}
            keyboardAppearance="dark"
            placeholder=">_ Recherche"
            placeholderTextColor={lightGray}
          />
        </View>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={60}>
          <TouchableOpacity
            //style={styles.fab}
            onPress={this.sendNewListUsers}
            pointerEvents="box-none"
          >
            <Icon name="send" os color="white" size={36} style={styles.icon} />
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <FlatList
          data={Object.values(this.state.filteredUsers).filter(
            u => u.id !== user.id
          )}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <UserItem
              user={item}
              selectUser={() => this.selectUser(item.id)}
              selected={this.state.selectedUsers.find(id => id === item.id)}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  channels: state.channels,
  users: state.users,
  user: state.user
});

export default connect(mapStateToProps)(Conversation_Options);

// const primaryColor = "#ff09a3";
const primaryColor = "lime";
const black = "black";
const white = "white";
const darkGray = "#111";
const gray = "#333";
const lightGray = "#555";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black
  },
  keyboardAvoidingView: {
    flex: 1
  },
  form: {
    // flex: 1,
    alignItems: "center",
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: black
  },
  h2: {
    textAlign: "center",
    fontSize: 28,
    fontFamily: "source-code-pro",
    color: primaryColor
  },
  label: {
    fontSize: 15,
    marginTop: 15,
    marginBottom: 5,
    fontFamily: "source-code-pro",
    color: primaryColor
  },
  input: {
    borderColor: primaryColor,
    borderBottomWidth: 1,
    borderStyle: "solid",
    width: 280,
    height: 40,
    fontFamily: "source-code-pro",
    color: primaryColor
  },
  btnPrimary: {
    backgroundColor: primaryColor,
    borderRadius: 5,
    padding: 15,
    marginTop: 15
  },
  btnPrimaryLb: {
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "source-code-pro",
    color: black
  },
  btnSecondary: {
    borderRadius: 5,
    padding: 13,
    borderColor: primaryColor,
    borderStyle: "solid",
    borderWidth: 2,
    marginTop: 15,
    marginBottom: 5
  },
  btnSecondaryLb: {
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "source-code-pro",
    color: primaryColor
  },
  separator: {
    height: 1,
    // width: "86%",
    // backgroundColor: "#CED0CE"
    backgroundColor: gray
    // marginLeft: "14%"
  },
  channelTitleContainer: {
    height: 75
  },
  channelTitleInput: {
    flex: 1,
    fontSize: 22,
    padding: 15,
    fontFamily: "source-code-pro",
    color: primaryColor
  },
  searchContainer: {
    flex: 0,
    flexDirection: "row",
    backgroundColor: darkGray,
    alignItems: "center"
  },
  searchInput: {
    height: 40,
    borderRadius: 25,
    padding: 10,
    flex: 1,
    backgroundColor: black,
    color: primaryColor,
    margin: 5,
    fontFamily: "source-code-pro"
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: primaryColor,
    position: "absolute",
    bottom: 50,
    right: 25,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  icon: {
    marginTop: 5,
    marginRight: 3
  }
});
