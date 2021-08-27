import React, { useContext } from 'react';
import { View, useWindowDimensions } from 'react-native';
import AppContext from '../../data/AppContext';
import ThemeContext from '../../data/ThemeContext';
import WebStyleContext from '../../data/WebStyleContext';

const CenterBackground = () => {

    const { getCenterSectionWidth } = useContext(WebStyleContext);
    const window = useWindowDimensions();

    const { theme } = useContext(AppContext);
    const colors = useContext(ThemeContext).colors[theme];

    return (
        <View
            style={{
                position: 'absolute',
                width: getCenterSectionWidth(window.width),
                height: "100%",
                backgroundColor: colors.webMainBackground,
                shadowOpacity: 0.7,
                shadowRadius: 20,
                shadowColor: 'black'
            }}>
        </View>
    )
}

export default CenterBackground;