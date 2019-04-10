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
  StyleSheet
} from "react-native";

class Conversation_Options extends React.Component {
  id = this.props.navigation.getParam("id");

  showID = () => {
    return this.id;
  };
  render() {
    return (
      <View>
        <Text>{this.showID()}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({ channels: state.channels });

export default connect(mapStateToProps)(Conversation_Options);
