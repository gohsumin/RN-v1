import React, { useContext, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import ThemeContext from '../../../data/ThemeContext';
import AppContext from '../../../data/AppContext';

const apps = ["instagram", "twitter"];
const appImages = [
    require('../../../assets/instagram.png'),
    require('../../../assets/twitter.png')]

function SocialMediaLinks({ userData }) {

    const theme = useContext(AppContext).theme;
    const colors = useContext(ThemeContext).colors[theme];

    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "center",
        }}>
            {apps.map((app, index) => {
                const handle = app + "Handle";
                return <View key={app}
                    style={{
                        padding: 5,
                        paddingRight: 6,
                        backgroundColor: colors.background2,
                        borderRadius: 8,
                        flexDirection: "row",
                        alignItems: "center",
                        marginRight: 8.5,
                    }}>
                    <Image
                        source={appImages[index]}
                        style={{
                            width: 24,
                            height: 24,
                            opacity: (handle in userData) ? 1 : 0.79,
                            marginRight: 5.5
                        }} />
                    <Text style={{
                        color: (handle in userData) ? colors.antiBackground : colors.text2,
                        fontSize: (handle in userData) ? 16 : 15,
                        fontWeight: (handle in userData) ? "666" : "normal",
                    }}>
                        {(handle in userData) ? "@" + userData[handle] : "not linked"}
                    </Text>
                </View>
            })}
        </View>
    )
}

function areEqual(prevProps, newProps) {
    apps.forEach(app => {
        const handle = app + "Handle";
        if ((handle in prevProps.userData) !== (handle in newProps.userData)) {
            return false;
        }
    })
    return true;
}

export default React.memo(SocialMediaLinks, areEqual);