import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "./Icon";

export default class CreateMessage extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("CreateChannel")}>
          <Icon name="create" os size={36} color="lime" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
