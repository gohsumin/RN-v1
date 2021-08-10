import React from 'react';
import {
    Text,
    View,
    Image,
} from "react-native";
import AppContext from "../../../data/AppContext";
import ThemeContext from "../../../data/ThemeContext";
import { MaterialIcons } from '@expo/vector-icons';
import { useHeaderHeight } from "@react-navigation/stack";

function Bio({ userData }) {

    const { theme, platform } = React.useContext(AppContext);
    const colors = React.useContext(ThemeContext).colors[theme];


    const headerHeight = platform === "web" ? 0 : useHeaderHeight();

    return (
        <View style={{
            alignItems: 'center',
            paddingTop: platform === "web" ? 120 : headerHeight + 40,
        }}>
            {/* profile image */}
            <Image
                fadeDuration={0}
                source={{ uri: userData.userImageURL }}
                style={{
                    width: 160,
                    height: 160,
                    borderRadius: 12,
                    shadowColor: 'black',
                    shadowOpacity: 0.3,
                    shadowRadius: 10
                }}
            />
            {/* user name and verified icon */}
            <View style={{
                flexDirection: 'row', alignItems: 'center',
                marginTop: 20,
            }}>
                <Text
                    style={{
                        fontWeight: "700",
                        letterSpacing: 0.1,
                        fontSize: 25,
                        color: colors.antiBackground,
                        alignSelf: 'center',
                    }}
                >
                    {userData.userName}{" "}
                </Text>
                <MaterialIcons name="verified" size={24.5} color={'#4894e5'} />
            </View>
            {/* bio */}
            <Text
                style={{
                    color: colors.antiBackground,
                    fontSize: 15,
                    fontWeight: "400",
                    marginTop: 15,
                    marginHorizontal: 35,
                    textAlign: "center",
                    lineHeight: 18,
                }}
            >
                {userData.userDescription}
            </Text>
        </View>
    )
}

export default Bio;