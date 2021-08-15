import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import AppContext from '../../data/AppContext';
import ThemeContext from '../../data/ThemeContext';
import StyleContext from '../../data/StyleContext';
import { LinearGradient } from 'expo-linear-gradient';

const WebBackgroundView = () => {

    const { theme } = React.useContext(AppContext);
    const colors = React.useContext(ThemeContext).colors[theme];
    const window = useWindowDimensions();
    const { getCenterSectionWidth } = React.useContext(StyleContext).web;

    return (
        <LinearGradient
            style={{
                flex: 1,
                position: 'absolute',
                width: "100%",
                height: "100%"
            }}
            colors={['rgba(0, 0, 0, 0.3)', 'transparent']}
            locations={[0, 0.18]}
            pointerEvents="none">
            <View
                style={{
                    width: getCenterSectionWidth(window.width),
                    height: "100%",
                    borderRadius: 2,
                    top: 0,
                    position: 'absolute',
                    alignSelf: 'center',
                    shadowOpacity: 0.5,
                    shadowColor: 'black',
                    shadowRadius: 25,
                    overflow: 'visible',
                }} />
        </LinearGradient>
    )
}

export default WebBackgroundView;