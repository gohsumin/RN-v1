import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import AppContext from "../../data/AppContext";
import ThemeContext from "../../data/ThemeContext";

function UserInfoBar({ userData, isUser }) {

    const theme = React.useContext(AppContext).theme;
    const colors = React.useContext(ThemeContext).colors[theme];
    const statsFontSize = 13.6;
    const buttonFontSize = 14;
    const spacing = 16.7;
    const leftHeight = 28;

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
                    {userData.following.length}
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
                    {userData.followers.length}
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
                    // update user context for following & followers
                    // post changes to backend
                }}>
                <Text style={{ fontSize: buttonFontSize, color: colors.antiBackground, fontWeight: "600" }}>
                    {isUser ? 'Edit Profile' : 'Follow'}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default UserInfoBar;