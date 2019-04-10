import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "./Icon";

export default class EditConversation extends React.Component {
  editChannel = () => {
    this.props.navigation.navigate("Conversation_Options");
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.editChannel} style={styles.btn}>
          <Icon name="cog" os size={30} color="lime" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    marginRight: 15
  }
});
