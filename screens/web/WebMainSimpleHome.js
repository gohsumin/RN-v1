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
    const topLogoHeight = 45;
    const paddingTop = 40;
    const paddingBottom = (topHeight - topLogoHeight) / 2 - paddingTop;

    return (
        <View style={{
            flex: 1,
            width: "100%",
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
                        width: 200,
                        height: topLogoHeight,
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
                    height: window.height * 0.09,
                }}
                locations={[0, 1]}
                colors={['transparent', 'black']}
            />
        </View>)
}

export default WebMainSimpleHome;