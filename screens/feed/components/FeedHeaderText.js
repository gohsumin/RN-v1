import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AppContext from '../../../data/AppContext';
import ThemeContext from '../../../data/ThemeContext';
import { getElapsedTime } from "../../../helpers/postsHelpers";

function FeedHeaderText({ item, navigateToProfile }) {

    const { theme } = useContext(AppContext);
    const colors = useContext(ThemeContext).colors[theme];

    return (
        <View
            style={{
                opacity: 0.9,
                marginBottom: 10,
                // borderColor: 'crimson',
                // borderWidth: 1
            }}
        >
            <TouchableOpacity
                onPress={navigateToProfile}>
                <Text
                    style={{
                        fontWeight: "bold",
                        fontSize: 17,
                        color: colors.antiBackground,
                        textShadowColor: colors.background,
                        textShadowRadius: 10,
                        marginBottom: 0
                    }}
                >
                    {item.userName} bought:
                </Text>
            </TouchableOpacity>
            <Text style={{
                fontSize: 14.3,
                color: colors.foreground1,
                opacity: 0.9,
                textAlignVertical: 'center',
                textShadowColor: colors.background,
                textShadowRadius: 10,
            }}>
                {getElapsedTime(item.dateApproved.seconds)}
                <Text style={{ fontSize: 12 }}>
                    {"  •  "}
                </Text>
                {item.storeName}
            </Text>
        </View>
    )
}

export default FeedHeaderText;