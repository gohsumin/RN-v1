import React from "react";
import {
    Text,
    View,
} from "react-native";
import AppContext from "../../../data/AppContext";
import ThemeContext from "../../../data/ThemeContext";
import { Entypo } from "@expo/vector-icons";

function BalanceItem({ title, amount, index }) {

    const { theme, platform } = React.useContext(AppContext);
    const colors = React.useContext(ThemeContext).colors[theme];

    return (
        <View
            style={{
                flexDirection: "row",
                width: "100%",
                height: 60,
                paddingHorizontal: 12,
                alignItems: "center",
                backgroundColor: colors.foreground4,
                justifyContent: platform === "web" ? "flex-start" : 'space-between'
            }}
        >
            <View
                style={{
                    flexDirection: platform === "web" ? "row" : "column",
                    alignItems: platform === "web" ? 'center' : 'flex-start',
                    marginBottom: platform === "web" ? 1 : 0
                }}>
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
                style={{
                    textAlign: 'right',
                    paddingHorizontal: 8,
                }}
                name="chevron-thin-right"
                size={16}
                color={colors.foreground1}
            />
        </View>
    )
}

export default BalanceItem;