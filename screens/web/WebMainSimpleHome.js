import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    Text,
    useWindowDimensions,
} from 'react-native';
import logo_big from "../../assets/SoShNavLogo.png";
import Search from './components/search';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';
import { EvilIcons } from '@expo/vector-icons';

function WebMainSimpleHome() {

    const window = useWindowDimensions();
    const spacing = window.height > 1200 ? 40 : 20;

    function getLogoHeight(windowHeight) {
        return windowHeight > 1300 ?
            60 :
            windowHeight > 700 ?
                50 :
                windowHeight > 385 ?
                    45 : 40;
    }

    function getTopHeight(windowHeight) {
        return getLogoHeight(windowHeight) * 2.5;
    }

    return (
        <View style={{
            flex: 1,
            width: "100%",
            alignSelf: "center",
            alignItems: "center",
            // justifyContent: "center",
            backgroundColor: "#070707",
            // borderWidth: 1,
            // borderColor: 'orange',
        }}>
            <View style={{
                height: getTopHeight(window.height),
                justifyContent: "center",
                // borderWidth: 1,
                // borderColor: 'orange',
            }}>
                <Image
                    source={logo_big}
                    style={{
                        // position: "absolute",

                        height: getLogoHeight(window.height),
                        width: getLogoHeight(window.height) * 5,
                        marginTop: 2,
                        shadowColor: "black",
                        shadowOffset: { width: 2, height: 2 },
                        shadowRadius: 8,
                        // borderWidth: 1,
                        // borderColor: 'orange',
                    }}
                    resizeMode='contain'
                    resizeMethod="scale"
                />
            </View>
            <Search
                topHeight={getTopHeight(window.height)}
                spacing={spacing} />
        </View>)
}

export default WebMainSimpleHome;