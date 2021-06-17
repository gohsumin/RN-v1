import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollView,
    LogBox,
    Dimensions
} from "react-native";
import AppContext from "../../data/AppContext";
import ThemeContext from "../../data/ThemeContext";
import { Entypo } from "@expo/vector-icons";

function BalanceItem({title, amount, index}) {

    const theme = React.useContext(AppContext).theme;
    const colors = React.useContext(ThemeContext).colors[theme];

    return (
        <View
            style={{
                flexDirection: "row",
                width: "100%",
                paddingVertical: 6,
                paddingLeft: 12,
                alignItems: "center",
                backgroundColor: colors.foreground3,
            }}
        >
            <View style={{ flex: 9 }}>
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: "500",
                        letterSpacing: 0.2,
                        color:
                            index === 0 ? colors.availableBalance : colors.pendingBalance,
                    }}
                >
                    {title}
                </Text>
                <Text
                    style={{
                        padding: 2,
                        letterSpacing: 0.4,
                        color: colors.antiBackground,
                        fontSize: 20,
                        fontWeight: "bold",
                    }}
                >
                    {amount}
                </Text>
            </View>
            <Entypo
                style={{ flex: 1 }}
                name="chevron-thin-right"
                size={18}
                color={colors.blue}
            />
        </View>
    )
}

export default BalanceItem;