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
  refsurname = "";
  reffname = "";
  refbday = "";
  //variables pour insertion bdd
  email = this.props.navigation.getParam("email");
  fname = "";
  lname = "";
  bday = "";
  //pwd = this.props.getParam("pwd");
  confirmPwd = "";

  _dirSignUpOption = () => {
    this.props.navigation.navigate("SignUp_3", {
      email: "Mum@mo.fr"
    });
  };

  _addDB = (bday, fname, lname) => {
    DB.collection("users").add({
      bday: bday,
      email: this.props.navigation.getParam("email"),
      fname: fname,
      lname: lname,
      nickname: "apres",
      phone: "apres",
      pwd: this.props.navigation.getParam("pwd")
    });
  };
  _signUp = () => {
    //this._dirSignUpOption()
    //return
    //Gestion des champs erronés :
    this.bday === undefined
      ? Alert.alert("Erreur", "Entrez une date de naissance valide ")
      : this._addDB(this.bday, this.fname, this.lname);
    this.props.navigation.navigate("SignUp_3", {"email":this.email});
  };

  _signIn = () => {
    this.props.navigation.navigate("SignIn");
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={100}
          >
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
              <Text style={styles.label}>Prénom</Text>
              <TextInput
                style={styles.input}
                ref={ref => {
                  this.reffname = ref;
                }}
                onSubmitEditing={() => {
                  this.refsurname.focus();
                }}
                blurOnSubmit={false}
                onChangeText={text => (this.fname = text)}
                returnKeyType="next"
                placeholder="Mickael"
                placeholderTextColor="#555"
                keyboardAppearance="dark"
                keyboardType="default"
              />
            </View>
            <View>
              <Text style={styles.label}>Nom</Text>
              <TextInput
                style={styles.input}
                ref={ref => {
                  this.refsurname = ref;
                }}
                //onSubmitEditing={() => this.refbday.focus()}
                blurOnSubmit={false}
                onChangeText={text => (this.lname = text)}
                returnKeyType="next"
                placeholder="Vendetta"
                placeholderTextColor="#555"
                keyboardAppearance="dark"
                keyboardType={"default"}
              />
            </View>
            <View>
              <Text style={styles.label}>Temporalité de naissance</Text>
              <DatePicker
                ref={ref => {
                  this.refbday = ref;
                }}
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
                  this.bday = date;
                  this.setState({ date: date });
                }}
              />
            </View>
          </KeyboardAvoidingView>

          <TouchableOpacity style={styles.btnPrimary} onPress={this._signUp}>
            <Text style={styles.btnPrimaryLb}>Devenir un hacker</Text>
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
