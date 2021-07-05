import React from 'react';
import { View, Text, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppContext from "../../data/AppContext";
import ThemeContext from "../../data/ThemeContext";

function FeedBottomBar(props) {

    const theme = React.useContext(AppContext).theme;
    const colors = React.useContext(ThemeContext).colors[theme];

    return (
        /* grid with the buttons, e.g. number of likes; maybe add share button later */
        <View
            style={{
                flexDirection: "row",
                alignSelf: "flex-start",
                alignItems: "center",
                marginTop: 14.5,
                paddingVertical: 3,
                paddingHorizontal: 8,
                borderRadius: 8,
                backgroundColor: colors.foreground3
            }}
        >
            {/* <EvilIcons name="heart" size={24} color={colors.antiBackground} />
          <Text style={{ paddingLeft: 5, color: colors.antiBackground, fontWeight: "200" }}>
            {likes}
          </Text> */}
            <Icon
                name="cart-arrow-down"
                size={18}
                color={colors.green}
                style={{ marginRight: 3 }} />
            <View style={{ paddingLeft: 5 }}>
                <Text style={{
                    fontSize: 17.5,
                    fontWeight: 'bold',
                    color: colors.green,
                    marginBottom: -2
                }}>
                    {props.numBought}
                </Text>
                <Text style={{
                    fontSize: 12.3,
                    color: colors.foreground1,
                }}>
                    Followers Bought
                </Text>
            </View>
        </View>
    )
}

export default FeedBottomBar;