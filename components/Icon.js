import React from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class Icon extends React.Component {
  render() {
    const { name, os } = this.props;
    return (
      <Ionicons
        {...this.props}
        name={os ? `${Platform.OS === "ios" ? "ios" : "md"}-${name}` : name}
      />
    );
  }
}
