import React from 'react';
import {
    View,
    Image,
    Text,
    useWindowDimensions,
} from 'react-native';
import logo from "../../assets/logo.png";
import logo_big from "../../assets/SoShNavLogo.png";
import Search from './components/search';
import { LinearGradient } from 'expo-linear-gradient';

function WebMainSimpleHome() {

    const window = useWindowDimensions();
    const topHeight = 140;
    const topLogoHeight = 50;
    const paddingTop = 45;
    const paddingBottom = (topHeight - topLogoHeight) / 2 - paddingTop;

    function getWidth(windowWidth) {
        return windowWidth < 400 ? 400 : windowWidth;
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