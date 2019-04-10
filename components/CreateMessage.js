import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "./Icon";

export default class CreateMessage extends React.Component {
  createChannel = () => {
    this.props.navigation.navigate("CreateChannel");
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.createChannel} style={styles.btn}>
          <Icon name="create" os size={30} color="lime" />
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
