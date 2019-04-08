import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import RecentMessages from "../screens/RecentMessages";
import Conversation from "../screens/Conversation";
import SignIn from "../screens/SignIn";
import SignUp_1 from "../screens/SignUp_1";
import SignUp_3 from "../screens/SignUp_3";
import { connect } from "react-redux";
import SignUp_2 from "../screens/SignUp_2";

const AuthNavigator = createStackNavigator(
  {
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        title: "Se connecter"
      }
    },
    SignUp_1: {
      screen: SignUp_1,
      navigationOptions: {
        title: "Créer un compte"
      }
    },
    SignUp_3: {
      screen: SignUp_3,
      navigationOptions: {
        title: "Compléter mon inscription"
      }
    },
    SignUp_2:{
      screen: SignUp_2,
      navigationOptions:{
        title: "TestInscrip"
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
