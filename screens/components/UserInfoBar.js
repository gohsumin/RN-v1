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
    const buttonFontSize = 14;
    const spacing = 16.7;
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
            marginTop: 16,
            marginBottom: 13,
            flexDirection: 'row',
            justifyContent: 'center'
        }}>

            {/* first */}
            <TouchableOpacity style={{
                paddingHorizontal: spacing,
                alignItems: 'center',
                justifyContent: 'center',
                //backgroundColor: 'pink',
            }}>
                <Text style={{ color: colors.antiBackground, fontWeight: '500', fontSize: statsFontSize }}>
                    {userData.followingCount}
                </Text>
                <Text style={{ fontSize: statsFontSize, color: colors.antiBackground, fontWeight: '500' }}>
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
                <Text style={{ color: colors.antiBackground, fontWeight: '500', fontSize: statsFontSize }}>
                    {userData.followersCount}
                </Text>
                <Text style={{ fontSize: statsFontSize, color: colors.antiBackground, fontWeight: '500' }}>
                    Followers
                </Text>
            </TouchableOpacity>

            {/* second vertical bar */}
            <View style={{ height: leftHeight, width: 0, borderWidth: 0.28, borderColor: '#999', alignSelf: 'center' }} />

            {/* last */}
            <TouchableOpacity style={{
                width: 140,
                alignItems: "center",
                justifyContent: 'center',
                backgroundColor: colors.foreground3,
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
                <Text style={{ fontSize: buttonFontSize, color: colors.antiBackground, fontWeight: "600" }}>
                    {getButtonText()}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default UserInfoBar;