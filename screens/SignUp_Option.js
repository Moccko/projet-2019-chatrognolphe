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
import md5 from "crypto-js/md5";
import { DB } from "../data/Database";
import Avatars from "@dicebear/avatars";
import sprites from "@dicebear/avatars-male-sprites";

export default class SignUp_Option extends React.Component {
  nickN = undefined;
  tel = undefined;
  aboutMe = undefined;
  tel_ref = undefined;
  aboutMe_ref = undefined;
  options = {};
  avatars = new Avatars(sprites(options));
  svg = avatars.create("custom-seed");

  state = {
    seed: "cid"
  };

  _signIn = () => {
    this.props.navigation.navigate("SignIn");
  };

  _finalSignUp = () => {
    const user = {
      nickname: this.nickN,
      phone: this.tel,
      aboutMe: this.aboutMe
    };
    //console.log( this.props.navigation.getParam("email"))
    DB.collection("user")
      .where("email", "==", this.props.navigation.getParam("email"))
      .set({ user }, { merge: true });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={100}
          >
            <Image
              source={{
                uri: `https://avatars.dicebear.com/v2/male/${
                  this.state.seed
                }.svg`
              }}
              style={styles.image}
            />
            <Text style={styles.label}> Mon surnom </Text>
            <TextInput
              style={styles.input}
              onChangeText={text => (this.nickN = text.toLowerCase())}
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
              ref={ref => (this.aboutMe_ref = ref)}
              returnKeyType="go"
              style={styles.input}
              placeholder="Je suis une bite"
              placeholderTextColor="#555"
              keyboardAppearance="dark"
              onEndEditing={this._finalSignUp()}
            />

            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={this._finalSignUp}
            >
              <Text style={styles.btnPrimaryLb}>Devenir un hacker</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnSecondary}
              onPress={this._signIn}
            >
              <Text style={styles.btnSecondaryLb}>Déjà dans la matrice</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
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
    width: 100,
    height: 100
  }
});
