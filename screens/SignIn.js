import React, { Component, useContext, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import AppContext from '../data/AppContext';
import { useEffect } from 'react/cjs/react.development';
import * as Google from 'expo-google-app-auth';
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import HTML from "react-native-render-html";

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

const auth = firebase.auth();
const firestore = firebase.firestore();

/* global gapi */

/* function createScriptTag() {
    const el1 = document.createElement("script");
    el1.src = "https://apis.google.com/js/api.js";
    el1.onload = () => {
        gapi.load('client:auth2', () => {
            gapi.auth2.init({ client_id: "342162757131-ltcjavnkgijv5f96e7jbhqbtd0m1jg2g.apps.googleusercontent.com" });
        });
    };
    document.head.appendChild(el1);
} */

var provider = new firebase.auth.PhoneAuthProvider();

firebase.auth().settings.appVerificationDisabledForTesting = true;

var phoneNumber = "+16505554567";
var testVerificationCode = "123456";

function SignIn({ navigation }) {

    useEffect(() => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(this.recaptcha, {
            'size': 'normal',
            'callback': function (response) {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // ...
            },
            'expired-callback': function () {
                // Response expired. Ask user to solve reCAPTCHA again.
                // ...
            }
        });
        window.recaptchaVerifier.render().then(function (widgetId) {
            window.recaptchaWidgetId = widgetId;
        })
        provider.verifyPhoneNumber(phoneNumber, applicationVerifier).then((verificationId) => {
            var p = firebase.auth.PhoneAuthProvider.credential(verificationId, "123456");

            const phoneNumber = getPhoneNumberFromUserInput();
            const appVerifier = window.recaptchaVerifier;
            firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
                .then((confirmationResult) => {
                    // SMS sent. Prompt user to type the code from the message, then sign the
                    // user in with confirmationResult.confirm(code).
                    window.confirmationResult = confirmationResult;
                    // ...
                }).catch((error) => {
                    // Error; SMS not sent
                    // ...
                });
        });
    }, []);

    const signInAsync = async () => {
        console.log("LoginScreen.js 6 | loggin in");
        try {
            const { type, accessToken, user, refreshToken, idToken } = await Google.logInAsync({
                iosClientId: "342162757131-c1p9md1c4eckqg10u0e1c7dfsdbi9qbf.apps.googleusercontent.com",
                androidClientId: "342162757131-ltcjavnkgijv5f96e7jbhqbtd0m1jg2g.apps.googleusercontent.com",
                scopes: ['https://www.googleapis.com/auth/gmail.readonly']
            });
            if (type === 'success') {
                console.log("access token for user with " + user.email + ": " + accessToken);
                console.log("refreshToken: " + refreshToken);
                console.log("idToken: " + idToken);

                var yu = firebase.collection("UserBase").doc(auth.uid);
                yu.set({ "email": auth.email, "accessToken": accessToken }).then(() => { return; });
                //yu.update({}).then(() =>{return;}).catch(() => {return;});

                const temp = "luka";
                setUser(temp);
                navigation.navigate("Profile", { user: temp });
            }
        } catch (error) {
            console.log("LoginScreen.js 19 | ---", error);
        }
    };

    const { user, setUser, theme } = useContext(AppContext);

    const captchaDiv = '<div ref={(ref) => this.recaptcha = ref}></div>';

    return (
        <>
            <View style={{ flex: 1, backgroundColor: "black", padding: 25 }}>
                <Text style={{ flex: 1, color: '#ffccdd', paddingTop: 150, fontSize: 45, fontWeight: '600' }}>
                    See what your role models are buying.
                </Text>
                <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <TouchableOpacity style={{
                        paddingBottom: 18
                    }} onPress={() => {
                        /////
                        const user = "luka";
                        // this sets the user across the app, locally through a context
                        setUser(user);
                        navigation.navigate("Profile", { user: user });
                    }}>
                        <View style={{
                            width: "100%",
                            height: 50,
                            borderRadius: 30,
                            justifyContent: 'center',
                            backgroundColor: 'white',
                        }}>
                            <Text style={{ textAlign: 'center', color: 'black', fontSize: 20, fontWeight: '600' }}>
                                Sign Up with Phone
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={signInAsync}>
                        <View style={{
                            width: "100%",
                            height: 50,
                            borderRadius: 30,
                            justifyContent: 'center',
                            backgroundColor: '#196DFF'
                        }}>
                            <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, fontWeight: '600' }}>
                                Sign In
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <HTML source={{ html: captchaDiv }} contentWidth={70} />
            </View>
        </>
    )
}

export default SignIn;