import React, { useContext } from 'react';
import {
    Text,
    TouchableOpacity,
    useWindowDimensions
} from "react-native";
import AppContext from "../../../data/AppContext";
import ThemeContext from "../../../data/ThemeContext";
import StyleContext from '../../../data/StyleContext';
import Icon from "react-native-vector-icons/Ionicons";

function WebNavigationItem({ currentRoute, routeName, iconName, navigate }) {

    const { theme } = useContext(AppContext);
    const colors = useContext(ThemeContext).colors[theme];
    const {
        getNavigationViewFontSize,
        getNavigationViewButtonWidth,
        getNavigationViewIconSize,
    } = useContext(StyleContext).web;
    const window = useWindowDimensions();

    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                width: getNavigationViewButtonWidth(window.width),
                alignItems: 'center',
                opacity: currentRoute === routeName ? 0.8 : 0.4,
                borderWidth: 1,
                borderColor: 'orange',
            }}
            onPress={navigate}>
            <Icon
                name={iconName}
                size={getNavigationViewIconSize(window.width)}
                color={colors.green}
                style={{
                    textShadowColor: currentRoute === routeName ? colors.green : 'black',
                    textShadowRadius: 7,
                }} />
            <Text
                style={{
                    fontSize: getNavigationViewFontSize(window.width, currentRoute === routeName),
                    color: colors.antiBackground,
                    fontWeight: currentRoute === routeName ? '600' : '500',
                    textShadowColor: currentRoute === routeName ? "#222" : 'black',
                    textShadowRadius: 7,
                }}>
                {"  " + routeName}
            </Text>
        </TouchableOpacity>
    )
}

export default WebNavigationItem;