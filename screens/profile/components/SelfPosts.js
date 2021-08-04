import React from "react";
import { View, FlatList, Dimensions } from "react-native";
import FeedItem from "../../feed/components/FeedItem";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

function SelfPosts({ userFeed }) {

    const WINDOW_WIDTH = Dimensions.get('window').width;
    const tabBarHeight = useBottomTabBarHeight();

    const renderSeparator = () => {
        return (
            <View
                style={{
                    height: 0.4,
                    width: "100%",
                    backgroundColor: "#808080",
                    opacity: 0.5,
                    alignSelf: "flex-end",
                }}
            />
        );
    };

    return (
        <FlatList
            data={userFeed}
            numColumns={1}
            renderItem={({ item }) =>
                <FeedItem
                    item={item}
                    navigate={() => {}}
                    width={WINDOW_WIDTH}
                    setting={'self'}
                />
            }
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={renderSeparator}
            ListFooterComponent={<View style={{height: tabBarHeight}}/>}
        />
    )
}

export default SelfPosts;