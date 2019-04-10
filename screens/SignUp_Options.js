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

export default class SignUp_Options extends React.Component {
  state = {
    date: new Date()
  };

  //variables pour les ref du premier render()
  refsurname = null;
  refbday = null;

  //variables pour insertion bdd
  email = this.props.navigation.getParam("email");
  fname = "";
  lname = "";
  bday = "";
  pwd = this.props.navigation.getParam("pwd");

  addDB = (bday, fname, lname) => {
    DB.collection("users")
      .add({
        email: this.email,
        bday,
        fname,
        lname,
        pwd: this.pwd
      })
      .then(user => {
        this.props.navigation.navigate("EditProfile", { user });
      });
  };

  signUp = () => {
    //Gestion des champs erronés :
    this.bday === undefined
      ? Alert.alert("Erreur", "Entrez une date de naissance valide ")
      : this.addDB(this.bday, this.fname, this.lname);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={100}
          >
            <Text style={styles.h2}>Mes informations (cryptées)</Text>

            <View>
              <Text style={styles.label}>Prénom</Text>
              <TextInput
                style={styles.input}
                onSubmitEditing={({ nativeEvent }) => {
                  if (!!nativeEvent.text) this.refsurname.focus();
                }}
                onChangeText={text => (this.fname = text)}
                returnKeyType="next"
                placeholder="Mickael"
                placeholderTextColor="#555"
                keyboardAppearance="dark"
                keyboardType="default"
                enablesReturnKeyAutomatically
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
                onChangeText={text => (this.lname = text)}
                returnKeyType="next"
                placeholder="Vendetta"
                placeholderTextColor="#555"
                keyboardAppearance="dark"
                keyboardType="default"
                enablesReturnKeyAutomatically
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
                format="YYYY-MM-DD"
                minDate="1901-01-01"
                maxDate="2100-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={date => {
                  this.bday = date;
                  this.setState({ date: date });
                }}
              />
            </View>
          </KeyboardAvoidingView>

          <TouchableOpacity style={styles.btnPrimary} onPress={this.signUp}>
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
