import React from 'react';
import { View, Text, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppContext from "../../../data/AppContext";
import ThemeContext from "../../../data/ThemeContext";

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
                justifyContent: 'center',
                height: props.height,
                width: 148,
                paddingHorizontal: 8,
                borderRadius: 8,
                backgroundColor: colors.foreground3,
            }}
        >
            {/* <EvilIcons name="heart" size={24} color={colors.antiBackground} />
          <Text style={{ paddingLeft: 5, color: colors.antiBackground, fontWeight: "200" }}>
            {likes}
          </Text> */}
            <Icon
                name="users"
                size={16}
                color={colors.green}
                style={{ marginRight: 8 }} />
            <View style={{
                justifyContent: 'center',
            }}>
                <Text style={{
                    fontSize: 17.5,
                    fontWeight: 'bold',
                    color: colors.green,
                }}>
                    {props.numBought}
                </Text>
                <Text style={{
                    fontSize: 13,
                    marginTop: -2.5,
                    color: colors.foreground1,
                    //fontWeight: 'bold'
                }}>
                    Followers Bought
                </Text>
            </View>
        </View>
    )
}

export default FeedBottomBar;