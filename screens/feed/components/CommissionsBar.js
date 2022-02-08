import React from 'react';
import { View, Text } from 'react-native';
import AppContext from "../../../data/AppContext";
import ThemeContext from "../../../data/ThemeContext";

function CommissionsBar({width}) {

    const theme = React.useContext(AppContext).theme;
    const colors = React.useContext(ThemeContext).colors[theme];

    return (
        <View
            style={{
                flexDirection: "row",
                alignSelf: "flex-start",
                width: width,
                alignContent: "center",
                justifyContent: 'center',
                marginTop: 15,
                padding: 7,
                backgroundColor: colors.background3,
                borderRadius: 10
            }}
        >
            <View
                style={{
                    alignItems: 'center'
                }}>
                <Text style={{
                    color: colors.antiBackground,
                    fontSize: 17.2,
                    fontWeight: 'bold',
                }}>
                    203
                </Text>
                <Text style={{
                    color: colors.background1,
                    fontSize: 13,
                    marginTop: -3
                }}>
                    Bought
                </Text>
            </View>
            <View style={{
                width: 0,
                marginVertical: 6.5,
                marginHorizontal: 12,
                borderWidth: 0.3,
                borderColor: colors.background1,
            }} />
            <View
                style={{
                    alignItems: 'center'
                }}>
                <Text style={{
                    color: colors.green,
                    fontSize: 17.2,
                    fontWeight: 'bold'
                }}>
                    $145,691.11
                </Text>
                <Text style={{
                    color: colors.background1,
                    fontSize: 13,
                    marginTop: -3
                }}>
                    Payout
                </Text>
            </View>
        </View>
    )
}

export default CommissionsBar;