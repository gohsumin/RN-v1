import React, { useEffect, useRef, useState, useContext } from 'react';
import { View, Text } from 'react-native';
import { firebase, firebaseApp } from "../../../data/firebase";
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";
import { signInWithCredential, PhoneAuthProvider } from 'firebase/auth';
import { KeycodeInput } from 'react-native-keycode';
import AppContext from '../../../data/AppContext';

function PhoneCode({ route, navigation }) {

    const { setUID, setUser } = useContext(AppContext);
    const [valid, setValid] = useState(false);
    const [code, setCode] = useState('');
    const [message, setMessage] = useState("");

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () =>
                <Text onPress={() => {
                    if (valid) {
                        confirmCode();
                    }
                }}
                    style={{
                        color: (valid) ? "#24a0ed" : "#777",
                        marginRight: 10,
                        fontSize: 17,
                    }}
                >Done</Text>
        })

    }, [navigation, valid]);

    function createNewUser(uid) {
        const db = getFirestore(firebaseApp);
        setDoc(doc(db, "User-Profile", uid), {
            dateJoined: new Date() / 1000,
            userName: "New User",
            userImageURL: "https://firebasestorage.googleapis.com/v0/b/soshwrldinc.appspot.com/o/User-Profile-Images%2Fdefault.jpg?alt=media&token=7a606dae-2c40-4646-88ba-b9fb29111042",
            userDescription: "🌱",
            followersCount: 0,
            followingCount: 0,
        }).then(() => { });
    }

    const confirmCode = () => {
        const credential = PhoneAuthProvider.credential(
            route.params.verificationId,
            code
        );
        signInWithCredential(credential)
            .then(res => {
                const { uid } = res;
                setMessage("got UID?");
                // setUID(uid);
                // const db = getFirestore(firebaseApp);
                // const docRef = doc(db, "User-Profile", uid);
                // getDoc(docRef).then((doc) => {
                //     if (doc.exists) {
                //         setUser(doc.data().userName);
                //     }
                //     else {
                //         createNewUser(uid);
                //     }
                // })
                // navigation.navigate("Main");
            }).catch(err => {
                setMessage("Error: " + err+"\n\nverificationId: ###"+route.params.verificationId+"###\n\ncode: ###"+code+"###");
            });
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
                value={code}
                onChange={(text) => {
                    setCode(text);
                    if (!isNaN(text) && (text.length === 6)) {
                        setValid(true);
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
                alignSelf: "center",
                marginTop: 20
            }}>{message}</Text>
        </View>
    )
}

export default PhoneCode;