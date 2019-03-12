import React from "react";
import { StyleSheet, SafeAreaView, Dimensions } from "react-native";

import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <SignUp />
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
