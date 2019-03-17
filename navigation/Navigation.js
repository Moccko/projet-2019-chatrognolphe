import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import RecentMessages from "../screens/RecentMessages";
import Conversation from "../screens/Conversation";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";

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
    },
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
    initialRouteName: "SignIn",
    /* The header config from HomeScreen is now here */
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

export default createAppContainer(AuthNavigator);
