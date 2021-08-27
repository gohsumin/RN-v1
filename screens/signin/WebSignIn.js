import React, { useContext } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    useWindowDimensions,
    StatusBar,
    StyleSheet
} from 'react-native';
import AppContext from '../../data/AppContext';
import WebStyleContext from '../../data/WebStyleContext';
import WebLogin from './components/WebLogin';
import img from "../../assets/SoShNavLogo.png";

function WebSignIn({ navigation }) {

    const window = useWindowDimensions();

    const buttonFontSize = 18;

    const collapsePoint = 890;
    const stickyPaddingPoint = 355;

    const columnHorizontalPadding = 20;

    const columnHeightStickyPoint = 630;

    return (
        window.width < collapsePoint ?

            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: 'black',
                    paddingHorizontal: columnHorizontalPadding,
                    // borderColor: 'pink',
                    // borderWidth: 1
                }}>
                <View
                    style={{
                        width: window.width,
                        height: window.height > columnHeightStickyPoint
                            ? window.height : columnHeightStickyPoint,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        // borderColor: 'pink',
                        // borderWidth: 1
                    }}>
                    <View
                        style={{
                            width: window.width > stickyPaddingPoint
                                ? stickyPaddingPoint - 2 * columnHorizontalPadding
                                : window.width - 2 * columnHorizontalPadding,
                            height: "75%",
                            justifyContent: 'space-between',
                            // borderWidth: 1,
                            // borderColor: 'red',
                        }}>
                        <Image
                            source={img}
                            style={{
                                width: "100%",
                                height: 60,
                                alignSelf: 'center'
                            }}
                            resizeMode="contain"
                        />
                        <View
                            style={{
                                width: "100%",
                                // borderWidth: 1,
                                // borderColor: 'pink',
                            }}>
                            <Text
                                style={{
                                    width: "100%",
                                    fontSize: 35,
                                    fontWeight: '200',
                                    color: 'white',
                                    // textAlign: 'center',
                                    // borderWidth: 1,
                                    // borderColor: 'pink',
                                }}>
                                Real purchases{" "}
                            </Text>
                            <Text
                                style={{
                                    width: "100%",
                                    fontSize: 26,
                                    fontWeight: '500',
                                    color: "#ff458c",
                                    textAlign: 'right',
                                    marginTop: 6,
                                    // borderWidth: 1,
                                    // borderColor: 'pink',
                                }}>
                                by the people you admire.
                            </Text>
                        </View>
                        <View>
                            <WebLogin navigation={navigation} />
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Sign Up");
                                }}
                                style={{
                                    justifyContent: 'center',
                                    marginTop: 20,
                                    // borderWidth: 1,
                                    // borderColor: 'pink'
                                }}>
                                <Text style={{
                                    textAlign: 'center',
                                    color: 'gray',
                                    fontSize: buttonFontSize,
                                }}>
                                    Don't have an account?
                                    <Text
                                        style={{
                                            fontWeight: 'bold'
                                        }}> Sign Up </Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            :

            <View
                style={{
                    flex: 1,
                    backgroundColor: 'black',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingVertical: 140,
                    justifyContent: 'center',
                    // borderColor: 'pink',
                    // borderWidth: 1
                }}
            >

                {/* Left section with logo */}
                <View
                    style={{
                        height: "100%",
                        alignItems: 'flex-end',
                        // borderWidth: 1,
                        // borderColor: 'gray'
                    }}>
                    <View
                        style={{
                            width: 380,
                            height: "100%",
                            justifyContent: 'space-between',
                            // borderWidth: 1,
                            // borderColor: 'red',
                        }}>
                        <Text
                            style={{
                                top: 0,
                                fontSize: '4rem', //65,
                                fontWeight: '200',
                                color: 'white',
                                textAlign: 'right',
                                textAlignVertical: 'top',
                                // borderWidth: 1,
                                // borderColor: 'pink',
                            }}>
                            Real purchases{"\n"}
                        </Text>
                        <Text
                            style={{
                                bottom: 0,
                                width: "100%",
                                fontSize: 65,
                                fontWeight: '600',
                                color: "#ff458c",
                                textAlign: 'left',
                                textAlignVertical: 'bottom',
                                // borderWidth: 1,
                                // borderColor: 'pink',
                            }}>
                            By the people you admire.
                        </Text>
                    </View>
                </View>

                {/* vertical bar */}
                <View
                    style={{
                        width: 0,
                        height: "110%",
                        marginHorizontal: window.width * 0.04,
                        borderWidth: 0.1,
                        borderColor: "#db2e70",
                    }} />

                {/* view on the right side */}
                <View
                    style={{
                        height: "100%",
                        alignItems: 'flex-start',
                        // borderWidth: 1,
                        // borderColor: 'pink'
                    }}>

                    <View
                        style={{
                            width: 360,
                            height: "100%",
                            justifyContent: 'space-between',
                            paddingTop: 20,
                            paddingBottom: 10,
                            // borderWidth: 1,
                            // borderColor: 'pink'
                        }}>

                        <Image
                            source={img}
                            style={{
                                width: "70%",
                                height: "15%",
                                alignSelf: 'center',
                                opacity: 0.8
                            }}
                            resizeMode="contain"
                        />

                        <WebLogin navigation={navigation} />
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Sign Up");
                            }}
                            style={{
                                justifyContent: 'center',
                                // borderWidth: 1,
                                // borderColor: 'pink'
                            }}>
                            <Text style={{
                                textAlign: 'center',
                                color: 'gray',
                                fontSize: buttonFontSize,
                            }}>
                                Don't have an account?
                                <Text
                                    style={{
                                        fontWeight: 'bold'
                                    }}> Sign Up </Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
    )
}

export default WebSignIn;