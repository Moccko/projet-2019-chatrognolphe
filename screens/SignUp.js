//TODO : Correct the next bug
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
import { Ionicons } from "@expo/vector-icons";

import md5 from "crypto-js/md5";
import DatePicker from "react-native-datepicker";

import { Auth } from "../data/Database";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }
  //variables pour les ref du premier render()
  refpwd = "";
  refcpwd = "";
  //variables pour insertion bdd
  email = "";
  pwd = "";
  confirmPwd = "";

  signUp = () => {
    //Gestion des champs erronés :
    !this.email.length
      ? Alert.alert("Erreur", "Entrez une addresse e-mail svp")
      : Auth.createUserWithEmailAndPassword(this.email, this.pwd)
          .then(user => {
            //Insertion bdd :
            this.props.navigation.navigate("SignUp_Options", {
              email: this.email,
              pwd: md5(this.pwd).toString()
            });
          })
          .catch(error =>
            // Il faudra modifier le message d'erreur pour rester cohérent
            Alert.alert("Erreur", error.toString())
          );
  };

  signIn = () => {
    this.props.navigation.navigate("SignIn");
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior="padding"
          keyboardVerticalOffset={88}
        >
          <ScrollView contentContainerStyle={styles.form}>
            <TouchableOpacity
              style={[styles.btn, styles.btnSecondary]}
              onPress={this.signIn}
            >
              <Text style={styles.btnSecondaryLb}>Je suis déjà un hacker</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnFb]}>
              <Ionicons
                name="logo-facebook"
                color="#3b5998"
                size={20}
                style={{ marginRight: 10 }}
              />
              <Text style={styles.btnFbLb}>Hacker Facebook</Text>
            </TouchableOpacity>
            <Text style={styles.h2}>Mes informations (cryptées)</Text>

            <View>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                onSubmitEditing={({ nativeEvent }) => {
                  if (!!nativeEvent.text) this.refpwd.focus();
                }}
                onChangeText={text => (this.email = text)}
                returnKeyType="next"
                placeholder="an@nymo.us"
                placeholderTextColor="#555"
                keyboardAppearance="dark"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                enablesReturnKeyAutomatically
              />
            </View>
            <View>
              <Text style={styles.label}>Mot de passe</Text>
              <TextInput
                style={styles.input}
                ref={ref => {
                  this.refpwd = ref;
                }}
                onSubmitEditing={({ nativeEvent }) => {
                  if (!!nativeEvent.text) this.refcpwd.focus();
                }}
                secureTextEntry
                onChangeText={text => (this.pwd = text)}
                returnKeyType="next"
                placeholder="Les dés sont jetés"
                placeholderTextColor="#555"
                keyboardAppearance="dark"
                autoCapitalize="none"
                keyboardType="default"
                textContentType="password"
                enablesReturnKeyAutomatically
              />
            </View>
            <View>
              <Text style={styles.label}>Confirmer le mot de passe</Text>
              <TextInput
                style={styles.input}
                ref={ref => {
                  this.refcpwd = ref;
                }}
                onSubmitEditing={({ nativeEvent }) => {
                  if (!!nativeEvent.text) this.signUp();
                }}
                secureTextEntry
                onChangeText={text => (this.confirmPwd = text)}
                returnKeyType="go"
                placeholder="Hasta la vista baby"
                placeholderTextColor="#555"
                keyboardAppearance="dark"
                autoCapitalize="none"
                keyboardType="default"
                enablesReturnKeyAutomatically
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <TouchableOpacity style={styles.btnPrimary} onPress={this.signUp}>
          <Text style={styles.btnPrimaryLb}>Continuer</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

// const primaryColor = "#ff09a3";
const primaryColor = "lime";
const black = "black";
const fb = "#3b5998";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black
  },
  keyboardAvoidingView: {
    flex: 1
  },
  form: {
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
  dateInput: {
    borderColor: primaryColor,
    borderStyle: "solid",
    width: 280,
    height: 40
    // fontFamily: "source-code-pro",
    // color: primaryColor
  },
  btnPrimary: {
    backgroundColor: primaryColor,
    borderRadius: 5,
    padding: 15,
    marginTop: 15
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
  btnFb: {
    flexDirection: "row",
    // backgroundColor: "#3b5998",
    padding: 13,
    borderColor: fb,
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15
  },
  btnFbLb: {
    textAlign: "center",
    textTransform: "uppercase",
    color: fb
  }
});
