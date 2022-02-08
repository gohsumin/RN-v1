import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, View, Text, Image, Linking } from 'react-native';
import Bio from './components/Bio';
import AppContext from '../../data/AppContext';
import ThemeContext from '../../data/ThemeContext';
import { getFirestore, getDoc, doc, } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseApp } from '../../data/firebase';
import { getFunctions, httpsCallable } from "firebase/functions";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { child, get, getDatabase, ref } from 'firebase/database';

function ProfileScreen({ route, navigation }) {

    const [message, setMessage] = useState("");

    const [userData, setUserData] = useState(null);
    const [ready, setReady] = useState(false);
    const [followable, setFollowable] = useState();
    const [buttonText, setButtonText] = useState("");
    const theme = useContext(AppContext).theme;
    const colors = useContext(ThemeContext).colors[theme];
    const auth = getAuth();
    const logger = auth.currentUser.uid;
    const functions = getFunctions();

    useEffect(() => {
        getUserData(route.params.uid, (data) => {
            setUserData(data);
            navigation.setOptions({ title: data.userName });
            const dbRef = ref(getDatabase());
            const path = "/User-Profile/" + logger + "/Following";
            get(child(dbRef, path)).then(snapshot => {
                const res = snapshot.val();
                // check if the logged in user is following the profile
                if (res !== null && res[userData.userID] !== undefined) {
                    setFollowable(false);
                    setButtonText("Unfollow");
                }
                else {
                    setFollowable(true);
                    setButtonText("Follow");
                }
                setReady(true);
            })
        })
    }, []);

    function getUserData(uid, callback) {
        const db = getFirestore(firebaseApp);
        const userProfileRef = doc(db, "User-Profile", uid);
        getDoc(userProfileRef).then((doc) => {
            let ret = doc.data();
            ret.userID = uid;
            callback(ret);
        }).catch((error) => { console.log(error) });
    };

    function follow() {
        const followUser = httpsCallable(functions, 'followUser');
        followUser({
            userID: userData.userID,
        }).then(() => {
            setFollowable(false);
            setButtonText("Unfollow");
        }).catch(err => {
            setMessage("Error: " + err);
        });
    }

    function unfollow() {
        const unFollowUser = httpsCallable(functions, 'unFollowUser');
        unFollowUser({
            userID: userData.userID
        }).then(() => {
            setFollowable(true);
            setButtonText("Follow");
        });
    }

    function openInstaProfile() {
        const url = `https://www.instagram.com/${userData.instagram.instagramHandle}`;
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            }
        })
    }

    const VerticalBar = () => {
        return (
            <View style={{
                height: 22,
                width: 0.5,
                marginHorizontal: 11,
                backgroundColor: '#333',
                alignSelf: 'center',
                // borderWidth: 1, borderColor: 'salmon'
            }} />
        )
    }

    function InstaButton() {
        if (userData.instagram) {
            return (
                <TouchableOpacity style={{
                    flexDirection: "row",
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#1a1a1a"
                }} onPress={openInstaProfile}>
                    <Image
                        source={require("../../assets/instagram.png")}
                        style={{
                            width: 35,
                            height: 35,
                        }} />
                    <Text style={{
                        fontSize: 13,
                        lineHeight: 17,
                        color: colors.text3,
                        // fontWeight: "bold",
                        marginLeft: 7,
                        marginRight: 10,
                    }}>
                        {userData.instagram.instagramHandle + " ✓\n" + userData.instagram.instagramTag}
                    </Text>
                </TouchableOpacity>
            )
        }
        else {
            return (
                <View
                    style={{
                        padding: 5,
                        paddingRight: 6,
                        backgroundColor: colors.background1,
                        borderRadius: 8,
                        flexDirection: "row",
                        alignItems: "center",
                    }}>
                    <Image
                        source={require("../../assets/instagram.png")}
                        style={{
                            width: 24,
                            height: 24,
                            opacity: ("instagramHandle" in userData) ? 1 : 0.79,
                            marginRight: 5.5
                        }} />
                    <Text style={{
                        color: colors.text3,
                        fontSize: ("instagramHandle" in userData) ? 16 : 15,
                        // fontWeight: ("instagramHandle" in userData) ? "bold" : "normal",
                    }}>
                        {(("instagramHandle" in userData) && userData["instagramHandle"]) ?
                            "@" + userData["instagramHandle"] :
                            "not linked"}
                    </Text>
                </View>
            )
        }
    }

    return (
        <View style={{
            flex: 1,
            // borderWidth: 1, borderColor: "salmon"
        }} >
            {ready && <ScrollView style={{
                backgroundColor: colors.background
            }}
                contentContainerStyle={{
                    flex: 1,
                    alignItems: "center",
                }} >
                {/* <Text style={{color: "red"}}>{message}</Text> */}
                <Bio userData={userData} />

                <View style={{ height: 22 }} />

                {/* instagram followers | follow button */}
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%"
                }}>
                    <InstaButton />

                    <VerticalBar />

                    {/* last */}
                    <TouchableOpacity style={{
                        alignItems: "center",
                        justifyContent: 'center',
                        backgroundColor: colors.antiBackground,
                        paddingHorizontal: 22.5,
                        height: 45,
                        borderRadius: 4,
                        // borderColor: 'pink',borderWidth: 1
                    }} onPress={() => {
                        followable ? follow() : unfollow();
                    }}>
                        <Text style={{
                            fontSize: 15,
                            color: colors.text3,
                            fontWeight: "bold"
                        }}>
                            {buttonText}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>}
        </View>
    )
}

export default ProfileScreen;