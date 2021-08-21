import React from "react";
import {
    Text,
    View,
    useWindowDimensions
} from "react-native";
import BalanceItem from './BalanceItem';
import AppContext from "../../../data/AppContext";
import ThemeContext from "../../../data/ThemeContext";
import WebStyleContext from "../../../data/WebStyleContext";
import WebBalanceSection from "./WebBalanceSection";

function BalanceSection({ userData }) {

    const { theme, platform } = React.useContext(AppContext);
    const colors = React.useContext(ThemeContext).colors[theme];

    const window = useWindowDimensions();

    const { balanceSectionStackPoint } = React.useContext(WebStyleContext);

    return (
        <View style={{ marginTop: 30 }}>
            <Text
                style={{
                    color: colors.foreground1,
                    alignSelf: "flex-start",
                    paddingLeft: 5,
                    paddingBottom: 5,
                }}
            >
                MY BALANCE
            </Text>
            {(platform === "web" /* && window.width >= balanceSectionStackPoint */) ?
                <WebBalanceSection userData={userData} /> :
                <View
                    style={{
                        width: "100%",
                        borderRadius: 9,
                        shadowColor: 'black',
                        shadowOpacity: 0.2,
                        shadowRadius: 10,
                        overflow: "hidden"
                    }}
                >
                    <BalanceItem title={"Available:"} amount={userData.available} index={0} />
                    <BalanceItem title={"Pending:"} amount={userData.pending} index={1} />
                    <View style={{
                        position: 'absolute',
                        top: 60,
                        width: "100%",
                        paddingHorizontal: 20,
                        alignSelf: 'center',
                        height: 0,
                        borderWidth: 0.2,
                        opacity: 0.2,
                        borderColor: 'white'
                    }} />
                </View>}
        </View>
    )
}

export default BalanceSection;