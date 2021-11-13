import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    useWindowDimensions,
} from 'react-native';
import WebLogin from '../signin/components/WebLogin';
import img from "../../assets/SoShNavLogo.png";

function WebMainSimpleHome({ navigation }) {

    const window = useWindowDimensions();

    const buttonFontSize = 18;

    const collapsePoint = 890;
    const stickyPaddingPoint = 355;

    const columnHorizontalPadding = 20;

    const columnHeightStickyPoint = 630;

    function getHorLayoutHeight(windowHeight) {
        return windowHeight > 700 ?
            700 :
            windowHeight < 620 ?
                620 : windowHeight;
    }

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
                    height: getHorLayoutHeight(window.height),
                    backgroundColor: 'black',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    borderColor: 'pink',
                    borderWidth: 1
                }}
            >

                {/* Left section with logo */}
                <View
                    style={{
                        height: getHorLayoutHeight(window.height) - 175,
                        alignItems: 'space-between',
                        // borderWidth: 1,
                        // borderColor: 'gray'
                    }}>

                    <Image
                        source={img}
                        style={{
                            width: 200,
                            height: 120,
                            alignSelf: 'center',
                            opacity: 0.8,
                            // borderWidth: 1,
                            // borderColor: 'gray'
                        }}
                        resizeMode="contain"
                    />
                    <View
                        style={{
                            width: 380,
                            height: "100%",
                            flex: 1,
                            justifyContent: 'space-between',
                            // borderWidth: 1,
                            // borderColor: 'red',
                        }}>
                        <View style={{
                            flexBasis: 25,
                            flexShrink: 1,
                            flexGrow: 1,
                            // borderWidth: 1,
                            // borderColor: 'cyan',
                        }} />
                        <Text
                            style={{
                                top: 0,
                                fontSize: 45,
                                flexGrow: 1,
                                flexShrink: 2,
                                fontWeight: '200',
                                color: 'white',
                                textAlign: 'right',
                                textAlignVertical: 'top',
                                // borderWidth: 1,
                                // borderColor: 'pink',
                            }}>
                            Real purchases{"\n"}
                        </Text>
                        <View style={{
                            flexBasis: 25,
                            flexShrink: 1,
                            flexGrow: 1,
                            // borderWidth: 1,
                            // borderColor: 'cyan',
                        }} />
                        <Text
                            style={{
                                bottom: 0,
                                width: "100%",
                                fontSize: 45,
                                flexGrow: 1,
                                flexShrink: 2,
                                fontWeight: '600',
                                color: "#ff458c",
                                textAlign: 'left',
                                textAlignVertical: 'bottom',
                                // borderWidth: 1,
                                // borderColor: 'pink',
                            }}>
                            By the people you admire.
                        </Text>
                        <View style={{
                            flexBasis: 25,
                            flexShrink: 1,
                            flexGrow: 1,
                            // borderWidth: 1,
                            // borderColor: 'cyan',
                        }} />
                        <View style={{
                            flexBasis: 60,
                            flexShrink: 1,
                            flexGrow: 1,
                            flexDirection: "row"
                        }}>

                        </View>
                    </View>
                </View>

                {/* vertical bar */}
                <View
                    style={{
                        width: 0,
                        height: getHorLayoutHeight(window.height) - 160,
                        marginVertical: 80,
                        marginHorizontal: window.width * 0.04,
                        borderWidth: 0.1,
                        borderColor: "#db2e70",
                    }} />

                {/* view on the right side */}
                <View
                    style={{
                        height: getHorLayoutHeight(window.height) - 175,
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

export default WebMainSimpleHome;