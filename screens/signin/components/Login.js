/* Regular log in on an app, not web. */
import React, { useState, useRef, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginFormWrapper from './LoginFormWrapper';
import AppContext from '../../../data/AppContext';
import { firebase } from '../../../data/firebase';
import "firebase/firestore";
import "firebase/auth";

function Login({ navigation }) {

    const firestore = firebase.firestore();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setUser, setUID, platform } = useContext(AppContext);

    const textInputBackground = 'rgba(255, 255, 255, 0.2)';
    const textInputHeight = 45;
    const spacing = 15;

    function loginUser() {
       //console.log("loginUser");
       //console.log("email: ###" + email + "###");
       //console.log("password: ###" + password + "###  type: " + (typeof password));
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
               //console.log("logged in");
                var uid = userCredential.user.uid;
                firestore.collection('User-Profile').doc(uid).get().then((doc) => {
                    if (doc.exists) {
                        setUser(doc.data().userName);
                        setUID(uid);
                        /* checking for web vs. app is unnecessary here */
                        navigation.navigate((platform === "web" ? "WebMain" : "Main"), { uid: uid });
                        try {
                            AsyncStorage.setItem('@logger:key', uid);
                        }
                        catch(error) {
                           //console.log("Error saving login info: " + error);
                        }
                    }
                    else {
                       //console.log("No such document!");
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
                }}>
                <TextInput
                    style={{
                        fontSize: 18,
                        borderBottomColor: 'rgba(255, 255, 255, 0.5)',
                        color: 'white',
                        justifyContent: 'center',
                        paddingHorizontal: 13,
                        height: textInputHeight,
                        borderRadius: 10,
                        backgroundColor: textInputBackground
                    }}
                    onChangeText={setEmail}
                    placeholder="Email"
                    placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                    keyboardType="email-address"
                />
                <TextInput
                    style={{
                        fontSize: 18,
                        borderBottomColor: 'rgba(255, 255, 255, 0.5)',
                        color: 'white',
                        justifyContent: 'center',
                        paddingHorizontal: 13,
                        height: textInputHeight,
                        marginTop: spacing,
                        borderRadius: 10,
                        backgroundColor: textInputBackground
                    }}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    placeholder="Password"
                    placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                />
            </View>
        )
    }

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
                    backgroundColor: "#83F52C",
                    borderRadius: 10,
                }}>
                <Text
                    style={{
                        fontSize: 20,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        marginVertical: 10
                    }}>
                    Login
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login;