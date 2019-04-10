import React from "react";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";

import { DB } from "../data/Database";

import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import SignUp_Options from "../screens/SignUp_Options";
import EditProfile from "../screens/EditProfile";

import RecentMessages from "../screens/RecentMessages";
import Conversation from "../screens/Conversation";
import CreateChannel from "../screens/CreateChannel";

import { connect } from "react-redux";
import { View, ActivityIndicator, StyleSheet, Vibration } from "react-native";

import Drawer from "../components/Drawer";
import CreateMessage from "../components/CreateMessage";
import Icon from "../components/Icon";

class Navigation extends React.Component {
  channelsListener = undefined;

  updateChannels = channelSnapshot => {
    const channels = [];

    if (!channelSnapshot.empty) {
      channelSnapshot.forEach(channel => {
        channels.push({
          id: channel.id,
          ...channel.data()
        });
      });
    }

    Vibration.vibrate(500, false);
    this.props.dispatch({
      type: "UPDATE_CHANNELS",
      value: channels
    });
  };

  updateUsers = usersSnapshot => {
    const users = {};
    usersSnapshot.forEach(
      user => (users[user.id] = { id: user.id, ...user.data() })
    );

    this.props.dispatch({ type: "UPDATE_USERS", value: users });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const oldUser = prevProps.user;
    const { user } = this.props;

    // if the user changed, unsubscribe from listeners and subscribe to new listeners
    if (oldUser !== user && user !== null) {
      if (this.channelsListener !== undefined) {
        this.channelsListener();
      }
      if (this.usersListener !== undefined) {
        this.usersListener();
      }

      this.channelsListener = DB.collection("channels")
        .where("users", "array-contains", user.ref)
        .onSnapshot(this.updateChannels);

      this.usersListener = DB.collection("users").onSnapshot(this.updateUsers);
    }
  }

  componentWillUnmount() {
    this.channelsListener();
    this.usersListener();
  }

  render() {
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
            title: "S'inscrire"
          }
        },
        SignUp_Options: {
          screen: SignUp_Options,
          navigationOptions: {
            title: "Informations personnelles"
          }
        },
        EditProfile: {
          screen: EditProfile,
          navigationOptions: {
            title: "Autres informations"
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
          },
          headerBackTitleStyle: {
            fontFamily: "source-code-pro"
          }
        }
      }
    );

    const MessagesNavigator = createStackNavigator(
      {
        RecentMessages: {
          screen: RecentMessages,
          navigationOptions: ({ navigation }) => ({
            title: "Messages récents",
            headerRight: <CreateMessage navigation={navigation} />
          })
        },
        CreateChannel: {
          screen: CreateChannel,
          navigationOptions: {
            title: "Lancer un chat"
          }
        },
        Conversation: {
          screen: Conversation,
          navigationOptions: ({ navigation }) => ({
            title: navigation.getParam("title")
          })
        },
        EditProfile: {
          screen: EditProfile,
          navigationOptions: {
            title: "Modifier son profil"
          }
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
          },
          headerBackTitleStyle: {
            fontFamily: "source-code-pro"
          }
        }
      }
    );

    const drawerItems = {
      RecentMessages: {
        screen: MessagesNavigator,
        navigationOptions: {
          title: "Messages récents",
          drawerIcon: ({ focused, tintColor }) => (
            <Icon name="home" color={tintColor} size={20} os />
          )
        }
      }
    };
    if (this.props.channels) {
      this.props.channels.forEach((channel, index) => {
        drawerItems[`MessagesNavigator${index}`] = {
          screen: MessagesNavigator,
          navigationOptions: {
            title: "Messages récents",
            drawerIcon: ({ focused, tintColor }) => (
              <Icon name="mail" color={tintColor} size={20} os />
            )
          }
        };
      });
    }

    const AppNavigator = createDrawerNavigator(drawerItems, {
      initialRouteName: "RecentMessages",
      drawerPosition: "right",
      drawerBackgroundColor: "black",
      drawerType: "slide",
      contentOptions: {
        activeTintColor: "lime",
        activeBackgroundColor: "gray",
        inactiveTintColor: "gray",
        activeLabelStyle: {
          fontFamily: "source-code-pro"
        },
        inactiveLabelStyle: {
          fontFamily: "source-code-pro"
        }
      },
      contentComponent: props => <Drawer {...props} />
    });

    const AuthNavigation = createAppContainer(AuthNavigator);
    const AppNavigation = createAppContainer(AppNavigator);

    if (this.props.user === null) {
      return <AuthNavigation />;
    } else {
      return this.props.channels !== null ? (
        <AppNavigation />
      ) : (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="white" />
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.user,
  channels: state.channels
});

export default connect(mapStateToProps)(Navigation);

const black = "black";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: black
  }
});
