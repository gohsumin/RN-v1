import React from 'react';
import { View, Image, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import AppContext from '../../data/AppContext';
import ThemeContext from '../../data/ThemeContext';
import StyleContext from '../../data/StyleContext';
import Icon from "react-native-vector-icons/Ionicons";

const WebHeaderView = ({ navigation, userName }) => {

    const { theme, user } = React.useContext(AppContext);
    const colors = React.useContext(ThemeContext).colors[theme];
    const {
        topSectionHeight,
        getHeaderWidth,
        getHeaderScale,
        getNavigationViewButtonWidth,
        getNavigationViewWidth,
        logoCollapsePoint,
        stickyPadding,
        leftNavigationViewDisappearPoint
    } = React.useContext(StyleContext).web;

    const { index, routes } = navigation.dangerouslyGetState();
    const currentRoute = routes[index].name;

    const window = useWindowDimensions();

    return (
        <View
            style={{
                position: 'absolute',
                width: getHeaderWidth(window.width),
                height: topSectionHeight,
                transform: [{
                    scale:  getHeaderScale(window.width)
                }]
            }}>
            <View
                style={{
                    width: window.width < leftNavigationViewDisappearPoint ? "100%" : 706,
                    height: "100%",
                    position: 'absolute',
                    top: 5,
                    flexDirection: 'row',
                    paddingLeft: 20,
                    alignSelf: 'center',
                    alignItems: 'center',
                    backgroundColor: "#222",
                    borderRadius: window.width < leftNavigationViewDisappearPoint ? 0 : 13,
                }}>
                <TouchableOpacity
                    onPress={() => {
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
                <View
                    style={{
                        width: 0,
                        height: 45,
                        borderColor: colors.foreground2,
                        borderWidth: 0.1,
                        marginLeft: 13
                    }} />
                {(currentRoute === "Profile" || currentRoute === "My Profile") ?
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
                                //textShadowOpacity: 1,
                            }}>
                            {currentRoute}
                        </Text>
                    </View>
                }
            </View>
            <View
                style={{
                    position: 'absolute',
                    top: 5,
                    height: topSectionHeight,
                    width: window.width < leftNavigationViewDisappearPoint ? 90 : getNavigationViewWidth(window.width),
                    justifyContent: 'center',
                    alignItems: window.width < leftNavigationViewDisappearPoint ?
                        'flex-end' :
                        window.width < logoCollapsePoint ?
                            'flex-start' :
                            'center',
                    alignSelf: window.width < leftNavigationViewDisappearPoint ? 'flex-end' : 'flex-start',
                    paddingHorizontal: window.width < logoCollapsePoint ? stickyPadding - 6 : 0,
                    // borderWidth: 1,
                    // borderColor: 'red',
                }}>
                <Image
                    style={{
                        width: window.width < logoCollapsePoint ? 50 : getNavigationViewButtonWidth(window.width),
                        height: "100%",
                        marginTop: (window.width < logoCollapsePoint) ? 0 : -2,
                        shadowColor: 'black',
                        shadowRadius: 5,
                        shadowOpacity: 1,
                        // borderWidth: 1,
                        // borderColor: 'orange',
                    }}
                    resizeMode='contain'
                    source={(window.width < logoCollapsePoint) ?
                        require('../../assets/logo.png') :
                        require('../../assets/SoShNavLogo.png')} />
            </View>
        </View >
    )
}

export default WebHeaderView;