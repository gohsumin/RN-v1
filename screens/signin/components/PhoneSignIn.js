import React, { useState, useRef, createRef } from 'react';
import { View, Text } from 'react-native';
import PhoneInput from "react-native-phone-number-input";
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { getApp } from "firebase/app";
import { getAuth, signInWithPhoneNumber, PhoneAuthProvider } from "firebase/auth";

function PhoneSignIn({ navigation }) {

    const [phoneNumber, setPhoneNumber] = useState("");
    const numberWithAreaCode = useRef("");
    const [message, setMessage] = useState("");
    const [valid, setValid] = useState(false);
    const recaptchaVerifier = useRef(null);
    const phoneInputRef = createRef();
    const app = getApp();
    const auth = getAuth();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <HeaderRight valid={valid} />
        })
    }, [navigation, valid]);

    function sendVerification() {
        signInWithPhoneNumber(auth, numberWithAreaCode.current, recaptchaVerifier.current)
            .then(confirmationResult => {
                navigation.navigate("Phone Verification", { verificationId: confirmationResult.verificationId });
            }).catch(err => {
                setMessage("Error: " + err);
            });
    }

    function HeaderRight(valid) {
        return (
            <Text
                onPress={() => {
                    if (valid) {
                        sendVerification();
                    }
                }}
                style={{
                    color: (valid) ? "#24a0ed" : "#777",
                    marginRight: 10,
                    fontSize: 17,
                }}>Verify</Text>
        )
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
                    if (!isNaN(text) && (text.length > 6)) {
                        setValid(true);
                    }
                    else {
                        setValid(false);
                    }
                }}
                onChangeFormattedText={(text) => {
                    numberWithAreaCode.current = text;
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