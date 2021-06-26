import React from 'react';
import { View, Text, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppContext from "../../data/AppContext";
import ThemeContext from "../../data/ThemeContext";

function FeedBottomBar() {

    const theme = React.useContext(AppContext).theme;
    const colors = React.useContext(ThemeContext).colors[theme];

    return (
        /* grid with the buttons, e.g. number of likes; maybe add share button later */
        <View
            style={{
                flexDirection: "row",
                alignSelf: "flex-end",
                alignContent: "center",
                marginTop: 10
            }}
        >
            {/* <EvilIcons name="heart" size={24} color={colors.antiBackground} />
          <Text style={{ paddingLeft: 5, color: colors.antiBackground, fontWeight: "200" }}>
            {likes}
          </Text> */}
            <Icon
                name="cart-arrow-down"
                size={24}
                color={colors.green}
                style={{ marginRight: 3 }} />
            <View style={{ paddingLeft: 5 }}>
                <Text style={{
                    fontSize: 13,
                    fontWeight: 'bold',
                    color: colors.green
                }}>
                    4,356
                </Text>
                <Text style={{
                    fontSize: 12.6,
                    color: colors.foreground1,
                }}>
                    Also Bought
                </Text>
            </View>
        </View>
    )
}

export default FeedBottomBar;