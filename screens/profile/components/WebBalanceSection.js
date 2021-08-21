import React from "react";
import {
    View,
    useWindowDimensions
} from "react-native";
import BalanceItem from './BalanceItem';
import AppContext from "../../../data/AppContext";
import ThemeContext from "../../../data/ThemeContext";
import WebStyleContext from "../../../data/WebStyleContext";

function WebBalanceSection({ userData }) {

    const { theme } = React.useContext(AppContext);
    const colors = React.useContext(ThemeContext).colors[theme];

    const window = useWindowDimensions();

    const { balanceSectionStackPoint } = React.useContext(WebStyleContext);

    return (
        <View
            style={{
                width: "100%",
                borderRadius: 9,
                flexDirection: window.width < balanceSectionStackPoint ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: colors.foreground4,
                shadowColor: 'black',
                shadowOpacity: 0.3,
                shadowRadius: 5,
                shadowOffset: { width: 1, height: 1 },
            }}
        >
            <View
                style={{
                    borderRadius: 9,
                    overflow: 'hidden',
                    width: window.width < balanceSectionStackPoint ? "100%" : "49.5%",
                    alignContent: 'center',
                    // borderColor: 'blue',
                    // borderWidth: 1
                }}>
                <BalanceItem title={"Available: "} amount={userData.available} index={0} />
            </View>

            {window.width >= balanceSectionStackPoint &&
                <View
                    style={{
                        width: 0,
                        height: "60%",
                        borderColor: 'white',
                        borderWidth: 0.1,
                        opacity: 0.2
                    }}
                />}

            <View
                style={{
                    borderRadius: 9,
                    overflow: 'hidden',
                    width: window.width < balanceSectionStackPoint ? "100%" : "49.5%",
                    alignContent: 'center',
                    // borderColor: 'blue',
                    // borderWidth: 1
                }}>
                <BalanceItem title={"Pending: "} amount={userData.pending} index={1} />
            </View>
        </View>
    )
}

export default WebBalanceSection;