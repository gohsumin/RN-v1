import React, { useContext } from 'react';
import { View, Text, Image, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppContext from "../../../data/AppContext";
import ThemeContext from "../../../data/ThemeContext";

import shopIcon from "../../../assets/shopIcon.png";
import WebStyleContext from '../../../data/WebStyleContext';

function FeedBottomBar({ numTapped }) {

    const theme = useContext(AppContext).theme;
    const colors = useContext(ThemeContext).colors[theme];
    const { getFeedFontSize } = useContext(WebStyleContext);
    const window = useWindowDimensions();

    return (
        /* grid with the buttons, e.g. number of likes; maybe add share button later */
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 0,
            // borderColor: 'orange',
            // borderWidth: 1
        }}>
            <View style={{
                justifyContent: 'center',
            }}>
                <Text style={{
                    fontSize: getFeedFontSize(window.width, 20),
                    fontWeight: 'bold',
                    color: colors.green,
                }}>
                    {numTapped} Followers
                </Text>
                <Text style={{
                    fontSize: getFeedFontSize(window.width, 18),
                    marginTop: 0,
                    color: colors.foreground1,
                }}>
                    went to buy
                </Text>
            </View>


            <View
                style={{
                    flexDirection: "row",
                    alignSelf: "flex-end",
                    alignItems: "center",
                    padding: 10,
                    borderRadius: 12,
                    backgroundColor: colors.foreground3,
                    // borderColor: 'orange',
                    // borderWidth: 1
                }}
            >
                <View style={{
                    width: "100%",
                    height: "100%",
                    flexDirection: "row",
                    justifyContent: 'space-between',
                    alignItems: "center",
                    // borderColor: 'pink',
                    // borderWidth: 1
                }}>
                    <Image source={shopIcon}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: colors.green,
                        }} />
                    <Text style={{
                        fontSize: getFeedFontSize(window.width, 18),
                        color: colors.green,
                        fontWeight: 'bold',
                        // borderColor: 'orange',
                        // borderWidth: 1
                    }}>
                        {" Buy"}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default FeedBottomBar;