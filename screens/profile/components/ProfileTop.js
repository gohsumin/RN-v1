import React, { useContext } from 'react';
import { View, useWindowDimensions } from 'react-native';
import Bio from './Bio';
import UserInfoBar from './UserInfoBar';
import SocialMediaLinks from './SocialMediaLinks';
import WebStyleContext from '../../../data/WebStyleContext';

function ProfileTop({ topHeight, setTopHeight, userData, isUser, setUserData, navigate }) {

    const window = useWindowDimensions();
    const { getProfileWidth } = useContext(WebStyleContext)

    return (
        <View
            style={{
                width: getProfileWidth(window.width),
                alignSelf: 'center',
                alignItems: "center",
                paddingHorizontal: 0,
                // borderWidth: 1,
                // borderColor: 'salmon'
            }}
            onLayout={(event) => {
                if (topHeight === 0)
                    setTopHeight(event.nativeEvent.layout.height);
            }}>

            {/* profile pic, name, bio */}
            <Bio userData={userData} />

            <View style={{ height: 22 }} />

            {/* following | followers | edit/follow */}
            <UserInfoBar
                userData={userData}
                isUser={isUser}
                setUserData={setUserData}
                navigate={navigate}
            />

            <View style={{ height: 20 }} />

            <SocialMediaLinks userData={userData} />

            <View style={{ height: 29 }} />
        </View>
    )
}

export default ProfileTop;