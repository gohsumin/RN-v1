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
                    pfpSource={userData.pfpSource}
                    userName={userName}
                    firstName={userData.firstName}
                    lastName={userData.lastName}
                    title={item.title}
                    timePosted={item.datePosted}
                    imageSource={item.imageSource}
                    likes={item.likes}
                    navigation={navigation}
                    key={item.datePosted}
                    width={width}
                />
            }
            extraData={toggleRender}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={renderSeparator}
        />
    )
}

export default SelfPosts;