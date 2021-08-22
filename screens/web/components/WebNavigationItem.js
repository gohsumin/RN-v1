import React, { useContext, useEffect, useState } from 'react';
import {
    Text,
    TouchableOpacity,
    useWindowDimensions
} from "react-native";
import AppContext from "../../../data/AppContext";
import ThemeContext from "../../../data/ThemeContext";
import WebStyleContext from '../../../data/WebStyleContext';
import WebNavigationContext from '../../../data/WebNavigationContext';
import Icon from "react-native-vector-icons/Ionicons";

function WebNavigationItem({ routeName, iconName, navigate }) {

    const { theme } = useContext(AppContext);
    const colors = useContext(ThemeContext).colors[theme];
    const { currentRoute, setCurrentRoute } = useContext(WebNavigationContext);
    const {
        getNavigationViewFontSize,
        getNavigationViewButtonWidth,
        getNavigationViewIconSize,
        leftNavigationViewDisappearPoint
    } = useContext(WebStyleContext);
    const selected = currentRoute.routeName === routeName;
    
    const window = useWindowDimensions();

    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                width: getNavigationViewButtonWidth(window.width),
                marginVertical: window.width >= leftNavigationViewDisappearPoint && 10,
                alignItems: 'center',
                opacity: selected ? 0.8 : 0.4,
                // borderWidth: 1,
                // borderColor: 'orange',
            }}
            onPress={() => {
                navigate();
            }}>
            <Icon
                name={iconName}
                size={getNavigationViewIconSize(window.width)}
                color={/* colors.green */ colors.antiBackground}
                style={{
                    textShadowColor: selected ? /* colors.green */ "#222" : 'black',
                    textShadowRadius: 7,
                }} />
            <Text
                style={{
                    fontSize: getNavigationViewFontSize(window.width, selected),
                    color: colors.antiBackground,
                    fontWeight: selected ? '600' : '500',
                    textShadowColor: selected ? "#222" : 'black',
                    textShadowRadius: 7,
                }}>
                {"  " + routeName}
            </Text>
        </TouchableOpacity>
    )
}

export default WebNavigationItem;