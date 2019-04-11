import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "./Icon";

export default class EditConversation extends React.Component {
  editChannel = () => {
    const { navigation } = this.props;
    const channel = navigation.getParam("channel");
    navigation.navigate("Conversation_Options", { channel });
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
