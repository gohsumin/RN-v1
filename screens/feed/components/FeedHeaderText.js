import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import AppContext from '../../../data/AppContext';
import ThemeContext from '../../../data/ThemeContext';
import WebStyleContext from '../../../data/WebStyleContext';
import { getElapsedTime } from "../../../helpers/postsHelpers";

function FeedHeaderText({ item, navigateToProfile }) {

    const { theme } = useContext(AppContext);
    const colors = useContext(ThemeContext).colors[theme];
    const { getFeedFontSize } = useContext(WebStyleContext);
    const window = useWindowDimensions();

    return (
        <View
            style={{
                opacity: 0.9,
                marginBottom: 10,
            }}
        >
            <TouchableOpacity
                onPress={navigateToProfile}>
                <Text
                    style={{
                        fontWeight: "bold",
                        fontSize: getFeedFontSize(window.width, 21),
                        color: colors.antiBackground,
                        textShadowColor: colors.background,
                        textShadowRadius: 10,
                        marginBottom: 2,
                    }}
                >
                    {item.userName} bought:
                </Text>
            </TouchableOpacity>
            <Text style={{
                fontSize: getFeedFontSize(window.width, 17),
                color: colors.foreground1,
                opacity: 0.9,
                textAlignVertical: 'center',
                textShadowColor: colors.background,
                textShadowRadius: 10,
                marginBottom: 2,
            }}>
                {getElapsedTime(item.dateApproved.seconds)}
                <Text style={{ fontSize: getFeedFontSize(window.width, 16) }}>
                    {"  •  "}
                </Text>
                {item.storeName}
            </Text>
        </View>
    )
}

export default FeedHeaderText;