//TODO : Correct the next bug
import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class SignUp extends React.Component {
  email = undefined;
  fname = undefined;
  lname = undefined;
  bday = undefined;
  pwd = undefined;
  confirmPwd = undefined;

  currentInput = 0;

  inputsRefs = [];

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
      capitalize: "none"
    },
    {
      label: "Prénom",
      name: "fname",
      type: "default",
      capitalize: "words"
    },
    {
      label: "Nom",
      name: "lname",
      type: "default",
      capitalize: "words"
    },
    {
      label: "Date de naissance",
      name: "bday",
      type: "default",
      capitalize: "sentences"
    },
    {
      label: "Mot de passe",
      name: "pwd",
      type: "password",
      capitalize: "none"
    },
    {
      label: "Confirmer le mot de passe",
      name: "confirmPwd",
      type: "password",
      capitalize: "none"
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
        keyboardType={input.type === "email-address" ? input.type : "default"}
      />
    </View>
  );

  render() {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <Text style={styles.title}>Inscription</Text>
          <TouchableOpacity style={[styles.btn, styles.btnSecondary]}>
            <Text style={styles.btnSecondaryLb}>J'ai déjà un compte</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnFb]}>
            <Ionicons
              name="logo-facebook"
              color="white"
              size={20}
              style={{ marginRight: 10 }}
            />
            <Text style={styles.btnFbLb}>Se connecter avec facebook</Text>
          </TouchableOpacity>
          <Text style={styles.h2}>Mes informations</Text>

          {this.inputs.map(this.renderInput)}

          <TouchableOpacity style={styles.btnPrimary}>
            <Text style={styles.btnPrimaryLb}>Créer le compte</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const primaryColor = "#ff09a3";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    paddingLeft: 25,
    paddingRight: 25
  },
  title: {
    textAlign: "center",
    margin: 20,
    fontSize: 36
  },
  h2: {
    margin: 20,
    fontSize: 30
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center"
  },
  label: {
    fontSize: 15,
    marginTop: 15,
    marginBottom: 5
  },
  input: {
    borderColor: "black",
    borderBottomWidth: 1,
    borderStyle: "solid",
    width: 280,
    height: 40
  },
  forgotPwd: {
    color: primaryColor,
    textAlign: "center",
    padding: 10
  },
  btn: {
    margin: 3
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
    color: "white",
    textTransform: "uppercase"
  },
  btnSecondary: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 13,
    borderColor: primaryColor,
    borderStyle: "solid",
    borderWidth: 2
  },
  btnSecondaryLb: {
    textAlign: "center",
    color: primaryColor,
    textTransform: "uppercase"
  },
  btnFb: {
    flexDirection: "row",
    backgroundColor: "#3b5998",
    borderRadius: 5,
    padding: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  btnFbLb: {
    textAlign: "center",
    color: "white",
    textTransform: "uppercase"
  }
});
