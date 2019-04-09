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
import { DrawerItems, DrawerItem } from "react-navigation";
import { connect } from "react-redux";

class Drawer extends React.Component {
  logOut = () => {
    this.props.dispatch({
      type: "LOG_OUT"
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.top}>
            <TouchableOpacity>
              <Icon name="person" os size={36} color="lime" />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.logOut}>
              <Icon name="log-out" os size={36} color="lime" />
            </TouchableOpacity>
          </View>
          <DrawerItems {...this.props} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  channels: state.channels
});

export default connect(mapStateToProps)(Drawer);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  top: {
    flexDirection: "row",
    paddingRight: 15,
    paddingLeft: 15,
    padding: 5,
    justifyContent: "flex-end"
  },
  test: {
    color: "white"
  }
});
