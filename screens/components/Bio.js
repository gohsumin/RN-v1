import React from 'react';
import {
    Text,
    View,
    Image,
} from "react-native";
import AppContext from "../../data/AppContext";
import ThemeContext from "../../data/ThemeContext";
import { MaterialIcons } from '@expo/vector-icons';

function Bio({ userData }) {

    const theme = React.useContext(AppContext).theme;
    const colors = React.useContext(ThemeContext).colors[theme];

    return (
        <View style={{ alignItems: 'center' }}>
            {/* profile image */}
            <Image
                fadeDuration={0}
                source={{uri: userData.userImageURL}}
                style={{ width: 160, height: 160, borderRadius: 12 }}
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
                    marginBottom: 12,
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