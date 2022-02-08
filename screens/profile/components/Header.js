import React from 'react';
import { Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppContext from '../../../data/AppContext';
import ThemeContext from '../../../data/ThemeContext';

function Header(props) {

    const WINDOW_WIDTH = Dimensions.get('window').width;
    const { theme } = React.useContext(AppContext);
    const colors = React.useContext(ThemeContext).colors[theme];

    return (
        <LinearGradient
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: WINDOW_WIDTH,
                height: Platform.OS === "android" ? 83 : 110,
                borderBottomColor: colors.background4,
                borderBottomWidth: 0.17,
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingBottom: 10,
            }}
            colors={colors.headerGradient}
            locations={[0.3, 1]}>
        </LinearGradient>
    )
}

export default Header;