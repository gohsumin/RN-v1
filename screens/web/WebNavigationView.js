import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, useWindowDimensions } from 'react-native';
import AppContext from '../../data/AppContext';
import ThemeContext from '../../data/ThemeContext';
import WebStyleContext from '../../data/WebStyleContext';
import WebNavigationItem from './components/WebNavigationItem';
import { useNavigation } from '@react-navigation/native';

const WebNavigationView = ({ currentRoute, setCurrentRoute }) => {

    const navigation = useNavigation();

    const { theme, user, uid } = React.useContext(AppContext);
    const colors = React.useContext(ThemeContext).colors[theme];
    const {
        getNavigationViewWidth,
        getHeaderScale,
        topSectionHeight,
        topSectionMargin,
        getNavigationViewHeight,
        leftNavigationViewDisappearPoint
    } = React.useContext(WebStyleContext);

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
                    ? topSectionMargin - topSectionHeight * (1 - getHeaderScale(window.width)) / 2
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
                navigate={() => {
                    setCurrentRoute({ routeName: "Home", userName: "" });
                    navigation.navigate("Home");
                }} />

            <WebNavigationItem
                currentRoute={currentRoute}
                routeName={"Explore"}
                iconName={"search-outline"}
                navigate={() => {
                    setCurrentRoute({ routeName: "Explore", userName: "" });
                    navigation.navigate("Explore");
                }} />

            <WebNavigationItem
                currentRoute={currentRoute}
                routeName={"My Profile"}
                iconName={"person-outline"}
                navigate={() => {
                    setCurrentRoute({ routeName: "My Profile", userName: user });
                    navigation.navigate("My Profile", { uid: uid, userName: user });
                }} />

        </View>
    )
}

export default WebNavigationView;