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
    const topHeight = 140;
    const topLogoHeight = 50;
    const paddingTop = 45;
    const paddingBottom = (topHeight - topLogoHeight) / 2 - paddingTop;
    const badgeCollapsePoint = 850;
    const badgeTabWidth = 30;
    const badgeHeight = 120;
    const [badgeCollapsed, setBadgeCollapsed] = useState(
        window.width > badgeCollapsePoint ? false : true
    );

    useEffect(() => {
        if (window.width > badgeCollapsePoint) {
            setBadgeCollapsed(false);
        }
    });

    function getWidth(windowWidth) {
        return windowWidth < 400 ? 400 : windowWidth;
    }

    function getBadgeMarginRight(windowWidth) {
        return windowWidth > 1400 ?
            40 :
            windowWidth > 1050 ?
                20 :
                windowWidth > badgeCollapsePoint ?
                    15 : 0;
    }

    function getBadgeHeaderFontSize(windowWidth) {
        return windowWidth > 1400 ?
            27 :
            windowWidth > 1000 ? 25 :
                windowWidth > 920 ? 22 : 20;
    }

    function getBadgeWidth(windowWidth) {
        return windowWidth > 1000 ? 170 :
            windowWidth > 920 ? 140 : 130;
    }

    return (
        <View style={{
            flex: 1,
            width: getWidth(window.width),
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#070707",
            // borderWidth: 1,
            // borderColor: 'orange',
        }}>
            <View style={{
                height: topHeight,
                paddingTop: paddingTop,
                paddingBottom: paddingBottom
            }}>
                <Image
                    source={logo_big}
                    style={{
                        width: 250,
                        height: topLogoHeight,
                        shadowColor: "black",
                        shadowOffset: { width: 2, height: 2 },
                        shadowRadius: 8,
                        // borderWidth: 1,
                        // borderColor: 'orange',
                    }}
                    resizeMode={'contain'}
                />
            </View>
            <Search topHeight={topHeight} />
            <LinearGradient
                style={{
                    position: 'absolute',
                    bottom: 0,
                    width: "100%",
                    height: window.height * 0.05,
                }}
                locations={[0, 1]}
                colors={['transparent', 'black']}
            />

            


        </View>)
}

export default WebMainSimpleHome;