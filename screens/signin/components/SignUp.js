import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import LoginFormWrapper from './LoginFormWrapper';
import AppContext from '../../../data/AppContext';
import { firebase, storageRef } from '../../../data/firebase';
import "firebase/compat/firestore";
import "firebase/compat/auth";
import defaultPic from "../../../assets/defaultProfilePicture.jpeg";

function SignUp({ navigation }) {

    const firestore = firebase.firestore();

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setUser, setUID, platform } = useContext(AppContext);

    const textInputBackground = 'rgba(255, 255, 255, 0.2)';
    const textInputHeight = 45;
    const spacing = 15;

    const uploadImage = async (uri, uid) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        var metadata = {
            contentType: 'image/jpeg',
        };
        var ref = storageRef.child("User-Profile-Images/" + uid + ".jpg");
        return ref.put(blob, metadata);
    }

    function createUser() {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                //console.log("user created");
                const newUID = firebase.auth().currentUser.uid;
                uploadImage(platform === "web" ? defaultPic : Image.resolveAssetSource(defaultPic).uri,
                    newUID).then(() => {
                        storageRef.child("User-Profile-Images/" + newUID + ".jpg")
                            .getDownloadURL().then((url) => {
                                //console.log("image url: " + url);
                                var data = {
                                    userName: userName,
                                    email: email,
                                    password: password,
                                    followersCount: 0,
                                    followingCount: 0,
                                    dateJoined: new Date() / 1000,
                                    userDescription: "🌱",
                                    userImageURL: url,
                                }
                                //console.log("!!!signed in currently with uid: " + newUID + " === " + userCredential.user.uid);
                                firestore.collection("User-Profile").doc(newUID).set(data).then(() => { });
                                setUser(userName);
                                setUID(newUID);
                                navigation.navigate((platform === "web" ? "WebMain" : "Main"), { user: userName });
                            })
                    });
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                //console.log(errorMessage);
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
        <View style={{
            marginTop: 50,
            marginHorizontal: 15,
        }}>
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
        </View>
    )
}

export default SignUp;