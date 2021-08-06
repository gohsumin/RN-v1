import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppContext from '../../data/AppContext';
import ThemeContext from '../../data/ThemeContext';
import Icon from "react-native-vector-icons/Ionicons";

const WebNavigationTopView = ({ navigation, userName }) => {

    const { theme, user } = React.useContext(AppContext);
    const colors = React.useContext(ThemeContext).colors[theme];

    const { index, routes } = navigation.dangerouslyGetState();
    const currentRoute = routes[index].name;
    const headerText = currentRoute === "Profile" ? userName : currentRoute;

    return (
        <View
            style={{
                position: 'absolute',
                width: "100%",
                height: 80,
            }}>
            {/* <LinearGradient
                style={{
                    //position: 'absolute',
                    width: "100%",
                    height: "100%",
                }}
                locations={[0.8, 1]}
                colors={[colors.homeBackground, 'rgba(255, 255, 255, 0)']}>
            </LinearGradient> */}
            <View
                style={{
                    width: 706,
                    height: "100%",
                    position: 'absolute',
                    top: 5,
                    flexDirection: 'row',
                    paddingLeft: 20,
                    alignSelf: 'center',
                    alignItems: 'center',
                    backgroundColor: "#222",
                    shadowColor: 'black',
                    shadowOpacity: 1,
                    shadowRadius: 15,
                    borderRadius: 13,
                    // borderColor: colors.foreground2,
                    // borderWidth: 0.1
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
                            textShadowOpacity: 1,
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
                            textShadowOpacity: 1,
                        }}>
                        {currentRoute === "Profile" ? "Profile" : headerText}
                    </Text>
                    {currentRoute === "Profile" &&
                        <Text
                            style={{
                                color: colors.foreground1,
                                fontSize: 18,
                                fontWeight: '500',
                            }}>
                            {headerText}
                        </Text>}
                </View>
            </View>
        </View >
    )
}

export default WebNavigationTopView;