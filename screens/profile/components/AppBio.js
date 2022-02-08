import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Bio from './Bio';
import SocialMediaLinks from './SocialMediaLinks';
import AppContext from '../../../data/AppContext';
import ThemeContext from '../../../data/ThemeContext';
import { firebaseApp } from '../../../data/firebase';
import { getFirestore, getDoc, doc } from "firebase/firestore";

function AppBio({ topHeight, setTopHeight, openEditProfile, isUser, navigation }) {

    const [ready, setReady] = useState(false);
    const [userData, setUserData] = useState();
    const logger = useContext(AppContext).uid;
    const theme = useContext(AppContext).theme;
    const colors = useContext(ThemeContext).colors[theme];
    const spacing = 4;

    function getUserData(uid, callback) {
        const db = getFirestore(firebaseApp);
        const userProfileRef = doc(db, "User-Profile", uid);
        getDoc(userProfileRef).then((doc) => {
            let ret = doc.data();
            ret.userID = uid;
            callback(ret);
        }).catch((error) => { console.log(error) });
    };

    useEffect(() => {
        getUserData(logger, (data) => {
            setUserData(data);
            setReady(true);
        })
    }, []);

    const VerticalBar = () => {
        return (
            <View style={{
                height: 32,
                width: 0,
                borderWidth: 0.5,
                marginHorizontal: 11,
                borderColor: '#777',
                alignSelf: 'center',
                // borderWidth: 1, borderColor: 'salmon'
            }} />
        )
    }

    return (
        ready ? <View
            style={{
                width: "100%",
                alignSelf: 'center',
                alignItems: "center",
                paddingHorizontal: 0,
                // paddingTop: 50,
                // borderWidth: 1,borderColor: 'salmon'
            }}
            onLayout={(event) => {
                if (topHeight === 0)
                    setTopHeight(event.nativeEvent.layout.height);
            }}>

            {/* profile pic, name, bio */}
            <Bio userData={userData} />

            <View style={{ height: 22 }} />

            {/* following | followers | edit/follow */}
            <View style={{
                width: "95%",
                height: 45,
                alignItems: 'center',
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
                // borderWidth: 1, borderColor: 'salmon'
            }}>

                {/* first */}
                <TouchableOpacity style={{
                    marginRight: spacing,
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    height: 40,
                    // borderColor: 'pink', borderWidth: 1
                }}>
                    <Text style={{
                        color: colors.antiBackground,
                        fontWeight: 'bold',
                        fontSize: 18
                    }}>
                        {userData.followingCount}
                    </Text>
                    <Text style={{
                        fontSize: 13,
                        color: colors.text3,
                        fontWeight: 'bold',
                        marginTop: -4,
                        // borderColor: 'salmon',
                        // borderWidth: 1
                    }}>
                        Following
                    </Text>
                </TouchableOpacity>

                {/* first vertical bar */}
                <VerticalBar />

                {/* middle */}
                <TouchableOpacity style={{
                    marginHorizontal: spacing,
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    height: 40,
                    // borderColor: 'pink',borderWidth: 1
                }}>
                    <Text style={{
                        color: colors.antiBackground,
                        fontWeight: 'bold',
                        fontSize: 18
                    }}>
                        {userData.followersCount}
                    </Text>
                    <Text style={{
                        fontSize: 13,
                        color: colors.text3,
                        fontWeight: 'bold',
                        marginTop: -4
                    }}>
                        Followers
                    </Text>
                </TouchableOpacity>

                {/* second vertical bar */}
                <VerticalBar />

                {/* last */}
                <TouchableOpacity style={{
                    alignItems: "center",
                    justifyContent: 'center',
                    backgroundColor: colors.background1, //colors.blue,
                    paddingHorizontal: 22.5,
                    paddingVertical: 11,
                    marginLeft: spacing + 2,
                    borderRadius: 4,
                    // borderColor: 'pink',borderWidth: 1
                }}
                    onPress={openEditProfile}>
                    <Text style={{
                        fontSize: 15,
                        color: colors.text3,
                        fontWeight: "bold"
                    }}>
                        {"Edit Profile"}
                    </Text>
                </TouchableOpacity>

            </View>

            <View style={{ height: 20 }} />

            <SocialMediaLinks userData={userData} />

            <View style={{ height: 29 }} />
        </View> : <View />
    )
}

export default AppBio;