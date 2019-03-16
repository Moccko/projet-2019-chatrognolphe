import React from "react";
import { StyleSheet, SafeAreaView, Dimensions } from "react-native";

import RecentMessages from "./screens/RecentMessages";

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <RecentMessages />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
