import React from 'react';
import {View, TouchableOpacity, Image, Text, TextInput, StyleSheet} from 'react-native';

// import DB from '../data/Database';

export default class SignIn extends React.Component {

    state = {
        username: '',
        password: ''
    };

    _forgotPwd = () => {
        console.log('mdp oublié');
    };

    _signIn = () => {
        console.log('clic');
        // DB.collection('users');
    };

    _signUp = () => {
        console.log('sign up');
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Connexion</Text>
                <Image source={{uri: "https://media.giphy.com/media/o0vwzuFwCGAFO/giphy.gif"}} style={styles.image}/>
                <Text style={styles.label}>Pseudo / email / téléphone</Text>
                <TextInput style={styles.input} value={this.state.username} onEndEditing={this._signIn}/>

                <Text style={styles.label}>Mot de passe</Text>
                <TextInput style={styles.input} value={this.state.password} onEndEditing={this._signIn}/>

                <TouchableOpacity onPress={this._forgotPwd}>
                    <Text style={styles.forgotPwd}>Mot de passe oublié ?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.signIn} onPress={this._signIn}>
                    <Text style={styles.signInLabel}>CONNEXION</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.signUp} onPress={this._signUp}>
                    <Text style={styles.signUpLabel}>S'INSCRIRE</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const primaryColor = "#ff09a3";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    title: {
        textAlign: "center",
        margin: 20,
        fontSize: 36
    },
    image: {
        width: 200,
        height: 200,
        alignSelf: "center",
    },
    label: {
        fontSize: 15,
        marginTop: 15,
        marginBottom: 5,
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
        padding: 10,
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
        color: "white"
    },
    signUp: {
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 13,
        borderColor: primaryColor,
        borderStyle: "solid",
        borderWidth: 2
    },
    signUpLabel: {
        textAlign: "center",
        color: primaryColor
    },
});