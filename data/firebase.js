//import firebase from "firebase/app";
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAUSNeT750wI-oDmpQm4AZcsYmZfc-ShSU",
    authDomain: "soshwrldinc.firebaseapp.com",
    projectId: "soshwrldinc",
    storageBucket: "soshwrldinc.appspot.com",
    messagingSenderId: "342162757131",
    appId: "1:342162757131:web:398ab17e13b560d8f0990e",
    measurementId: "G-JMPYGPX7P5"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase, firebaseConfig };