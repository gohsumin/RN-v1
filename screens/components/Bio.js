import React from 'react';
import {
    Text,
    View,
    Image,
} from "react-native";
import AppContext from "../../data/AppContext";
import ThemeContext from "../../data/ThemeContext";
import { Octicons } from "@expo/vector-icons";

function Bio({userData}) {

    const theme = React.useContext(AppContext).theme;
    const colors = React.useContext(ThemeContext).colors[theme];

    return (
        <View style={{alignItems: 'center'}}>
            {/* profile image */}
            <Image
                source={userData.pfpSource}
                style={{ width: 160, height: 160, borderRadius: 12 }}
            />
            {/* user name and verified icon */}
            <Text
                style={{
                    fontWeight: "700",
                    letterSpacing: 0.1,
                    fontSize: 25,
                    color: colors.antiBackground,
                    marginTop: 20,
                }}
            >
                {userData.firstName} {userData.lastName}{"  "}
                <Octicons name="verified" size={23} color={colors.blue} />
            </Text>
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
                {userData.bio}
            </Text>
        </View>
    )
}

export default Bio;