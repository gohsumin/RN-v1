import React from "react";
import { View, FlatList } from "react-native";
import FeedItem from "./FeedItem";

function SelfPosts({ navigation, userFeed, userName, userData, width, toggleRender }) {

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
                    width={width}
                    setting={'self'}
                />
            }
            extraData={toggleRender}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={renderSeparator}
        />
    )
}

export default SelfPosts;