import React from 'react';
import {
    FlatList,
    View,
    Dimensions,
    RefreshControl,
} from "react-native";
import FeedItem from './FeedItem';

function HomeFeed({ posts, onEndReached, refreshing, onRefresh, flatlistRef, navigation }) {

    const WINDOW_WIDTH = Dimensions.get("window").width;

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

    const renderItem = React.useCallback(({ item }) => (
        <FeedItem
            item={item}
            navigate={() => {
                navigation.navigate("Profile", { uid: item.userID });
            }}
            width={WINDOW_WIDTH}
            setting={'feed'}
        />
    ), []);

    const keyExtractor = React.useCallback((item) => item.id, []);

    return (
        <FlatList
            ref={flatlistRef}
            data={posts}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
            renderItem={renderItem}
            disableIntervalMomentum={true}
            showsVerticalScrollIndicator={true}
            onEndReachedThreshold={0.05}
            onEndReached={onEndReached}
            ItemSeparatorComponent={renderSeparator}
            keyExtractor={keyExtractor}
        />
    )
}

function areEqual(prevProps, newProps) {
    return (prevProps.posts === newProps.posts && prevProps.refreshing === newProps.refreshing);
}

export default React.memo(HomeFeed, areEqual);