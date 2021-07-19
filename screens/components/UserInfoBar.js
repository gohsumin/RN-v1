import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import AppContext from "../../data/AppContext";
import ThemeContext from "../../data/ThemeContext";
import UsersContext from '../../data/UsersContext';
import { firebase } from '../../data/firebase';
import "firebase/firestore";
const firestore = firebase.firestore();

function UserInfoBar({ userData, isUser, setUserData, navigate }) {

    const { theme, uid } = React.useContext(AppContext);
    const colors = React.useContext(ThemeContext).colors[theme];
    const statsFontSize = 13.6;
    
    const spacing = 15;
    const leftHeight = 28;

    function isFollowable(otherUID) {
        // check if otherUID is followed by uid
        firestore.collection('User-Profile').doc(otherUID).collection('Followers').doc(uid).get().then
    }

    const [followable, setFollowable] = useState(false);



    function follow() {
        console.log("attempt to follow");
    }

    function unfollow() {
        console.log("attempt to unfollow");
    }

    function getButtonText() {
        if (isUser) {
            return "Edit Profile";
        }
        else if (followable) {
            return "Follow";
        }
        else {
            return "Unfollow";
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
                onPress={() => {
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
                }}>
                <Text style={{
                    fontSize: 15,
                    color: colors.antiBackground,
                    fontWeight: "bold"
                }}>
                    {getButtonText()}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default UserInfoBar;