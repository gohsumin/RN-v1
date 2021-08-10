import React from 'react';
import { View } from 'react-native';
import AppContext from '../../data/AppContext';
import ThemeContext from '../../data/ThemeContext';
import StyleContext from '../../data/StyleContext';
import { LinearGradient } from 'expo-linear-gradient';

const WebBackgroundView = () => {

    const { theme } = React.useContext(AppContext);
    const colors = React.useContext(ThemeContext).colors[theme];
    const webCenterSectionWidth = React.useContext(StyleContext).web.centerSectionWidth;

    return (
        <LinearGradient
            style={{
                flex: 1,
                position: 'absolute',
                width: "100%",
                height: "100%"
            }}
            colors={['black', 'transparent']}
            locations={[0, 0.14]}
            pointerEvents="none">
            <View
                style={{
                    width: webCenterSectionWidth,
                    height: "100%",
                    borderRadius: 2,
                    top: 0,
                    position: 'absolute',
                    alignSelf: 'center',
                    shadowOpacity: 0.4,
                    shadowColor: 'black',
                    shadowRadius: 25,
                    overflow: 'visible',
                }} />
        </LinearGradient>
    )
}

export default WebBackgroundView;