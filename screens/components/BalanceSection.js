import React from "react";
import {
    Text,
    View,
  } from "react-native";
import BalanceItem from './BalanceItem';
import AppContext from "../../data/AppContext";
import ThemeContext from "../../data/ThemeContext";

function BalanceSection({ userData }) {

    const theme = React.useContext(AppContext).theme;
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
            <View
                style={{ width: "100%", borderRadius: 9, overflow: "hidden" }}
            >
                <BalanceItem title={"Available"} amount={userData.available} index={0} />
                {/* {renderSeparator()} */}
                <BalanceItem title={"Pending"} amount={userData.pending} index={1} />
            </View>
        </View>
    )
}

export default BalanceSection;