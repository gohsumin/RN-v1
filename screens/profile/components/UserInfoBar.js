import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import AppContext from "../../../data/AppContext";
import ThemeContext from "../../../data/ThemeContext";
import { firebase } from '../../../data/firebase';
import "firebase/firestore";
const firestore = firebase.firestore();

function UserInfoBar({ userData, isUser, setUserData, navigate }) {

    const { theme, uid } = React.useContext(AppContext);
    const colors = React.useContext(ThemeContext).colors[theme];

    const spacing = 15;
    const leftHeight = 28;

    var followUser = firebase.functions().httpsCallable('followUser');
    var unFollowUser = firebase.functions().httpsCallable('unFollowUser');
    const [buttonText, setButtonText] = useState("");
    const [followable, setFollowable] = useState();
    const [action, setAction] = useState();

    function follow() {
        setButtonText("Unfollow");
        /* setAction(() => {
            unfollow();
        }); */
        followUser({
            userID: userData.userID,
        }).then(() => {
            console.log("after following");
            setFollowable(false);
        });
    }

    function unfollow() {
        setButtonText("Follow");
        /* setAction(() => {
            follow();
        }); */
        unFollowUser({
            userID: userData.userID
        }).then(() => {
            console.log("after unfollowing");
            setFollowable(true);
        });
    }

    useEffect(() => {
        if (isUser) {
            setButtonText("Edit Profile");
            /* setAction(() => {
                navigate('Edit Profile', { uid: uid });
            }); */
        }
        else {
            const path = "/User-Profile/" + uid + "/Following";
            firebase.database().ref(path).once('value', snapshot => {
                const res = snapshot.val();
                // check if the logged in user is following the profile
                if (res !== null && res[userData.userID] !== undefined) {
                    setFollowable(false);
                    setButtonText("Unfollow");
                    /* setAction(() => {
                        unfollow();
                    }); */
                }
                else {
                    console.log("nope");
                    setFollowable(true);
                    setButtonText("Follow");
                    /* setAction(() => {
                        follow();
                    }); */
                }
            })
        }
    }, []);

    function onButtonPress() {
        console.log("onButtonPress");
        if (isUser) {
            navigate('Edit Profile', { uid: uid });
            // from whatever page for updating profile: on submit, call setUserData
        }
        else if (followable) {
            follow();
        }
        else {
            unfollow();
        }
    }

    return (
        <View style={{
            width: "100%",
            height: 45,
            alignContent: 'center',
            flexDirection: 'row',
            justifyContent: 'center'
        }}>

            {/* first */}
            <TouchableOpacity style={{
                paddingHorizontal: spacing,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text style={{ color: colors.antiBackground, fontWeight: 'bold', fontSize: 18 }}>
                    {userData.followingCount}
                </Text>
                <Text style={{ fontSize: 13, color: colors.foreground1, fontWeight: 'bold', marginTop: -4 }}>
                    Following
                </Text>
            </TouchableOpacity>

            {/* first vertical bar */}
            <View style={{ height: leftHeight, width: 0, borderWidth: 0.28, borderColor: '#999', alignSelf: 'center' }} />

            {/* middle */}
            <TouchableOpacity style={{
                paddingHorizontal: spacing,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{ color: colors.antiBackground, fontWeight: 'bold', fontSize: 18 }}>
                    {userData.followersCount}
                </Text>
                <Text style={{ fontSize: 13, color: colors.foreground1, fontWeight: 'bold', marginTop: -4 }}>
                    Followers
                </Text>
            </TouchableOpacity>

            {/* second vertical bar */}
            <View style={{ height: leftHeight, width: 0, borderWidth: 0.28, borderColor: '#999', alignSelf: 'center' }} />

            {/* last */}
            <TouchableOpacity style={{
                width: 130,
                alignItems: "center",
                justifyContent: 'center',
                backgroundColor: colors.blue,
                marginHorizontal: spacing,
                borderRadius: 4,
            }}
                onPress={onButtonPress}>
                <Text style={{
                    fontSize: 15,
                    color: colors.antiBackground,
                    fontWeight: "bold"
                }}>
                    {buttonText}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default UserInfoBar;