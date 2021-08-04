import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import PopupWrapper from './PopUpWrapper';
import AppContext from '../../../data/AppContext';
import { firebase } from '../../../data/firebase';
import "firebase/firestore";
import "firebase/auth";

function SignUp({ navigation }) {

    const firestore = firebase.firestore();

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setUser, setUID } = useContext(AppContext);

    const textInputBackground = 'rgba(255, 255, 255, 0.2)';
    const textInputHeight = 45;
    const spacing = 15;

    function createUser() {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log("user created");
                var data = {
                    userName: userName,
                    email: email,
                    password: password,
                    followersCount: 0,
                    followingCount: 0,
                    timestamp: new Date() / 1000,
                    userDescription: "🌱",
                    userImageURL: "https://pbs.twimg.com/profile_images/634514155261833216/czgYrPLQ_400x400.jpg",
                }
                console.log("!!!signed in currently with uid: " + firebase.auth().currentUser.uid + " === " + userCredential.user.uid);
                firestore.collection("User-Profile").doc(userCredential.user.uid).set(data).then(() => { });
                setUser(userName);
                setUID(firebase.auth().currentUser.uid);
                getTimeline();
                navigation.navigate("Main", { user: userName });
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

    const renderUpInputs = () => {
        return (
            <View
                style={{
                    marginTop: 65,
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
                    onChangeText={setUserName}
                    placeholder="Username"
                    placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
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
        <PopupWrapper>
            {renderUpInputs()}
            <TouchableOpacity
                onPress={() => {
                    createUser();
                }}
                style={{
                    width: "100%",
                    marginTop: 2 * spacing,
                    backgroundColor: "#83F52C",
                    borderRadius: 10
                }}>
                <Text
                    style={{
                        fontSize: 20,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        marginVertical: 10
                    }}>
                    Sign Up
                </Text>
            </TouchableOpacity>
        </PopupWrapper>
    )
}

export default SignUp