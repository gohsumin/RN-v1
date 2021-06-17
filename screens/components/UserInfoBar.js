import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import AppContext from "../../data/AppContext";
import ThemeContext from "../../data/ThemeContext";

function UserInfoBar({userData, isUser}) {

    const theme = React.useContext(AppContext).theme;
    const colors = React.useContext(ThemeContext).colors[theme];

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
            <TouchableOpacity style={{
                paddingHorizontal: 16,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{ color: colors.antiBackground, fontWeight: '600', fontSize: 14 }}>
                    {userData.following.length}
                </Text>
                <Text style={{ fontSize: 14, color: colors.antiBackground, fontWeight: '600' }}>
                    Following
                </Text>
            </TouchableOpacity>
            <View style={{ height: '70%', width: 0, borderWidth: 0.4, borderColor: '#bbb', alignSelf: 'center' }} />
            <TouchableOpacity style={{
                paddingHorizontal: 16,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{ color: colors.antiBackground, fontWeight: '600', fontSize: 14 }}>
                    {userData.followers.length}
                </Text>
                <Text style={{ fontSize: 14, color: colors.antiBackground, fontWeight: '600' }}>
                    Followers
                </Text>
            </TouchableOpacity>
            <View style={{ height: '70%', width: 0, borderWidth: 0.4, borderColor: '#bbb', alignSelf: 'center' }} />
            <TouchableOpacity style={{
                width: 140,
                alignItems: "center",
                justifyContent: 'center',
                backgroundColor: colors.blue,
                marginHorizontal: 16,
                borderRadius: 4,
            }}
                onPress={() => {
                    // update user context for following & followers
                    // post changes to backend
                }}>
                <Text style={{ fontSize: 15, color: colors.antiBackground, fontWeight: "600" }}>
                    {isUser ? 'Edit Profile' : 'Follow'}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default UserInfoBar;