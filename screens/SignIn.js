import React, { useContext, useState, useRef } from 'react';
import {
    Text,
    View,
    TextInput,
    Animated,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    StyleSheet,
    Button,
    Image
} from 'react-native';
import AppContext from '../data/AppContext';
import * as Google from 'expo-google-app-auth';
//import firebase from "firebase/app";
import { firebase, firebaseConfig } from '../data/firebase';
import "firebase/firestore";
import "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeycodeInput } from 'react-native-keycode';
import SignUp from './SignUp';

function SignIn({ navigation }) {

    const auth = firebase.auth();
    const firestore = firebase.firestore();

    var provider = new firebase.auth.PhoneAuthProvider();

    firebase.auth().settings.appVerificationDisabledForTesting = true;

    const { user, setUser, theme } = useContext(AppContext);
    const [number, setNumber] = useState();

    //var phoneNumber = "+12027258240";
    var testVerificationCode = "123456";

    /* const captcha = '<div id="sign-in-button" />'; */

    const recaptchaVerifier = React.useRef(null);
    const [phoneNumber, setPhoneNumber] = React.useState();
    const [verificationId, setVerificationId] = React.useState();
    const [verificationCode, setVerificationCode] = React.useState();
    const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
    const [message, setMessage] = React.useState(
        !firebaseConfig || Platform.OS === 'web'
            ? {
                text:
                    'To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.',
            }
            : undefined
    );
    const attemptInvisibleVerification = false;
    const [signInButtonOpen, setSignInButtonOpen] = useState(false);
    const [signUpButtonOpen, setSignUpButtonOpen] = useState(false);
    const marginHorizontal = 85;
    const buttonFontSize = 20;
    const buttonHeight = 47;
    const buttonBorderRadius = buttonHeight/2;
    const phoneInputHeight = useRef(new Animated.Value(buttonHeight)).current;
    const inputOpacity = useRef(new Animated.Value(0)).current;

    /* verifies phone number and allows sign in with number */
    async function onPhoneNumberSubmit(event) {
        console.log("sign in submit");
        try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
                number,
                recaptchaVerifier.current
            ).then((vId) => {
                console.log("verificationId:"+vId);
                setVerificationId(vId);
            });
            setMessage({ text: 'Verification code has been sent to your phone.' });
            // show a pop up for entering the verification code
        } catch (err) {
            setMessage({ text: `Error: ${err.message}`, color: 'red' });
            console.log("error: "+err);
        }
    }

    const signInAsync = async () => {
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

                var yu = firestore.collection("UserBase").doc(auth.uid);
                yu.set({ "email": user.email, "accessToken": accessToken }).then(() => { return; });
                //yu.update({}).then(() =>{return;}).catch(() => {return;});

                const temp = "luka";
                setUser(temp);
                navigation.navigate("Profile", { user: temp });
            }
        } catch (error) {
            console.log("LoginScreen.js 19 | ---", error);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={'padding'}
            style={{
                flex: 1,
                width: "100%",
                backgroundColor: 'black'
        }}>

            <View style={{
                flex: 1.5,
                justifyContent: 'flex-end'
            }}>
                <Image
                    source={require('../assets/logo.png')}
                    style={{
                        height: "45%",
                        resizeMode: 'contain',
                        alignSelf: 'center',
                        marginBottom: 35
                    }}
                />
                <Text
                    // fancy text...
                    style={{
                        color: 'gray', //#f7d0da',
                        fontSize: 24,
                        fontWeight: '200',
                        marginHorizontal: marginHorizontal,
                        textAlignVertical: 'bottom',
                        textAlign: "center",
                        letterSpacing: 0.3,
                        lineHeight: 27
                    }}>
                    Real purchases
                    approved by
                    _____________ .
                </Text>
            </View>


            <View // buttons
                style={{
                    marginTop: 58,
                    marginHorizontal: marginHorizontal,
                    justifyContent: 'flex-start',
                    flex: 1
                }}>

                <Animated.View // sign up button + phone # input
                    style={{
                        //flex: 1
                    }}>

                    <Animated.View // box that holds !!text input for sign in!!
                        style={{
                            opacity: inputOpacity,
                            width: "100%",
                            height: phoneInputHeight,
                            borderRadius: buttonBorderRadius,
                            backgroundColor: 'rgba(255,255,255,0.8)',
                        }}>

                        <Animated.View // text input for sign in
                        style={{
                            opacity: inputOpacity,
                            height: 30,
                            bottom: 0,
                            position: 'absolute',
                            width: "76%",
                            alignSelf: 'center',
                            padding: 5
                        }}>
                            <TextInput
                                style={{
                                    borderBottomWidth: 0.2,
                                    borderBottomColor: 'rgba(0,0,0,0.5)',
                                    fontSize: 14,
                                    paddingBottom: 5
                                }}
                                // figure out how to show the submit button!
                                onSubmitEditing={(event) => {
                                    onPhoneNumberSubmit(event);
                                }}
                                // pls check that the state name stayed the same..
                                onChangeText={setNumber}
                                value={number}
                                placeholder="e.g. +1 999 999 9999"
                                // maybe do something here to show submit button
                                // and enable hiding the keyboard
                                autoCompleteType="tel"
                                keyboardType="phone-pad"
                                textContentType="telephoneNumber"
                                returnKeyType="done"
                            />
                        </Animated.View>

                    </Animated.View>

                    <TouchableOpacity // button for phone sign in!!!
                        style={{
                            position: 'absolute',
                            width: "100%",
                        }}
                        onPress={(event) => {
                            // trigger the text input to come down
                            Animated.timing(
                                phoneInputHeight,
                                {
                                    toValue: signInButtonOpen ? buttonHeight : 82,
                                    duration: 300,
                                    useNativeDriver: false
                                }).start();
                            Animated.timing(inputOpacity,
                                {
                                    toValue: signInButtonOpen ? 0 : 1,
                                    duration: 300,
                                    useNativeDriver: false
                                }).start();
                            setSignInButtonOpen(!signInButtonOpen);
                        }}>
                        <View style={{
                            width: "100%",
                            height: buttonHeight,
                            borderRadius: buttonBorderRadius,
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            shadowOpacity: 0.3,
                            shadowColor: 'black',
                            shadowOffset: { width: 0, height: 1 },
                            shadowRadius: 4,
                            elevation: 3
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                color: 'black',
                                fontSize: buttonFontSize,
                                fontWeight: '300'
                            }}>
                                Sign In
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <FirebaseRecaptchaVerifierModal
                        ref={recaptchaVerifier}
                        firebaseConfig={firebaseConfig}
                        attemptInvisibleVerification={attemptInvisibleVerification}
                    />
                </Animated.View>


                <View
                    // button for SIGN UP
                >
                    <TouchableOpacity
                        // with more user input for user info
                        onPress={() => {
                            // trigger sign up page to open
                            setSignUpButtonOpen(!signUpButtonOpen);
                        }}>
                        <View style={{
                            marginTop: 17,
                            width: "100%",
                            height: buttonHeight,
                            borderRadius: buttonBorderRadius,
                            justifyContent: 'center',
                            backgroundColor: '#196DFF',
                            shadowOpacity: 0.3,
                            shadowColor: 'black',
                            shadowOffset: { width: 0, height: 1 },
                            shadowRadius: 4,
                            elevation: 3
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                color: 'white',
                                fontSize: buttonFontSize, fontWeight: '300'
                            }}>
                                Sign Up
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
            
            {signUpButtonOpen &&
                <SignUp
                    setVerificationId={(vid) => {setVerificationId(vid)}}
                    setVerificationCode={(vco) => {setVerificationCode(vco)}}
                    onPhoneNumberSubmit={(event) => {onPhoneNumberSubmit(event)}}
                    setNumber={(number) => {setNumber(number)}}
                />
                }

            { // pop up for entering verification id sent to text
                verificationId &&
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
                            flex: 1,
                            fontSize: 20,
                            fontWeight: '600',
                            width: "70%",
                            color: 'black',
                            textAlign: 'center',
                            textAlignVertical: 'center',
                        }}>
                            Check your SMS
                        </Text>
                        <Text
                            style={{
                                flex: 1,
                                fontSize: 18,
                                fontWeight: '300',
                                color: 'rgba(0,0,0,0.5)',
                                width: "85%",
                                textAlign: 'center'
                            }}>
                            A verification code has been sent to {number}!
                        </Text>
                        <KeycodeInput
                            length={6}
                            autoFocus={false}
                            numeric={true}
                            
                            onComplete={async (value) => {
                                // sending verification code
                                try {
                                    const credential = firebase.auth.PhoneAuthProvider.credential(
                                        verificationId,
                                        verificationCode
                                    );
                                    await firebase.auth().signInWithCredential(credential).then((user) => {
                                        console.log(user);
                                    });
                                    const user = firebase.auth().currentUser;
                                    if (user !== null) {
                                        const uid = user.uid;
                                        firestore.collection('UserBase').doc(uid).set({ access_token: "", full_name: "", username: "" })

                                    }
                                    setMessage({ text: 'Phone authentication successful 👍' });
                                    // do some other things
                                    // like set the user context
                                    // and navigate to the user screen
                                } catch (err) {
                                    setMessage({ text: `Error: ${err.message}`, color: 'red' });
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
                                    setVerificationId();
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
                </View>}

        </KeyboardAvoidingView>
    )
}


