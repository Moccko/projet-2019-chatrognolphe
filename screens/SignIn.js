import React from "react";
import {
  TouchableOpacity,
  Image,
  Alert,
  Text,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet
} from "react-native";
import { DB, Auth } from "../data/Database";
import md5 from "crypto-js/md5";
import { connect } from "react-redux";

class SignIn extends React.Component {
  username = "";
  password = "";
  pwdInput = undefined;

  _forgotPwd = () => {
    Alert.alert(
      "Vous avez oublié votre mot de passe ?",
      "Comment avez-vous pu ?!"
    );
  };

  storeUser = user => {
    const u = {
      id: user.id,
      ...user.data()
    };
    const action = { type: "LOG_IN", value: u };
    this.props.dispatch(action);
    this.props.navigation.navigate("RecentMessages");
  };

  _signIn = () => {
    DB.collection("users")
      .where("nickname", "==", this.username)
      .where("pwd", "==", this.password)
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          snapshot.forEach(this.storeUser);
        } else {
          DB.collection("users")
            .where("email", "==", this.username)
            .where("pwd", "==", this.password)
            .get()
            .then(snapshot => {
              if (!snapshot.empty) snapshot.forEach(this.storeUser);
              else Alert.alert("Erreur", "Utilisateur introuvable");
            });
        }
      });
  };

  _signUp = () => {
    this.props.navigation.navigate("SignUp_1");
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={100}>
          <Image
            source={require("../assets/images/catTyping.gif")}
            style={styles.image}
          />

          <Text style={styles.label}>Pseudo / email</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => (this.username = text.toLowerCase())}
            returnKeyType="next"
            onEndEditing={() => this.pwdInput.focus()}
            autoCapitalize="none"
            placeholder="an@nymo.us"
            placeholderTextColor="#555"
            keyboardAppearance="dark"
            keyboardType="email-address"
            textContentType="username"
          />

          <Text style={styles.label}>Mot de passe</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => (this.password = md5(text).toString())}
            secureTextEntry
            onEndEditing={this._signIn}
            returnKeyType="go"
            ref={ref => (this.pwdInput = ref)}
            placeholder="Incrackable"
            placeholderTextColor="#555"
            keyboardAppearance="dark"
            textContentType="password"
          />

          <TouchableOpacity onPress={this._forgotPwd}>
            <Text style={styles.forgotPwd}>Mot de passe oublié ?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signIn} onPress={this._signIn}>
            <Text style={styles.signInLabel}>Entrer dans la matrice</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signUp} onPress={this._signUp}>
            <Text style={styles.signUpLabel}>Devenir un hacker</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

export default connect()(SignIn);

// const primaryColor = "#ff09a3";
const primaryColor = "lime";
const black = "black";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center"
  },
  label: {
    fontSize: 15,
    marginTop: 15,
    marginBottom: 5,
    color: primaryColor,
    fontFamily: "source-code-pro"
  },
  input: {
    borderColor: primaryColor,
    color: primaryColor,
    fontFamily: "source-code-pro",
    borderBottomWidth: 1,
    borderStyle: "solid",
    width: 280,
    height: 40
  },
  forgotPwd: {
    color: primaryColor,
    textAlign: "center",
    padding: 10,
    fontFamily: "source-code-pro"
  },
  signIn: {
    backgroundColor: primaryColor,
    borderRadius: 5,
    padding: 15,
    marginTop: 15,
    marginBottom: 5
  },
  signInLabel: {
    textAlign: "center",
    // color: "white",
    textTransform: "uppercase",
    fontFamily: "source-code-pro"
  },
  signUp: {
    // backgroundColor: "#fff",
    borderRadius: 5,
    padding: 13,
    borderColor: primaryColor,
    borderStyle: "solid",
    borderWidth: 2
  },
  signUpLabel: {
    textAlign: "center",
    color: primaryColor,
    textTransform: "uppercase",
    fontFamily: "source-code-pro"
  }
});
