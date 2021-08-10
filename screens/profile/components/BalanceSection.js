import React from "react";
import {
    Text,
    View,
} from "react-native";
import BalanceItem from './BalanceItem';
import AppContext from "../../../data/AppContext";
import ThemeContext from "../../../data/ThemeContext";

function BalanceSection({ userData }) {

    const { theme, platform } = React.useContext(AppContext);
    const colors = React.useContext(ThemeContext).colors[theme];

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
            {platform === "web" ?
                <View
                    style={{
                        width: "100%",
                        borderRadius: 9,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: colors.foreground4,
                        shadowColor: 'black',
                        shadowOpacity: 0.3,
                        shadowRadius: 5,
                        shadowOffset: { width: 1, height: 1 }
                    }}
                >
                    <View
                        style={{
                            borderRadius: 9,
                            overflow: 'hidden',
                            width: "49.5%",
                            paddingHorizontal: 50,
                            alignContent: 'center',
                        }}>
                        <BalanceItem title={"Available: "} amount={userData.available} index={0} />
                    </View>
                    <View
                        style={{
                            width: 0,
                            height: "60%",
                            borderColor: 'white',
                            borderWidth: 0.1,
                            opacity: 0.2
                        }} />
                    <View
                        style={{
                            borderRadius: 9,
                            overflow: 'hidden',
                            width: "49.5%",
                            paddingHorizontal: 50,
                            alignContent: 'center',
                        }}>
                        <BalanceItem title={"Pending: "} amount={userData.pending} index={1} />
                    </View>
                </View> :
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