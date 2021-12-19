import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    Text,
    useWindowDimensions,
} from 'react-native';
import logo_big from "../../assets/SoShNavLogo.png";
import Search from './components/search';
import { Helmet } from "react-helmet";

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
            backgroundColor: "#070707",
        }}>
            <Helmet>
                <meta property='og:title' content='SOSH WORLD' />
                <meta property='og:image' content='https://www.soshworld.com/static/media/SoShNavLogo.4e45a847.png' />
                <meta property='og:description' content='Follow what your favorite influencers are buying.' />
                <meta property='og:url' content='https://www.soshworld.com/' />
            </Helmet>
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