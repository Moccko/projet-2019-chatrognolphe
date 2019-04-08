import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
  Image
} from "react-native";
import SvgUri from "expo-svg-uri";
import { DB } from "../data/Database";
import Avatars from "@dicebear/avatars";
import sprites from "@dicebear/avatars-male-sprites";
import { connect } from "react-redux";


export default class SignUp_3 extends React.Component {
  nickN = "";
  tel = "";
  aboutMe = "";
  tel_ref = undefined;
  aboutMe_ref = undefined;
  options = {};

  state = {
    svg: "https://avatars.dicebear.com/v2/male/h.svg"
  };

  componentDidMount() {
    this.avatars = new Avatars(sprites(this.options)); // male, female, identicon
  }

  storeUser = user => {
    const userInf = {
      nickname: this.nickN,
      phone: this.tel,
      aboutMe: this.aboutMe,
      avatarUser: this.state.svg
    };
    DB.collection("users")
      .doc(user.id.toString())
      .set(userInf, { merge: true });
    const u = {
      id: user.id,
      ...user.data()
    };
    const action = { type: "LOG_IN", value: u };
    this.props.dispatch(action);
    this.props.navigation.navigate("RecentMessages");
  };

  _signIn = () => {
    this.props.navigation.navigate("SignIn");
  };

  _finalSignUp = () => {
    DB.collection("users")
      .where("email", "==", this.props.navigation.getParam("email"))
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          snapshot.forEach(this.storeUser);
        }
      });
  };

  updateAvatar = text => {
    this.setState({ svg: `https://avatars.dicebear.com/v2/male/${text}.svg` });
    this.nickN = text;
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <SvgUri width="150" height="150" source={{ uri: this.state.svg }} />
          </View>
          <Text style={styles.label}> Mon surnom </Text>
          <TextInput
            style={styles.input}
            onChangeText={this.updateAvatar}
            returnKeyType="next"
            onEndEditing={() => this.tel_ref.focus()}
            autoCapitalize="none"
            placeholder="an@nymo.us"
            placeholderTextColor="#555"
            keyboardAppearance="dark"
            keyboardType="email-address"
            textContentType="username"
          />

          <Text style={styles.label}> Numéro de téléphone </Text>
          <TextInput
            style={styles.input}
            ref={ref => (this.tel_ref = ref)}
            onChangeText={text => (this.tel = text)}
            onEndEditing={() => this.aboutMe_ref.focus()}
            returnKeyType="next"
            placeholder="Tu devineras jamais"
            placeholderTextColor="#555"
            keyboardAppearance="dark"
          />
          <Text style={styles.label}>À propos de moi</Text>
          <TextInput
            onChangeText={text => (this.aboutMe = text)}
            ref={ref => (this.aboutMe_ref = ref)}
            returnKeyType="go"
            style={styles.input}
            placeholder="Je suis une bite"
            placeholderTextColor="#555"
            keyboardAppearance="dark"
            onEndEditing={this._finalSignUp}
          />
          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={this._finalSignUp}
          >
            <Text style={styles.btnPrimaryLb}>Devenir un hacker</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSecondary} onPress={this._signIn}>
            <Text style={styles.btnSecondaryLb}>Déjà dans la matrice</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const primaryColor = "lime";
const black = "black";
//const fb =  "#3b5998" ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black
  },
  scrollContainer: {
    // flex: 1,
    alignItems: "center",
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: black
  },
  h2: {
    textAlign: "center",
    fontSize: 28,
    fontFamily: "source-code-pro",
    color: primaryColor
  },
  label: {
    fontSize: 15,
    marginTop: 15,
    marginBottom: 5,
    fontFamily: "source-code-pro",
    color: primaryColor
  },
  input: {
    borderColor: primaryColor,
    borderBottomWidth: 1,
    borderStyle: "solid",
    width: 280,
    height: 40,
    fontFamily: "source-code-pro",
    color: primaryColor
  },
  btnPrimary: {
    backgroundColor: primaryColor,
    borderRadius: 5,
    padding: 15,
    marginTop: 15,
    marginBottom: 5
  },
  btnPrimaryLb: {
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "source-code-pro",
    color: black
  },
  btnSecondary: {
    borderRadius: 5,
    padding: 13,
    borderColor: primaryColor,
    borderStyle: "solid",
    borderWidth: 2,
    marginTop: 15,
    marginBottom: 5
  },
  btnSecondaryLb: {
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "source-code-pro",
    color: primaryColor
  },
  image: {
    width: 150,
    height: 150
  }
});
