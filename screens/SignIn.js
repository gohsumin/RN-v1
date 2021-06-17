import React, { Component, useContext, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import AppContext from '../data/AppContext'
/* import gmailApi from "react-api"; */
import { useEffect } from 'react/cjs/react.development';

/* global gapi */

function createScriptTag() {
    const el1 = document.createElement("script");
    el1.src = "https://apis.google.com/js/api.js";
    el1.onload = () => {
        gapi.load('client:auth2', () => {
            gapi.auth2.init({ client_id: "342162757131-ltcjavnkgijv5f96e7jbhqbtd0m1jg2g.apps.googleusercontent.com" });
        });
    };
    document.head.appendChild(el1);
}

function SignIn({ navigation }) {


    createScriptTag();

    const { user, setUser, theme } = useContext(AppContext);

    /* const [sign, setSign] = useState(gmailApi.sign); 

    function signUpdate(sign) {
        setSign(sign);
    }

    useEffect(() => {
        gmailApi.listenSign(signUpdate);
    }, []);*/

    function authenticate() {
        return window.gapi.auth2.getAuthInstance()
            .signIn({ scope: "https://mail.google.com/ https://www.googleapis.com/auth/gmail.readonly" })
            .then(function (r) {
                console.log("Sign-in successful", r);

            },
                function (err) { console.error("Error signing in", err); });
    }
    function loadClient() {
        window.gapi.client.setApiKey("xLa_tAN5z9GCCUIGorIqopBb");
        return window.gapi.client.load("https://gmail.googleapis.com/$discovery/rest?version=v1")
            .then(function () {
                console.log("GAPI client loaded for API");
            },
                function (err) { console.error("Error loading GAPI client for API", err); });
    }

/*     function handleSignIn() {
        gmailApi.handleSignIn().then(() => {
            console.log("handleSignIn");
        });
    } */

    return (
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
                <TouchableOpacity onPress={() => {
                    //handleSignIn();
                    authenticate().then(loadClient);
                }}>
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

        </View>
    )
}

export default SignIn;