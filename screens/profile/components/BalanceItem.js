import React from "react";
import {
    Text,
    View,
    useWindowDimensions
} from "react-native";
import AppContext from "../../../data/AppContext";
import ThemeContext from "../../../data/ThemeContext";
import WebStyleContext from "../../../data/WebStyleContext";
import { Entypo } from "@expo/vector-icons";

function BalanceItem({ title, amount, index }) {

    const { theme, platform } = React.useContext(AppContext);
    const colors = React.useContext(ThemeContext).colors[theme];

    const window = useWindowDimensions();

    const { balanceSectionStackPoint } = React.useContext(WebStyleContext);

    return (
        <View
            style={{
                flexDirection: "row",
                width: "100%",
                height: 60,
                paddingHorizontal: 12,
                alignItems: "center",
                backgroundColor: colors.foreground4,
                alignSelf: 'center',
                justifyContent: (platform === "web" && window.width >= balanceSectionStackPoint)
                    ? "center" : 'space-between',
                // borderColor: 'aqua',
                // borderWidth: 1
            }}
        >
            <View
                style={{
                    flexDirection: (platform === "web" && window.width >= balanceSectionStackPoint)
                        ? "row" : "column",
                    alignItems: (platform === "web" && window.width >= balanceSectionStackPoint)
                        ? 'center' : 'flex-start',
                    marginBottom: (platform === "web" && window.width >= balanceSectionStackPoint)
                        ? 1 : 0
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