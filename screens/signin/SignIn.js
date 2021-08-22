import React, { useContext } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
    useWindowDimensions,
    StatusBar,
} from 'react-native';
import AppContext from '../../data/AppContext';

function SignIn({ navigation }) {

    const window = useWindowDimensions();

    const { platform } = useContext(AppContext);

    const buttonFontSize = 23;
    const buttonBorderRadius = 15;

    return (
        <ScrollView style={{ flex: 1 }}>
            <View
                style={{
                    width: window.width,
                    height: window.height - (platform === "web" ? 0 : StatusBar.currentHeight),
                    backgroundColor: 'black',
                    borderColor: 'pink',
                    borderWidth: 1
                }}
            >
                <Image
                    source={require('../../assets/SoShNavLogo.png')}
                    style={{
                        width: "60%",
                        height: "52%",
                        resizeMode: 'contain',
                        alignSelf: 'center',
                        marginTop: 60,
                    }}
                />
                <View
                    style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 130
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Login");
                        }}
                        style={{
                            paddingHorizontal: 25,
                            paddingVertical: 15,
                            borderRadius: buttonBorderRadius,
                            backgroundColor: "#56626f",
                            marginRight: 30,
                            justifyContent: 'center',
                            alignSelf: 'flex-end'
                        }}>
                        <Text style={{
                            textAlign: 'center',
                            color: '#fffbfb',
                            fontSize: buttonFontSize, fontWeight: 'bold'
                        }}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        position: 'absolute',
                        bottom: 60,
                        right: 0
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Sign Up");
                        }}
                        style={{
                            paddingHorizontal: 32,
                            paddingVertical: 15,
                            borderRadius: buttonBorderRadius,
                            backgroundColor: "#83F52C",
                            marginRight: 30,
                            justifyContent: 'center',
                            alignSelf: 'flex-end'
                        }}>
                        <Text style={{
                            textAlign: 'center',
                            color: 'black',
                            fontSize: buttonFontSize,
                            fontWeight: 'bold'
                        }}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>

        </ScrollView>
    )
}

export default SignIn;
