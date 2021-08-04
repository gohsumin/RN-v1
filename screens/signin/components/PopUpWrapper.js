import React from 'react';
import { ScrollView, View, Image, Dimensions } from 'react-native';

function PopupWrapper({ children }) {

    const popUpBackground = "#202225";
    const WINDOW_HEIGHT = Dimensions.get('window').height;

    return (
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 30,
                }}>
                <Image
                    style={{
                        alignSelf: 'center',
                        top: 50,
                        height: 45,
                    }}
                    resizeMode={'contain'}
                    fadeDuration={0}
                    source={require("../../../assets/SoShNavLogo.png")} />
                {children}
            </View>
    )
}

export default PopupWrapper;