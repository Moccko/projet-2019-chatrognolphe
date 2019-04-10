import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import Navigation from "./navigation/Navigation";
import { Font } from "expo";
import { Provider } from "react-redux";
import Store from "./store/Store";

export default class App extends React.Component {
  state = {
    fontLoaded: false
  };

  componentWillMount() {
    Font.loadAsync({
      "source-code-pro": require("./assets/fonts/SourceCodePro-Regular.ttf")
    }).then(() => this.setState({ fontLoaded: true }));
  }

  render() {
    return (
      this.state.fontLoaded && (
        <Provider store={Store}>
          <StatusBar barStyle="light-content" />
          <Navigation />
        </Provider>
      )
    );
  }
}
