import { firebase } from '@firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAUSNeT750wI-oDmpQm4AZcsYmZfc-ShSU",
    authDomain: "soshwrldinc.firebaseapp.com",
    projectId: "soshwrldinc",
    storageBucket: "soshwrldinc.appspot.com",
    messagingSenderId: "342162757131",
    appId: "1:342162757131:web:398ab17e13b560d8f0990e",
    measurementId: "G-JMPYGPX7P5"
};

if (firebase.app !== undefined && firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
else if (firebase === undefined) {
   console.log("firebase is undefined");
}
else {
   console.log("firebase.app is undefined");
    firebase.initializeApp(firebaseConfig);
}

const storageRef = firebase.storage().ref();

export { firebase, firebaseConfig, storageRef };