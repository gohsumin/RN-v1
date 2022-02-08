import React, { useContext } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    useWindowDimensions,
    StatusBar,
    Platform
} from 'react-native';
import AppContext from '../../data/AppContext';

function SignIn({ navigation }) {

    const window = useWindowDimensions();

    return (
        <View
            style={{
                width: "100%",
                height: window.height,// - StatusBar.currentHeight,
                backgroundColor: 'black',
                justifyContent: "space-between",
                // borderColor: 'pink',
                // borderWidth: 1
            }}
        >
            <Image
                source={require('../../assets/logo.png')}
                style={{
                    width: Platform.OS === "ios" ? 200 : 170,
                    height:Platform.OS === "ios" ? 200 : 170,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                    marginTop: Platform.OS === "ios" ? "60%" : "50%",
                }}
            />

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Enter Phone Number");
                }}
                style={{
                    borderRadius: 15,
                    backgroundColor: "rgb(118, 250, 76)",
                    marginBottom: 35,
                    marginHorizontal: 25,
                    padding: 17,
                    justifyContent: 'center',
                }}>
                <Text style={{
                    textAlign: 'center',
                    color: 'black',
                    fontSize: 20,
                    fontWeight: 'bold',
                    letterSpacing: 0.1,
                }}>
                    Sign in with Phone
                </Text>
            </TouchableOpacity>

        </View>
    )
}

export default SignIn;
