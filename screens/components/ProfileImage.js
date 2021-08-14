import React, { useContext } from 'react';
import { Image } from 'react-native';
import AppContext from '../../data/AppContext';
import ThemeContext from '../../data/ThemeContext';

function ProfileImage({ sideLength, source, }) {

    const { theme } = useContext(AppContext);
    const colors = useContext(ThemeContext).colors[theme];

    return (
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
    )
}

export default ProfileImage;