import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, useWindowDimensions } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import AppContext from '../../data/AppContext';
import ThemeContext from '../../data/ThemeContext';
import StyleContext from '../../data/StyleContext';

const WebNavigationLeftView = ({ navigation, userName }) => {

    const { theme, user, uid } = React.useContext(AppContext);
    const colors = React.useContext(ThemeContext).colors[theme];
    const {
        getDynamicLeftViewWidth,
        getLeftViewFontSize,
        getLeftViewButtonWidth,
        getLeftViewIconSize,
        getLeftViewHeight
    } = React.useContext(StyleContext).web;

    const { index, routes } = navigation.dangerouslyGetState();
    const routeName = routes[index].name;
    const currentRoute =
        routeName === "Profile" && userName === user ?
            "Profile" :
            routeName === "Profile" && userName !== user ?
                "Home" : routeName;

    const window = useWindowDimensions();
    const [collapse, setCollapse] = useState(false);
    const [horizontalPadding, setHorizontalPadding] = useState()

    return (
        <View
            style={{
                position: 'absolute',
                top: 10,
                width: getDynamicLeftViewWidth(window.width),
                height: getLeftViewHeight(window.width),
                justifyContent: 'space-between',
                top: 96,
                left: 0,
                padding: 7,
                alignItems: 'center',
                // borderWidth: 1,
                // borderColor: 'red',
            }}>
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    width: getLeftViewButtonWidth(window.width),
                    alignItems: 'center',
                    opacity: currentRoute === "Home" ? 0.8 : 0.4,
                    // borderWidth: 1,
                    // borderColor: 'orange',
                }}
                onPress={() => {
                    navigation.navigate("Home");
                }}>
                <Icon
                    name={currentRoute === "Home" ? "home-outline" : "home-outline"}
                    size={getLeftViewIconSize(window.width)}
                    color={colors.green}
                    style={{
                        textShadowColor: currentRoute === "Home" ? colors.green : 'black',
                        textShadowRadius: 7,
                        textShadowOpacity: 1,
                    }} />
                {!collapse &&
                    <Text
                        style={{
                            fontSize: getLeftViewFontSize(window.width, currentRoute === "Home"),
                            color: colors.antiBackground,
                            fontWeight: currentRoute === "Home" ? '600' : '500',
                            textShadowColor: currentRoute === "Home" ? "#222" : 'black',
                            textShadowRadius: 7,
                            textShadowOpacity: 1,
                        }}>
                        {"  Home"}
                    </Text>}
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    width: getLeftViewButtonWidth(window.width),
                    alignItems: 'center',
                    opacity: currentRoute === "My Profile" ? 0.8 : 0.4,
                    // borderWidth: 1,
                    // borderColor: 'orange',
                }}
                onPress={() => {
                    console.log("navigating to " + uid + "'s profile");
                    navigation.navigate("My Profile", { uid: uid });
                }}>
                <Icon
                    name={currentRoute === "Profile" ? "person-outline" : "person-outline"}
                    size={getLeftViewIconSize(window.width)}
                    color={colors.green}
                    style={{
                        textShadowColor: currentRoute === "Profile" ? colors.green : 'black',
                        textShadowRadius: 7,
                        textShadowOpacity: 1,
                    }} />
                {!collapse && <Text
                    style={{
                        fontSize: getLeftViewFontSize(window.width, currentRoute === "Profile"),
                        color: colors.antiBackground,
                        fontWeight: currentRoute === "Profile" ? '600' : '500',
                        textShadowColor: currentRoute === "Profile" ? "#222" : 'black',
                        textShadowRadius: 7,
                        textShadowOpacity: 1,
                    }}>
                    {"  My Profile"}
                </Text>}
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    width: getLeftViewButtonWidth(window.width),
                    alignItems: 'center',
                    opacity: currentRoute === "Explore" ? 0.8 : 0.4,
                    // borderWidth: 1,
                    // borderColor: 'orange',
                }}
                onPress={() => {

                }}>
                <Icon
                    name={currentRoute === "Explore" ? "search-outline" : "search-outline"}
                    size={getLeftViewIconSize(window.width)}
                    color={colors.green}
                    style={{
                        textShadowColor: currentRoute === "Explore" ? colors.green : 'black',
                        textShadowRadius: 7,
                        textShadowOpacity: 1,
                    }} />
                {!collapse && <Text
                    style={{
                        fontSize: getLeftViewFontSize(window.width, currentRoute === "Explore"),
                        color: colors.antiBackground,
                        fontWeight: currentRoute === "Explore" ? '600' : '500',
                        textShadowColor: currentRoute === "Explore" ? "#222" : 'black',
                        textShadowRadius: 7,
                        textShadowOpacity: 1,
                    }}>
                    {"  Explore"}
                </Text>}
            </TouchableOpacity>
        </View>
    )
}

export default WebNavigationLeftView;