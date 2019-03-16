import React from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class Icon extends React.Component {
  render() {
    return (
      <Ionicons
        {...this.props}
        name={`${Platform.OS === "ios" ? "ios" : "md"}-${this.props.name}`}
      />
    );
  }
}
