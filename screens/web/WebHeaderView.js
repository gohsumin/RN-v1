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
        topSectionHeight,
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

    return (
        <View
            style={{
                position: 'absolute',
                width: getHeaderWidth(window.width),
                height: topSectionHeight,
                top: 5 - topSectionHeight * (1 - getHeaderScale(window.width)) / 2,
                transform: [{
                    scale: getHeaderScale(window.width)
                }],
                // borderWidth: 1,
                // borderColor: 'cyan'
            }}>

            {/* back arrow button */}
            <View
                style={{
                    width: window.width < leftNavigationViewDisappearPoint ? "100%" : 706,
                    height: "100%",
                    position: 'absolute',
                    flexDirection: 'row',
                    paddingLeft: 20,
                    alignSelf: 'center',
                    alignItems: 'center',
                    backgroundColor: "#222",
                    borderRadius: window.width < leftNavigationViewDisappearPoint ? 0 : 13,
                    shadowColor: 'black',
                    shadowOpacity: 0.5,
                    shadowRadius: 15,
                    shadowOffset: { width: 0, height: 5 }
                }}>
                <TouchableOpacity
                    onPress={() => {
                        // routes of the RootStackNavigator
                        const rootStackRoutes = navigation.dangerouslyGetState();
                        const webMainRoutes = rootStackRoutes.routes[0].state.routes;
                        const previousIndex = webMainRoutes.length - 2;
                        if (previousIndex < 0) {
                            setCurrentRoute({ routeName: "Home", userName: "" });
                        }
                        else {
                            const prevRouteName = webMainRoutes[previousIndex].name;
                            const prevUserName = webMainRoutes[previousIndex].params
                                ? webMainRoutes[previousIndex].params.userName
                                : "";
                            setCurrentRoute({ routeName: prevRouteName, userName: prevUserName });
                        }
                        navigation.goBack();
                    }}>
                    <Icon
                        name="chevron-back"
                        size={30}
                        color={colors.foreground1}
                        style={{
                            textShadowColor: 'black',
                            textShadowRadius: 3,
                            //textShadowOpacity: 1,
                        }}
                    />
                </TouchableOpacity>

                {/* header title */}
                <View
                    style={{
                        width: 0,
                        height: 45,
                        borderColor: colors.foreground2,
                        borderWidth: 0.1,
                        marginLeft: 13
                    }} />
                {(userName !== "") ?
                    <View style={{
                        marginLeft: 14,
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
                            Profile
                        </Text>
                        <Text
                            style={{
                                color: colors.foreground1,
                                fontSize: 18,
                                fontWeight: '500',
                            }}>
                            {userName}
                        </Text>
                    </View> :
                    <View style={{
                        marginLeft: 14,
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
                    // borderWidth: 1,
                    // borderColor: 'aqua',
                }}>
                <View
                    style={{
                        width: window.width < logoCollapsePoint ? 60 : getNavigationViewButtonWidth(window.width),
                        height: "100%",
                        // borderWidth: 1,
                        // borderColor: 'red',
                    }}>
                    <Image
                        style={{
                            width: "80%",
                            height: "100%",
                            alignSelf: 'flex-start',
                            shadowColor: 'black',
                            shadowRadius: 5,
                            shadowOpacity: 1,
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