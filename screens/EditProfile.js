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
  Image,
  Keyboard
} from "react-native";
import SvgUri from "expo-svg-uri";
import { DB } from "../data/Database";
import { connect } from "react-redux";

class EditProfile extends React.Component {
  tel_ref = undefined;
  aboutMe_ref = undefined;

  constructor(props) {
    super(props);

    const { currentUser } = props;

    if (currentUser) {
      this.nickname = currentUser.nickname ?? "";
      this.phone = currentUser.phone ?? "";
      this.about_me = currentUser.about_me ?? "";
    }

    this.state = {
      avatar: currentUser
        ? currentUser.avatar
        : "https://avatars.dicebear.com/v2/male/.svg"
    };
  }

  storeUser = () => {
    this.userRef
      .set(
        {
          nickname: this.nickname,
          phone: this.phone,
          about_me: this.about_me,
          avatar: this.state.avatar
        },
        { merge: true }
      )
      .then(async () => {
        const newUser = await this.userRef.get();
        this.props.dispatch({
          type: "LOG_IN",
          value: {
            id: newUser.id,
            ref: newUser.ref,
            ...newUser.data()
          }
        });
      });
  };

  signUp = async () => {
    const { currentUser, navigation } = this.props;

    if (currentUser) {
      const usersRef = DB.collection("users");
      this.userRef = (await usersRef.doc(currentUser.id).get()).ref;
    } else {
      this.userRef = navigation.getParam("user");
    }

    this.storeUser();
  };

  updateAvatar = text => {
    this.setState({
      avatar: `https://avatars.dicebear.com/v2/male/${text}.svg`
    });
    this.nickname = text;
  };

  render() {
    const { currentUser } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={"padding"}
          keyboardVerticalOffset={88}
        >
          <ScrollView contentContainerStyle={styles.form}>
            <View style={styles.imageContainer}>
              <SvgUri
                width="150"
                height="150"
                source={{ uri: this.state.avatar }}
              />
            </View>

            <View>
              <Text style={styles.label}>Mon surnom</Text>
              <TextInput
                style={styles.input}
                onChangeText={this.updateAvatar}
                defaultValue={currentUser && currentUser.nickname}
                returnKeyType="next"
                onSubmitEditing={({ nativeEvent }) => {
                  if (!!nativeEvent.text) this.tel_ref.focus();
                }}
                autoCapitalize="none"
                placeholder="an@nymo.us"
                placeholderTextColor="#555"
                keyboardAppearance="dark"
                keyboardType="email-address"
                textContentType="username"
                enablesReturnKeyAutomatically
              />
            </View>
            <View>
              <Text style={styles.label}>Numéro de cellulaire</Text>
              <TextInput
                style={styles.input}
                ref={ref => (this.tel_ref = ref)}
                onChangeText={text => (this.phone = text)}
                defaultValue={currentUser && currentUser.phone}
                onSubmitEditing={({ nativeEvent }) => {
                  if (!!nativeEvent.text) this.aboutMe_ref.focus();
                }}
                returnKeyType="next"
                placeholder="Tu devineras jamais"
                placeholderTextColor="#555"
                keyboardAppearance="dark"
              />
            </View>
            <View>
              <Text style={styles.label}>À propos de moi-même</Text>
              <TextInput
                onChangeText={text => (this.about_me = text)}
                defaultValue={currentUser && currentUser.about_me}
                ref={ref => (this.aboutMe_ref = ref)}
                returnKeyType="go"
                style={styles.input}
                placeholder="Je suis un artichaut chaud chaud"
                placeholderTextColor="#555"
                keyboardAppearance="dark"
                onSubmitEditing={this.signUp}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <TouchableOpacity style={styles.btnPrimary} onPress={this.signUp}>
          <Text style={styles.btnPrimaryLb}>Devenir un hacker</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const primaryColor = "lime";
const black = "black";
//const fb =  "#3b5998" ;

const mapStateToProps = state => ({
  currentUser: state.user
});

export default connect(mapStateToProps)(EditProfile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black
  },
  keyboardAvoidingView: {
    flex: 1
  },
  form: {
    paddingLeft: 25,
    paddingRight: 25,
    alignItems: "center",
    justifyContent: "center"
  },
  imageContainer: {
    alignItems: "center"
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
  }
});
