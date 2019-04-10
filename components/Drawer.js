import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from "react-native";
import Icon from "./Icon";
import { DrawerItems, DrawerItem, withNavigation } from "react-navigation";
import { connect } from "react-redux";

class Drawer extends React.Component {
  editProfile = () => {
    this.props.navigation.navigate("EditProfile");
  };
  logOut = () => {
    this.props.dispatch({
      type: "LOG_OUT"
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.top}>
          <TouchableOpacity
            style={[styles.btn, styles.btnLeft]}
            onPress={this.editProfile}
          >
            <Icon name="person" os size={30} color="lime" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={this.logOut}>
            <Icon name="log-out" os size={30} color="lime" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <DrawerItems
            {...this.props}
            onItemPress={({ route, focused }) => {
              const { navigation, channels } = this.props;
              navigation.navigate("Conversation", {
                id: route.key
              });
            }}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  channels: state.channels
});

export default connect(mapStateToProps)(withNavigation(Drawer));

const white = "white";
const darkGray = "#111";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkGray
  },
  top: {
    flexDirection: "row",
    paddingRight: 15,
    paddingLeft: 15,
    padding: 5,
    justifyContent: "flex-end"
  },
  btn: {
    padding: 5
  },
  btnLeft: {
    marginRight: 15
  }
});
