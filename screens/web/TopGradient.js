import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import AppContext from '../../data/AppContext';
import ThemeContext from '../../data/ThemeContext';
import WebStyleContext from '../../data/WebStyleContext';
import { LinearGradient } from 'expo-linear-gradient';

const TopGradient = () => {

    const { theme } = React.useContext(AppContext);
    const colors = React.useContext(ThemeContext).colors[theme];
    const window = useWindowDimensions();
    const { getCenterSectionWidth } = React.useContext(WebStyleContext);

    return (
        <LinearGradient
            style={{
                flex: 1,
                position: 'absolute',
                width: "100%",
                height: "100%",
                // borderWidth: 1,
                // borderColor: "salmon"
            }}
            colors={['rgba(0, 0, 0, 0.35)', 'transparent']}
            locations={[0, 0.18]}
            pointerEvents="none">
        </LinearGradient>
    )
}

export default TopGradient;