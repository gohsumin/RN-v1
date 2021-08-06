import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import AppContext from '../../data/AppContext';
import ThemeContext from '../../data/ThemeContext';

const WebNavigationLeftView = ({ navigation }) => {

    const theme = React.useContext(AppContext).theme;
    const colors = React.useContext(ThemeContext).colors[theme];

    const { index, routes } = navigation.dangerouslyGetState();
    const currentRoute = routes[index].name;

    return (
        <View
            style={{
                position: 'absolute',
                width: 250,
                top: 96,
                left: 70,
            }}>
            {/* <View
                style={{
                    marginBottom: 10
                }}>
                <Image
                    style={{
                        width: "100%",
                        aspectRatio: .75,
                        borderRadius: 15,
                    }}
                    source={require("../../assets/explore.jpeg")} />
                <View>
                    <Text style={{color: colors.antiBackground, fontWeight: '600', fontSize: 20}}>
                        {"View more on Explore ->"}
                    </Text>
                </View>
            </View> */}
            <View
                style={{
                    top: 10,
                }}>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        opacity: currentRoute === "Home" ? 0.8 : 0.4,
                        marginVertical: 8.2,
                    }}
                    onPress={() => {
                        navigation.navigate("Home");
                    }}>
                    <Icon
                        name={currentRoute === "Home" ? "home-outline" : "home-outline"}
                        size={currentRoute === "Home" ? 27 : 25}
                        color={colors.green}
                        style={{
                            textShadowColor: currentRoute === "Home" ? colors.green : 'black',
                            textShadowRadius: 7,
                            textShadowOpacity: 1,
                        }} />
                    <Text
                        style={{
                            fontSize: currentRoute === "Home" ? 27 : 25,
                            color: colors.antiBackground,
                            fontWeight: '600',
                            textShadowColor: currentRoute === "Home" ? "#222" : 'black',
                            textShadowRadius: 7,
                            textShadowOpacity: 1,
                        }}>
                        {"  Home"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        opacity: currentRoute === "Profile" ? 0.8 : 0.4,
                        marginVertical: 8.2,
                    }}
                    onPress={() => {
                        navigation.navigate("Profile");
                    }}>
                    <Icon
                        name={currentRoute === "Profile" ? "person-outline" : "person-outline"}
                        size={currentRoute === "Profile" ? 27 : 25}
                        color={colors.green}
                        style={{
                            textShadowColor: currentRoute === "Profile" ? colors.green : 'black',
                            textShadowRadius: 7,
                            textShadowOpacity: 1,
                        }} />
                    <Text
                        style={{
                            fontSize: currentRoute === "Profile" ? 27 : 25,
                            color: colors.antiBackground,
                            fontWeight: '600',
                            textShadowColor: currentRoute === "Profile" ? "#222" : 'black',
                            textShadowRadius: 7,
                            textShadowOpacity: 1,
                        }}>
                        {"  Profile"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        opacity: currentRoute === "Explore" ? 0.8 : 0.4,
                        marginVertical: 8.2,
                    }}
                    onPress={() => {

                    }}>
                    <Icon
                        name={currentRoute === "Explore" ? "search-outline" : "search-outline"}
                        size={currentRoute === "Explore" ? 32 : 25}
                        color={colors.green}
                        style={{
                            textShadowColor: currentRoute === "Explore" ? colors.green : 'black',
                            textShadowRadius: 7,
                            textShadowOpacity: 1,
                        }} />
                    <Text
                        style={{
                            fontSize: currentRoute === "Explore" ? 32 : 25,
                            color: colors.antiBackground,
                            fontWeight: '600',
                            textShadowColor: currentRoute === "Explore" ? "#222" : 'black',
                            textShadowRadius: 7,
                            textShadowOpacity: 1,
                        }}>
                        {"  Explore"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default WebNavigationLeftView;