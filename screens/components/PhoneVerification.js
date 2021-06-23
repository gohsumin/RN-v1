import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    Platform,
    Alert
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeycodeInput } from 'react-native-keycode';
import { firebase, firebaseConfig } from '../../data/firebase';
import "firebase/firestore";
import "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import Cookies from 'js-cookie';

function PhoneVerification(props) {

    const auth = firebase.auth();
    const firestore = firebase.firestore();
    var provider = new firebase.auth.PhoneAuthProvider();
    firebase.auth().settings.appVerificationDisabledForTesting = true;
    const [verified, setVerified] = useState(false);
    const userInfo = props.userInfo;

    return (
        <View style={{
            position: 'absolute',
            width: "100%",
            height: "100%",
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            alignContent: 'center',
            justifyContent: 'center',
            elevation: 5,
            shadowColor: 'black',
            shadowOpacity: 0.5,
            shadowOffset: { width: 2, height: 5 }
        }}>
            <View style={{
                marginHorizontal: 20,
                backgroundColor: 'white',
                width: 310,
                height: 450,
                borderRadius: 50,
                alignItems: 'center',
                alignSelf: 'center'
            }}>
                <Text style={{
                    flex: 1.2,
                    fontSize: 18,
                    color: 'rgba(0,0,0,0.4)',
                    textAlignVertical: 'center'
                }}>
                    SMS Verification
                </Text>
                <MaterialCommunityIcons
                    style={{
                        flex: 2,
                        textAlignVertical: 'center'
                    }}
                    name="cellphone-message"
                    size={70} color="rgba(0,0,0,0.4)" />
                <Text style={{
                    flex: verified ? 2 : 1,
                    fontSize: verified ? 23 : 20,
                    fontWeight: '600',
                    width: "80%",
                    color: verified ? '#8ea' : 'black',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                }}>
                    {verified ? "Verification for " + props.number + " successful!" : "Check your SMS"}
                </Text>
                {!verified && <Text
                    style={{
                        flex: 1,
                        fontSize: 18,
                        fontWeight: '300',
                        color: 'rgba(0,0,0,0.5)',
                        width: "85%",
                        textAlign: 'center'
                    }}>
                    A verification code has been sent to {props.number}!
                </Text>}
                <KeycodeInput
                    length={6}
                    autoFocus={false}
                    numeric={true}
                    onComplete={async (value) => {

                        // !!!!!
                        // if logging in ->
                        // first check if the user exists



                        // sending verification code
                        try {
                            const credential = firebase.auth.PhoneAuthProvider.credential(
                                props.verificationId,
                                value,
                            );
                            props.setCredential(credential);
                            console.log(credential);
                            await firebase.auth().signInWithCredential(credential).then((user) => {
                                setVerified(true);
                                // user existed before
                                /* if (!user.isNewUser) {
                                    console.log("returning user");
                                    if (props.action === "in") {
                                        console.log("logging in");
                                        const tempUser = "luka";
                                        props.setUserAndNavigate(tempUser);
                                        //  setTimeout(() => {
                                        //     const tempUser = "luka";
                                        //     props.setUserAndNavigate(tempUser);
                                        // }, 400); 
                                    }
                                    else {
                                        console.log("signing up, but should switch to sign in");

                                    }
                                } */

                                // new user!
                                //else {
                                    console.log("new user");
                                    // user was trying to log in, but
                                    // it's not a recognized number
                                    if (props.action === "in") {
                                        console.log("attempting to log in");
                                        Alert.alert("User Not Found", "A user with phone number " + props.number + "was not found. Would you like to create a new account?", [
                                            {
                                                text: "Make New Account",
                                                onPress: () => {

                                                }
                                            },
                                            {
                                                text: "Cancel",
                                                onPress: () => {

                                                },
                                                style: 'cancel'
                                            }
                                        ])
                                    }
                                    // regular sign up
                                    else {
                                        // is the code getting here?
                                        console.log("hello from regular sign up");
                                        setTimeout(() => {
                                            props.setIsVerified(true);
                                        }, 400);

                                        var data = {
                                            phoneNumber: props.number,
                                            first_name: userInfo.firstName,
                                            last_name: userInfo.lastName,
                                            user_name: userInfo.id
                                            
                                        }
                                        // ----------------------------------------------------->
                                        //store idToken ---------------------------------------->
                                        // fetch("https://soshwrld.com/sessionLogin", {
                                        //     method: "POST",
                                        //     headers: {
                                        //       Accept: "application/json",
                                        //       "Content-Type": "application/json",
                                        //       "CSRF-Token": Cookies.get("XSRF-TOKEN"),
                                        //     },
                                        //     body: JSON.stringify({ idToken }),
                                        //   });

                                        fetch("https://soshwrld.com/createuser",{
                                            method: 'POST',
                                            headers: {
                                                'Accept': "application/json",
                                                'Content-Type': 'application/json',
                                                "CSRF-Token": Cookies.get("XSRF-TOKEN")
                                            },
                                            body: JSON.stringify(data),
                                        })
                                    }
                                //}
                            });
                            
                        } catch (err) {
                            console.log(err.message);
                        }
                    }}
                />
                <Text style={{
                    flex: 0.9,
                    fontSize: 13,
                    textAlign: 'center',
                    textAlignVertical: 'top',
                    marginTop: 5,
                    color: 'rgba(0,0,0,0.3)'
                }}>
                    Enter 6-digit verification code
                </Text>
                <View style={{
                    flex: 0.7,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity>
                        <Text style={{
                            color: '#59a4ff',
                            fontSize: 17
                        }}>
                            Send Again
                        </Text>
                    </TouchableOpacity>
                    <View style={{
                        width: 0,
                        height: 25,
                        borderColor: 'rgba(89, 164, 255, 1)',
                        borderWidth: 0.4,
                        marginHorizontal: 15,
                    }} />
                    <TouchableOpacity
                        // cancel button
                        onPress={() => {
                            props.setVerificationId(null);
                        }}
                    >
                        <Text style={{
                            color: '#59a4ff',
                            fontSize: 17,
                        }}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default PhoneVerification;