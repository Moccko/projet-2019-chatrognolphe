import firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyDu_tPTzHOHugO6AWodMU5FzNlDOAhtdiM",
    authDomain: "chatrognolphe.firebaseapp.com",
    databaseURL: "https://chatrognolphe.firebaseio.com",
    projectId: "chatrognolphe",
    storageBucket: "chatrognolphe.appspot.com",
    messagingSenderId: "1023436607635"
};

firebase.initializeApp(config);

export default firebase.firestore();