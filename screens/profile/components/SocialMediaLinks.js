import React, { useContext, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import ThemeContext from '../../../data/ThemeContext';
import AppContext from '../../../data/AppContext';

function SocialMediaLinks({ userData }) {

    const theme = useContext(AppContext).theme;
    const colors = useContext(ThemeContext).colors[theme];
    const apps = ["instagram", "twitter"];

    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "center",
            // borderWidth: 1,
            // borderColor: 'blue'
        }}>
            {apps.map((app) => {
                const handle = app + "Handle";
                    return <View style={{
                        padding: 5,
                        paddingRight: 6,
                        backgroundColor: colors.foreground4,
                        borderRadius: 8,
                        flexDirection: "row",
                        alignItems: "center",
                        marginRight: 8.5,
                    }}>
                        <Image
                            source={require("../../../assets/" + app + ".png")}
                            style={{
                                width: 24,
                                height: 24,
                                opacity: (handle in userData) ? 1 : 0.85,
                                marginRight: 5
                            }} />
                        <Text style={{
                            color: (handle in userData) ? colors.antiBackground : colors.foreground1,
                            fontSize: (handle in userData) ? 16 : 15,
                            fontWeight: (handle in userData) ? "bold" : "normal",
                        }}>
                            {(handle in userData) ? "@"+userData[handle] : "not linked"}
                        </Text>
                    </View>
            })}
        </View>
    )
}

export default SocialMediaLinks;