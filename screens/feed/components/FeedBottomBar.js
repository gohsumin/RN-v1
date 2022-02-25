import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions, Linking } from 'react-native';
import AppContext from "../../../data/AppContext";
import ThemeContext from "../../../data/ThemeContext";
import WebStyleContext from '../../../data/WebStyleContext';

function FeedBottomBar({ numTapped, link, incrementViews }) {

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
                    fontSize: getFeedFontSize(window.width, 19.5),
                    fontWeight: 'bold',
                    color: colors.green,
                }}>
                    {numTapped + (numTapped === 1 ? " Follower" : " Followers")}
                </Text>
                <Text style={{
                    fontSize: getFeedFontSize(window.width, 18.5),
                    marginTop: 0,
                    color: colors.background1,
                }}>
                    went to buy
                </Text>
            </View>


            <View
                style={{
                    flexDirection: "row",
                    alignSelf: "flex-end",
                    alignItems: "center",
                    paddingHorizontal: 17,
                    paddingVertical: 12,
                    borderRadius: 12,
                    backgroundColor: "white", //colors.background2,
                    // borderColor: 'orange',
                    // borderWidth: 1
                }}
            >
                <TouchableOpacity style={{
                    width: "100%",
                    height: "100%",
                    flexDirection: "row",
                    justifyContent: 'space-between',
                    alignItems: "center",
                    // borderColor: 'pink',
                    // borderWidth: 1
                }}
                    onPress={() => {
                        Linking.canOpenURL(link).then(supported => {
                            if (supported) {
                              Linking.openURL(link);
                              incrementViews();
                            } else {
                             //console.log("Can't open URL: " + link);
                            }
                          });
                    }}>
                    <Text style={{
                        fontSize: getFeedFontSize(window.width, 18),
                        color: "black", //colors.green,
                        fontWeight: 'bold',
                        // borderColor: 'orange',
                        // borderWidth: 1
                    }}>
                        {" Buy"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default FeedBottomBar;