export default SignIn;




    /*     return (
            <View style={{ padding: 20, marginTop: 50 }}>
                <FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}
                    firebaseConfig={firebaseConfig}
                    attemptInvisibleVerification={attemptInvisibleVerification}
                />
                <Text style={{ marginTop: 20 }}>Enter phone number</Text>
                <TextInput
                    style={{ marginVertical: 10, fontSize: 17 }}
                    placeholder="+1 999 999 9999"
                    autoFocus
                    autoCompleteType="tel"
                    keyboardType="phone-pad"
                    textContentType="telephoneNumber"
                    onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
                />
                <Button
                    title="Send Verification Code"
                    disabled={!phoneNumber}
                    onPress={async () => {
                        // The FirebaseRecaptchaVerifierModal ref implements the
                        // FirebaseAuthApplicationVerifier interface and can be
                        // passed directly to `verifyPhoneNumber`.
                        try {
                            const phoneProvider = new firebase.auth.PhoneAuthProvider();
                            const verificationId = await phoneProvider.verifyPhoneNumber(
                                phoneNumber,
                                recaptchaVerifier.current
                            ).then((vId) => {
                                setVerificationId(vId);
    
                            });
                            setMessage({ text: 'Verification code has been sent to your phone.' });
                        } catch (err) {
                            setMessage({ text: `Error: ${err.message}`, color: 'red' });
                        }
                    }}
                />
                <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
                <TextInput
                    style={{ marginVertical: 10, fontSize: 17 }}
                    editable={!!verificationId}
                    placeholder="123456"
                    onChangeText={setVerificationCode}
                />
                <Button
                    title="Confirm Verification Code"
                    disabled={!verificationId}
                    onPress={async () => {
                        try {
                            const credential = firebase.auth.PhoneAuthProvider.credential(
                                verificationId,
                                verificationCode
                            );
                            await firebase.auth().signInWithCredential(credential).then((user) => {
                                console.log(user);
                            });
                            const user = firebase.auth().currentUser;
                            if (user !== null) {
                                const uid = user.uid;
                                firestore.collection('UserBase').doc(uid).set({ access_token: "", full_name: "", username: "" })
    
                            }
                            setMessage({ text: 'Phone authentication successful 👍' });
                        } catch (err) {
                            setMessage({ text: `Error: ${err.message}`, color: 'red' });
                        }
                    }}
                />
                {message ? (
                    <TouchableOpacity
                        style={[
                            StyleSheet.absoluteFill,
                            { backgroundColor: 0xffffffee, justifyContent: 'center' },
                        ]}
                        onPress={() => setMessage(undefined)}>
                        <Text
                            style={{
                                color: message.color || 'blue',
                                fontSize: 17,
                                textAlign: 'center',
                                margin: 20,
                            }}>
                            {message.text}
                        </Text>
                    </TouchableOpacity>
                ) : (
                    undefined
                )}
                {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
            </View>
        ) */