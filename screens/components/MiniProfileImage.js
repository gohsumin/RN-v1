import React, { useContext } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import AppContext from '../../data/AppContext';
import ThemeContext from '../../data/ThemeContext';

function MiniProfileImage({ sideLength, source, navigate }) {

    const { theme } = useContext(AppContext);
    const colors = useContext(ThemeContext).colors[theme];

    return (
        <TouchableOpacity
            onPress={navigate}>
            <Image
                fadeDuration={0}
                source={source}
                style={{
                    width: sideLength,
                    height: sideLength,
                    marginTop: -4,
                    borderRadius: sideLength / 2,
                    alignSelf: "flex-start",
                    shadowColor: colors.background,
                    shadowOpacity: 0.6,
                    shadowRadius: 10,
                }}
            />
        </TouchableOpacity>
    )
}

export default MiniProfileImage;