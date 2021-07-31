import React from 'react';
import {
    FlatList,
    View,
    Dimensions,
    RefreshControl,
} from "react-native";
import FeedItem from './FeedItem';
import AppContext from '../../../data/AppContext';
import ThemeContext from '../../../data/ThemeContext';

function HomeFeed({ posts, onEndReached, refreshing, onRefresh, flatlistRef, navigation }) {

    const WINDOW_WIDTH = Dimensions.get("window").width;
    const { theme } = React.useContext(AppContext);
    const colors = React.useContext(ThemeContext).colors[theme];

    const renderSeparator = () => {
        return (
            <View
                style={{
                    height: 0.4,
                    width: "85%",
                    backgroundColor: colors.foreground2,
                    opacity: 0.5,
                    alignSelf: "center",
                    marginTop: 6,
                    marginBottom: 2
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