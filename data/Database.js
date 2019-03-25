import firebase from "firebase";
import "firebase/firestore";

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDu_tPTzHOHugO6AWodMU5FzNlDOAhtdiM",
  authDomain: "chatrognolphe.firebaseapp.com",
  databaseURL: "https://chatrognolphe.firebaseio.com",
  projectId: "chatrognolphe",
  storageBucket: "chatrognolphe.appspot.com",
  messagingSenderId: "1023436607635"
});

module.exports = {
  DB: firebase.firestore(),
  Admin: firebase.firestore,
  Auth: firebase.auth()
};
