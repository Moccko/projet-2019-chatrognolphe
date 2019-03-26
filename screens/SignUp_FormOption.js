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

import { Auth, DB } from "../data/Database";

export default class SignUp extends React.Component {
    render() {
        return ("")

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