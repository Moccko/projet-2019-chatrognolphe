import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import RecentMessages from "../screens/RecentMessages";
import Conversation from "../screens/Conversation";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import { connect } from "react-redux";

const AuthNavigator = createStackNavigator(
  {
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        title: "Se connecter"
      }
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        title: "Créer un compte"
      }
    }
  },
  {
    initialRouteName: "SignIn",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#000"
      },
      // headerTintColor: "#ff09a3",
      headerTintColor: "lime",
      headerTitleStyle: {
        fontFamily: "source-code-pro"
        // fontWeight: 'bold',
      }
    }
  }
);

const AppNavigator = createStackNavigator(
  {
    RecentMessages: {
      screen: RecentMessages,
      navigationOptions: {
        title: "Recent messages"
      }
    },
    Conversation: {
      screen: Conversation,
      navigationOptions: ({ navigation }) => ({
        title: navigation.getParam("title")
      })
    }
  },
  {
    initialRouteName: "RecentMessages",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#000"
      },
      // headerTintColor: "#ff09a3",
      headerTintColor: "lime",
      headerTitleStyle: {
        fontFamily: "source-code-pro"
        // fontWeight: 'bold',
      }
    }
  }
);

const AuthNavigation = createAppContainer(AuthNavigator);
const AppNavigation = createAppContainer(AppNavigator);

class Navigation extends React.Component {
  render() {
    return this.props.user !== undefined ? (
      <AppNavigation />
    ) : (
      <AuthNavigation />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Navigation);
