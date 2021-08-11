import React from 'react';
import {
    FlatList,
    View,
    useWindowDimensions,
    RefreshControl,
} from "react-native";
import FeedItem from './FeedItem';
import AppContext from '../../../data/AppContext';
import ThemeContext from '../../../data/ThemeContext';
import StyleContext from '../../../data/StyleContext';

function HomeFeed({ posts, onEndReached, refreshing, onRefresh, flatlistRef, navigation }) {

    const window = useWindowDimensions();
    const { getCenterSectionWidth } = React.useContext(StyleContext).web;
    const { theme, platform } = React.useContext(AppContext);
    const colors = React.useContext(ThemeContext).colors[theme];

    const renderSeparator = () => {
        return (
            <View
                style={{
                    height: 0.4,
                    width: platform === "web" ? getCenterSectionWidth(window.width) * 0.85 : "85%",
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
            setting={'feed'}
        />
    ), []);

    const renderHeader = () => {
        if (platform !== "web") return null;
        return <View style={{ height: 95 }} />
    }

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
            ListHeaderComponent={renderHeader}
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