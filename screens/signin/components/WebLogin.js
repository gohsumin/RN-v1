import React, { useState, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../../../data/AppContext';
import styled from 'styled-components/native';
import { firebase } from '../../../data/firebase';
import "firebase/firestore";
import "firebase/auth";

function WebLogin({ navigation }) {

    const firestore = firebase.firestore();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const { setUser, setUID, platform } = useContext(AppContext);

    const textInputFocusBackground = 'rgba(255, 255, 255, 0.2)';
    const textInputBlurBackground = 'rgba(255, 255, 255, 0.07)';
    const textInputHeight = 45;
    const spacing = 15;

    function loginUser() {
        console.log("loginUser");
        console.log("email: ###" + email + "###");
        console.log("password: ###" + password + "###  type: " + (typeof password));
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log("logged in");
                var uid = userCredential.user.uid;
                firestore.collection('User-Profile').doc(uid).get().then((doc) => {
                    if (doc.exists) {
                        setUser(doc.data().userName);
                        setUID(uid);
                        console.log("trying to navigate...");
                        navigation.navigate("WebMain", { uid: uid });
                        try {
                            AsyncStorage.setItem('@logger:key', uid);
                        }
                        catch(error) {
                            console.log("Error saving login info: " + error);
                        }
                    }
                    else {
                        console.log("No such document!");
                    }
                }).catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    Alert.alert(
                        "Please try again:",
                        errorMessage,
                        [{
                            text: "Okay",
                            onPress: () => { }
                        }])
                });
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                Alert.alert(
                    "Please try again:",
                    errorMessage,
                    [{
                        text: "Okay",
                        onPress: () => { }
                    }])
            });
    }

    const renderInInputs = () => {
        return (
            <View
                style={{
                    alignSelf: 'center',
                    alignContent: 'center',
                    width: "100%",
                    height: 2 * textInputHeight + spacing,
                    justifyContent: 'space-between'
                }}>
                <TextInput
                    style={[styles.textInput,
                    {
                        backgroundColor: emailFocus ?
                            textInputFocusBackground : textInputBlurBackground
                    }]}
                    height={textInputHeight}
                    onFocus={() => { setEmailFocus(true); }}
                    onBlur={() => { setEmailFocus(false); }}
                    onChangeText={setEmail}
                    placeholder="Email"
                    placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                    keyboardType="email-address"
                />
                <TextInput
                    style={[styles.textInput,
                    {
                        backgroundColor: passwordFocus ?
                            textInputFocusBackground : textInputBlurBackground
                    }]}
                    height={textInputHeight}
                    secureTextEntry={true}
                    onFocus={() => { setPasswordFocus(true); }}
                    onBlur={() => { setPasswordFocus(false); }}
                    onChangeText={setPassword}
                    placeholder="Password"
                    placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                />
            </View>
        )
    }

    const styles = StyleSheet.create({
        textInput: {
            fontSize: 18,
            borderRadius: 5,
            borderBottomColor: 'rgba(255, 255, 255, 0.2)',
            borderBottomWidth: 0.1,
            color: 'white',
            justifyContent: 'center',
            paddingHorizontal: 13,
            height: textInputHeight,
        },
    })

    return (
        <View style={{
            // borderWidth: 1,
            // borderColor: 'pink'
        }}>
            {renderInInputs()}
            <TouchableOpacity
                onPress={() => {
                    loginUser();
                }}
                style={{
                    width: "100%",
                    marginTop: 2 * spacing,
                    backgroundColor: email !== "" && password !== "" ? "#6ccc23" : "#84b360",
                    borderRadius: 5,
                }}>
                <Text
                    style={{
                        fontSize: 24,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        marginVertical: 16
                    }}>
                    Login
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default WebLogin;
