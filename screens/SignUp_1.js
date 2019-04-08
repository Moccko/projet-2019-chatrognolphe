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

import DatePicker from "react-native-datepicker";

import { Auth, DB } from "../data/Database";

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

  _dirSignUpOption = () => {
    this.props.navigation.navigate("SignUp_3", {
      email: "Mum@mo.fr"
    });
  };

  _signUp = () => {
    //this._dirSignUpOption()
    //return

    //Gestion des champs erronés :
    !this.email.length
      ? Alert.alert("Erreur", "Entrez une addresse e-mail svp")
      : Auth.createUserWithEmailAndPassword(this.email, this.pwd)
          .then(() => {
            //Insertion bdd :
            this.props.navigation.navigate("SignUp_2", {
              email: this.email,
              pwd: this.pwd
            });
          })
          .catch(error =>
            // Il faudra modifier le message d'erreur pour rester cohérent
            Alert.alert("Erreur", error.toString())
          );
  };

  _signIn = () => {
    this.props.navigation.navigate("SignIn");
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={100}>
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

          <View>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              onSubmitEditing={() => {
                this.refpwd.focus();
              }}
              blurOnSubmit={false}
              onChangeText={text => (this.email = text)}
              returnKeyType="next"
              placeholder="an@nymo.us"
              placeholderTextColor="#555"
              keyboardAppearance="dark"
              keyboardType="default"
            />
          </View>
          <View>
            <Text style={styles.label}>Mot de passe</Text>
            <TextInput
              style={styles.input}
              ref={ref => {
                this.refpwd = ref;
              }}
              onSubmitEditing={() => {
                this.refcpwd.focus();
              }}
              blurOnSubmit={false}
              onChangeText={text => (this.pwd = text)}
              returnKeyType="next"
              placeholder="Les dés sont jetés"
              placeholderTextColor="#555"
              keyboardAppearance="dark"
              keyboardType="default"
            />
          </View>
          <View>
            <Text style={styles.label}>Confirmer le mot de passe</Text>
            <TextInput
              style={styles.input}
              ref={ref => {
                this.refcpwd = ref;
              }}
              onSubmitEditing={this._signUp}
              blurOnSubmit={false}
              onChangeText={text => (this.confirmPwd = text)}
              returnKeyType="go"
              placeholder="Hasta la vista baby"
              placeholderTextColor="#555"
              keyboardAppearance="dark"
              keyboardType="default"
            />
          </View>
          </KeyboardAvoidingView>
          <TouchableOpacity style={styles.btnPrimary} onPress={this._signUp}>
            <Text style={styles.btnPrimaryLb}>Continuer</Text>
          </TouchableOpacity>
        </ScrollView>
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
