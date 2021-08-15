import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, useWindowDimensions } from 'react-native';
import AppContext from '../../data/AppContext';
import ThemeContext from '../../data/ThemeContext';
import StyleContext from '../../data/StyleContext';
import WebNavigationItem from './components/WebNavigationItem';

const WebNavigationView = ({ navigation, userName }) => {

    const { theme, user, uid } = React.useContext(AppContext);
    const colors = React.useContext(ThemeContext).colors[theme];
    const {
        getNavigationViewWidth,
        getHeaderScale,
        topSectionHeight,
        getNavigationViewHeight,
        leftNavigationViewDisappearPoint
    } = React.useContext(StyleContext).web;

    const { index, routes } = navigation.dangerouslyGetState();
    const routeName = routes[index].name;
    const currentRoute =
        routeName === "Profile" && userName === user ?
            "Profile" :
            routeName === "Profile" && userName !== user ?
                "Home" :
                routeName === "Edit Profile" ?
                    "My Profile" : routeName;

    const window = useWindowDimensions();

    return (

        <View
            style={{
                position: 'absolute',
                flexDirection: window.width < leftNavigationViewDisappearPoint ? 'row' : 'column',
                width: getNavigationViewWidth(window.width),
                height: window.width < leftNavigationViewDisappearPoint &&
                    getNavigationViewHeight(window.width),
                transform: [{
                    scale: getHeaderScale(window.width)
                }],
                justifyContent: 'space-between',
                right: window.width < leftNavigationViewDisappearPoint &&
                    getHeaderScale(window.width) * 100,
                marginRight: - 0.5 * getNavigationViewWidth(window.width) * (1 - getHeaderScale(window.width)),
                top: window.width < leftNavigationViewDisappearPoint
                    ? 5 - topSectionHeight * (1 - getHeaderScale(window.width)) / 2
                    : 130,
                alignSelf: window.width < leftNavigationViewDisappearPoint
                    ? 'flex-end' : 'flex-start',
                alignItems: 'center',
                // borderWidth: 1,
                // borderColor: 'aqua'
            }}>

            <WebNavigationItem
                currentRoute={currentRoute}
                routeName={"Home"}
                iconName={"home-outline"}
                navigate={() => { navigation.navigate("Home"); }} />

            <WebNavigationItem
                currentRoute={currentRoute}
                routeName={"My Profile"}
                iconName={"person-outline"}
                navigate={() => { navigation.navigate("My Profile", { uid: uid }); }} />

            <WebNavigationItem
                currentRoute={currentRoute}
                routeName={"Explore"}
                iconName={"search-outline"}
                navigate={() => { navigation.navigate("Explore"); }} />

        </View>
    )
}

export default WebNavigationView;