import React, { useEffect, useRef, useState, useContext } from 'react';
import { View, Text } from 'react-native';
import { firebaseApp } from "../../../data/firebase";
import { getFirestore, setDoc, doc, Timestamp } from "firebase/firestore";
import { signInWithCredential, PhoneAuthProvider, getAuth, updateProfile } from 'firebase/auth';
import { KeycodeInput } from 'react-native-keycode';
import AppContext from '../../../data/AppContext';

function PhoneCode({ route, navigation }) {

    const { setUID, setUser } = useContext(AppContext);
    const [valid, setValid] = useState(false);
    const code = useRef("");
    const [codeText, setCodeText] = useState("");
    const [message, setMessage] = useState("");
    const auth = getAuth();
    const db = getFirestore(firebaseApp);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <HeaderRight valid={valid} />
        })
    }, [navigation, valid]);

    const handleSubmit = () => {
        confirmCode().then(userCredential => {
            const { uid, displayName } = auth.currentUser;
            if (displayName) {
                setUID(uid);
                setUser(displayName);
            }
            else {
                createNewUser(uid);
            }
            navigation.navigate("Main");
        })
    }

    async function confirmCode() {
        const phoneCredential = PhoneAuthProvider.credential(
            route.params.verificationId,
            code.current
        );
        const userCredential = await signInWithCredential(auth, phoneCredential);
        return userCredential;
    }

    function createNewUser(uid) {
        updateProfile(auth.currentUser, {
            displayName: "New User",
            photoURL: "https://firebasestorage.googleapis.com/v0/b/soshwrldinc.appspot.com/o/User-Profile-Images%2Fdefault.jpg?alt=media&token=7a606dae-2c40-4646-88ba-b9fb29111042",
        }).then(() => {
            setDoc(doc(db, "User-Profile", uid), {
                dateJoined: Timestamp.now(),
                userName: "New User",
                userImageURL: "https://firebasestorage.googleapis.com/v0/b/soshwrldinc.appspot.com/o/User-Profile-Images%2Fdefault.jpg?alt=media&token=7a606dae-2c40-4646-88ba-b9fb29111042",
                userDescription: "🌱",
                followersCount: 0,
                followingCount: 0,
            }).then(() => {
                setUID(uid);
                setUser("New User");
            });
        });
    }

    function HeaderRight(valid) {
        return (
            <Text
                onPress={() => {
                    if (valid && route.params.verificationId) {
                        handleSubmit();
                    }
                }}
                style={{
                    color: (valid) ? "#24a0ed" : "#777",
                    marginRight: 10,
                    fontSize: 17,
                }}>Done</Text>
        )
    }

    return (
        <View style={{
            marginTop: 60,
        }}>

            <KeycodeInput
                length={6}
                textColor={"white"}
                autoFocus={true}
                numeric={true}
                value={codeText}
                onChange={(text) => {
                    setCodeText(text);
                    code.current = text;
                    if (!isNaN(text) && (text.length === 6)) {
                        setValid(true);
                    }
                    else {
                        setValid(false);
                    }
                }}
                style={{
                    alignSelf: "center",
                    color: "#fff",
                    backgroundColor: "#444"
                }}
            />
            <Text style={{
                color: "red",
                fontSize: 16,
                width: "100%",
                alignSelf: "center",
                marginTop: 20
            }}>{message}</Text>
        </View>
    )
}

export default PhoneCode;