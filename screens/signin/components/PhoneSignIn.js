import React, { useState, useRef, createRef } from 'react';
import { View, Text } from 'react-native';
import PhoneInput from "react-native-phone-number-input";
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { getApp } from "firebase/app";
import { getAuth, signInWithPhoneNumber, PhoneAuthProvider } from "firebase/auth";

function PhoneSignIn({ navigation }) {

    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [valid, setValid] = useState(true);// useState(false);
    const recaptchaVerifier = useRef(null);
    const phoneInputRef = createRef();
    const app = getApp();
    const auth = getAuth();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                <Text onPress={() => {
                    if (valid) {
                        sendVerification();
                    }
                }}
                    style={{
                        color: (valid) ? "#24a0ed" : "#777",
                        marginRight: 10,
                        fontSize: 17,
                    }}
                >Verify</Text>
        })
    }, [navigation, valid]);

    function sendVerification() {
        signInWithPhoneNumber(auth, '+15555555555', recaptchaVerifier.current)
            .then(confirmationResult => {
                navigation.navigate("Phone Verification", { verificationId: confirmationResult.verificationId });
            }).catch(err => {
                setMessage("Error: " + err);
            });
    }

    return (
        <View style={{
            marginTop: 60,
        }}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={app.options}
            />
            <PhoneInput
                ref={phoneInputRef}
                defaultValue={phoneNumber}
                defaultCode="US"
                layout="first"
                onChangeText={(text) => {
                    setPhoneNumber(text);
                }}
                autoFocus={true}
                containerStyle={{
                    width: "100%",
                    backgroundColor: "#222",
                }}
                codeTextStyle={{
                    color: "white",
                }}
                textInputProps={{
                    placeholderTextColor: "#777"
                }}
                textInputStyle={{
                    color: "white",
                    backgroundColor: "#222"
                }}
                textContainerStyle={{
                    backgroundColor: "#222",
                }}
            />
            <Text style={{
                color: "red",
                fontSize: 16,
                alignSelf: "center",
                marginTop: 20
            }}>{message}</Text>
        </View>
    )
}

export default PhoneSignIn;