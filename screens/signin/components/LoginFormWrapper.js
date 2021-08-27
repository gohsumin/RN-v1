import React from 'react';
import { ScrollView, View, Image, Dimensions } from 'react-native';
//import img from "../../../assets/SoShNavLogo.png";
import img from "../../../assets/logo.png";
import AppContext from '../../../data/AppContext';

function LoginFormWrapper({ children }) {

    const popUpBackground = "#202225";
    const WINDOW_HEIGHT = Dimensions.get('window').height;
    const { platform } = React.useContext(AppContext);

    return (
            <View
                style={{
                    flex: 1,
                    padding: 30,
                }}>
                <Image
                    style={{
                        alignSelf: 'center',
                        height: platform === "web" ? 100 : 45,
                        width: "100%",
                        opacity: 0.9
                    }}
                    resizeMode={'contain'}
                    fadeDuration={0}
                    source={img} />
                {children}
            </View>
    )
}

export default LoginFormWrapper;