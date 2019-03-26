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

  email = "";
  fname = "";
  lname = "";
  bday = "";
  pwd = "";
  confirmPwd = "";
  currentInput = 0;
  //Tableau contenant les refs
  inputsRefs = [];

  _signUp = () => {
    //Gestion des champs erronés :
    !this.email.length
      ? Alert.alert("Erreur", "Entrez une addresse e-mail vailde")
      : console.log(this.email);
    this.bday === undefined
      ? Alert.alert("Erreur", "Entrez une date de naissance, svp ")
      : Auth.createUserWithEmailAndPassword(this.email, this.pwd)
          .then(() => {
            //Insertion bdd :
            DB.collection("users").add({
              bday: this.bday,
              email: this.email,
              fname: this.fname,
              lname: this.lname,
              nickname: "apres",
              phone: "apres",
              pwd: this.pwd,
              sex: "0"
            });
            this.props.navigation
              .navigate("SignUp_Option", {
                email: this.email
              })
              .then(ref => {
                console.log("Added document with ID: ", ref.id);
              });
          })
          .catch(error => Alert.alert("Erreur", error.toString()));
  };

  _signIn = () => {
    this.props.navigation.navigate("SignIn");
  };

  onRef = ref => {
    this.inputsRefs.push(ref);
  };

  goNext = () => {
    this.currentInput++;
    this.inputsRefs[this.currentInput].focus();
  };

  submit = () => {};

  inputs = [
    {
      label: "Adresse email",
      name: "email",
      type: "email-address",
      capitalize: "none",
      placeholder: "an@nymo.us"
      //id : 0,
    },
    {
      label: "Prénom",
      name: "fname",
      type: "default",
      capitalize: "words",
      placeholder: "Mickaël"
      //id : 1,
    },
    {
      label: "Nom",
      name: "lname",
      type: "default",
      capitalize: "words",
      placeholder: "Vendetta"
      //id : 2,
    },
    {
      label: "Date de naissance",
      name: "bday",
      type: "date",
      capitalize: "sentences",
      placeholder: "Choisis ta temporalité"
      //id : 3,
    },
    {
      label: "Mot de passe",
      name: "pwd",
      type: "password",
      capitalize: "none",
      placeholder: "Les dés sont jetés"
      //id : 4,
    },
    {
      label: "Confirmer le mot de passe",
      name: "confirmPwd",
      type: "password",
      capitalize: "none",
      placeholder: "Hasta la vista baby"
      //id : 5,
    }
  ];

  renderInput = (input, index, arr) =>
    input.type === "date" ? (
      <View key={index}>
        <Text style={styles.label}>{input.label}</Text>
        <DatePicker
          ref={this.onRef}
          style={styles.dateInput}
          showIcon={true}
          date={this.state.date} //initial date from state
          mode="date" //The enum of date, datetime and time
          format="DD-MM-YYYY"
          minDate="01-01-1901"
          maxDate="01-01-2100"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={date => {
            this[input.name] = date;
            this.setState({ date: date });
            this.goNext();
          }}
        />
      </View>
    ) : (
      <View key={index}>
        <Text style={styles.label}>{input.label}</Text>
        <TextInput
          style={styles.input}
          ref={this.onRef}
          //ref={this.onRef(input.id)}
          onFocus={() => (this.currentInput = index)}
          onChangeText={text => (this[input.name] = text)}
          //returnKeyType={index === arr.length - 1 ? "go" : "next"}
          returnKeyType={index === this.inputs.length - 1 ? "go" : "next"}
          //onEndEditing={index === arr.length - 1 ? this._signUp : this.goNext}
          onEndEditing={
            index === this.inputs.length - 1 ? this._signUp : this.goNext
          }
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
            {console.log("refs=", this.inputsRefs)}
            {console.log("current input=", this.currentInput)}
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
