import React, { useContext } from 'react';
import { View, Image, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import AppContext from '../../data/AppContext';
import ThemeContext from '../../data/ThemeContext';
import WebStyleContext from '../../data/WebStyleContext';
import WebNavigationContext from '../../data/WebNavigationContext';
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';

const WebHeaderView = () => {

    const navigation = useNavigation();

    const { theme } = useContext(AppContext);
    const colors = useContext(ThemeContext).colors[theme];
    const { currentRoute, setCurrentRoute } = useContext(WebNavigationContext);
    const {
        getCenterSectionWidth,
        originalCenterSectionWidth,
        leftPaddingStickPoint,
        topSectionHeight,
        topSectionMargin,
        getHeaderWidth,
        getHeaderScale,
        getNavigationViewButtonWidth,
        getNavigationViewWidth,
        logoCollapsePoint,
        leftNavigationViewDisappearPoint,
    } = useContext(WebStyleContext);

    const routeName = currentRoute.routeName;
    const userName = currentRoute.userName;

    const window = useWindowDimensions();

    function back() {
        // routes of the RootStackNavigator
        const rootStackRoutes = navigation.dangerouslyGetState();

       //console.log(rootStackRoutes);

        // routes of WebMain
        const webMainRoutes = rootStackRoutes.routes[1].state.routes;

       //console.log(webMainRoutes);

        const previousIndex = webMainRoutes.length - 2;
        if (previousIndex < 0) {
            setCurrentRoute({ routeName: "Home", userName: "" });
            navigation.navigate("Home");
        }
        else {
            const prevRouteName = webMainRoutes[previousIndex].name;
            const prevUserName = webMainRoutes[previousIndex].params
                ? webMainRoutes[previousIndex].params.userName
                : "";
            setCurrentRoute({ routeName: prevRouteName, userName: prevUserName });
            navigation.navigate(prevRouteName);
        }
    }

    return (
        <View
            style={{
                position: 'absolute',
                width: getHeaderWidth(window.width),
                height: topSectionHeight,
                top: topSectionMargin - topSectionHeight * (1 - getHeaderScale(window.width)) / 2,
                left: -1 * getHeaderWidth(window.width) * (1 - getHeaderScale(window.width)) / 2,
                transform: [{
                    scale: getHeaderScale(window.width)
                }],
                // borderWidth: 1,
                // borderColor: 'cyan'
            }}>

            {/* header background */}
            <View
                style={{
                    width: "100%", //window.width < leftNavigationViewDisappearPoint ? "100%" : 706,
                    height: "100%",
                    position: 'absolute',
                    paddingLeft: 20,
                    backgroundColor: "#222",
                    // borderRadius: window.width < leftNavigationViewDisappearPoint ? 0  : 10,
                    shadowColor: 'black',
                    shadowOpacity: 0.2,
                    shadowRadius: 15,
                    shadowOffset: { width: 0, height: 0 }
                }}>
            </View>

            {/* middle section */}
            <View style={{
                width: window.width < originalCenterSectionWidth
                    ? "100%" : getCenterSectionWidth(window.width),
                height: "100%",
                position: 'absolute',
                flexDirection: 'row',
                alignSelf: 'center',
                alignItems: 'center',
                paddingLeft: window.width > originalCenterSectionWidth + 90 ? 0 : 35,
                // borderWidth: 1,
                // borderColor: 'pink',
            }}>
                <TouchableOpacity
                    style={{
                        //width: 50,
                        height: "100%",
                        position: 'absolute',
                        justifyContent: 'center',
                        left: window.width > originalCenterSectionWidth + 90 ? -35 : 4,
                        // borderWidth: 1,
                        // borderColor: 'blue',
                    }}
                    onPress={back}>
                    <Icon
                        name="chevron-back"
                        size={27}
                        color={colors.background1}
                        style={{
                            textShadowColor: 'black',
                            textShadowRadius: 3,
                            // borderWidth: 1,
                            // borderColor: 'red',
                        }}
                    />
                </TouchableOpacity>

                <View
                    style={{
                        width: 0,
                        height: 45,
                        borderColor: colors.background2,
                        borderWidth: 0.1,
                    }} />
                {(userName !== "") ?
                    <View style={{
                        marginLeft: 16,
                        marginBottom: 3,
                    }}>
                        <Text
                            style={{
                                color: colors.antiBackground,
                                opacity: 0.8,
                                fontSize: 25,
                                fontWeight: '400',
                                textShadowColor: 'black',
                                textShadowRadius: 3,
                                //textShadowOpacity: 1,
                            }}>
                            {routeName}
                        </Text>
                        <Text
                            style={{
                                color: colors.background1,
                                fontSize: 18,
                                fontWeight: '500',
                            }}>
                            {userName}
                        </Text>
                    </View> :
                    <View style={{
                        marginLeft: 16,
                        marginBottom: 3,
                    }}>
                        <Text
                            style={{
                                color: colors.antiBackground,
                                opacity: 0.8,
                                fontSize: 25,
                                fontWeight: '400',
                                textShadowColor: 'black',
                                textShadowRadius: 3,
                            }}>
                            {routeName}
                        </Text>
                    </View>
                }
            </View>

            {/* logo at top left or top right */}
            <View
                style={{
                    position: 'absolute',
                    height: topSectionHeight,
                    width: window.width < leftNavigationViewDisappearPoint ? 100 : getNavigationViewWidth(window.width),
                    justifyContent: 'center',
                    alignItems: window.width < leftNavigationViewDisappearPoint ?
                        'flex-end' :
                        window.width < logoCollapsePoint ?
                            'flex-start' :
                            'center',
                    alignSelf: window.width < leftNavigationViewDisappearPoint ? 'flex-end' : 'flex-start',
                    right: window.width < leftNavigationViewDisappearPoint && 10,
                    left: (window.width < logoCollapsePoint &&
                        window.width >= leftNavigationViewDisappearPoint) && 14,
                    marginLeft: window.width > leftPaddingStickPoint && topSectionHeight - 75,
                    // borderWidth: 1,
                    // borderColor: 'aqua',
                }}>
                <View
                    style={{
                        width: window.width < logoCollapsePoint ? 60 : getNavigationViewButtonWidth(window.width),
                        height: "100%",
                        justifyContent: 'center',
                        // borderWidth: 1,
                        // borderColor: 'red',
                    }}>
                    <Image
                        style={{
                            width: "80%",
                            height: "60%",
                            alignSelf: 'flex-start',
                            shadowColor: 'black',
                            shadowRadius: 5,
                            shadowOpacity: 1,
                            opacity: 0.85,
                            // borderWidth: 1,
                            // borderColor: 'yellow',
                        }}
                        resizeMode='contain'
                        source={(window.width < logoCollapsePoint) ?
                            require('../../assets/logo.png') :
                            require('../../assets/SoShNavLogo.png')} />
                </View>
            </View>
        </View >
    )
}

export default WebHeaderView;