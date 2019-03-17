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
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Auth } from "../data/Database";
import { DB } from "../data/Database";

export default class SignUp extends React.Component {
  email = undefined;
  fname = undefined;
  lname = undefined;
  bday = undefined;
  pwd = undefined;
  confirmPwd = undefined;

  currentInput = 0;

  inputsRefs = [];

  _signUp = () => {
    //Gestion des champs erronés :

    //Insertion bdd :
    var addDoc = DB.collection("users")
      .add({
        bday: this.bday,
        email: this.email,
        fname: this.fname,
        lname: this.lname,
        nickname: "apres",
        phone: "apres",
        pwd: this.pwd,
        sex: "0"
      })
      .then(ref => {
        console.log("Added document with ID: ", ref.id);
      });
    //Insertion base authentification
    Auth.createUserWithEmailAndPassword(this.email, this.pwd)
      .then(() => this.props.navigation.navigate("RecentMessages"))
      .catch(error => Alert.alert(error));
  };

  _signIn = () => {
    this.props.navigation.navigate("SignIn");
  };

  onRef = ref => {
    this.inputsRefs.push(ref);
  };

  goNext = () => {
    this.inputsRefs[this.currentInput + 1].focus();
  };

  submit = () => {};

  inputs = [
    {
      label: "Adresse email",
      name: "email",
      type: "email-address",
      capitalize: "none",
      placeholder: "an@nymo.us"
    },
    {
      label: "Prénom",
      name: "fname",
      type: "default",
      capitalize: "words",
      placeholder: "Mickaël"
    },
    {
      label: "Nom",
      name: "lname",
      type: "default",
      capitalize: "words",
      placeholder: "Vendetta"
    },
    {
      label: "Date de naissance",
      name: "bday",
      type: "default",
      capitalize: "sentences",
      placeholder: "11/09/2001"
    },
    {
      label: "Mot de passe",
      name: "pwd",
      type: "password",
      capitalize: "none",
      placeholder: "Les dés sont jetés"
    },
    {
      label: "Confirmer le mot de passe",
      name: "confirmPwd",
      type: "password",
      capitalize: "none",
      placeholder: "Hasta la vista baby"
    }
  ];

  renderInput = (input, index, arr) => (
    <View key={index}>
      <Text style={styles.label}>{input.label}</Text>
      <TextInput
        style={styles.input}
        ref={this.onRef}
        onFocus={() => (this.currentInput = index)}
        onChangeText={text => (this[input.name] = text)}
        returnKeyType={index === arr.length - 1 ? "go" : "next"}
        onEndEditing={index === arr.length - 1 ? this.submit : this.goNext}
        // blurOnSubmit={index === arr.length - 1}
        placeholder={input.placeholder}
        placeholderTextColor="#555"
        keyboardAppearance="dark"
        keyboardType={input.type === "email-address" ? input.type : "default"}
      />
    </View>
  );

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <KeyboardAvoidingView behavior="position">
            <TouchableOpacity
              style={[styles.btn, styles.btnSecondary]}
              onPress={this._signIn}
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

            {this.inputs.map(this.renderInput)}

            <TouchableOpacity style={styles.btnPrimary} onPress={this._signUp}>
              <Text style={styles.btnPrimaryLb}>Devenir un hacker</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

// const primaryColor = "#ff09a3";
const primaryColor = "lime";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  scrollContainer: {
    // flex: 1,
    alignItems: "center",
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: "black"
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
    color: "black"
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
    borderColor: "#3b5998",
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
    color: "#3b5998"
  }
});
