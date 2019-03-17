import React from "react";
import Navigation from "./navigation/Navigation";
import { Font } from "expo";
import SignUp from "./screens/SignUp";

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
    return this.state.fontLoaded && <Navigation />;
  }
}
