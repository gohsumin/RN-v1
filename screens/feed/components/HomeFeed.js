import React, { useContext } from 'react';
import {
    FlatList,
    View,
    useWindowDimensions,
    RefreshControl,
} from "react-native";
import FeedItem from './FeedItem';
import AppContext from '../../../data/AppContext';
import ThemeContext from '../../../data/ThemeContext';
import WebStyleContext from '../../../data/WebStyleContext';
import WebNavigationContext from '../../../data/WebNavigationContext';

function HomeFeed({ posts, onEndReached, refreshing, onRefresh, flatlistRef, navigation }) {

    const window = useWindowDimensions();
    const { currentRoute, setCurrentRoute } = useContext(WebNavigationContext);
    const { getCenterSectionWidth, topSectionHeight, getHeaderScale } = useContext(WebStyleContext);
    const { theme, platform } = useContext(AppContext);
    const colors = useContext(ThemeContext).colors[theme];

    const renderSeparator = () => {
        return (
            <View
                style={{
                    height: 0.4,
                    width: platform === "web" ? getCenterSectionWidth(window.width) * 0.85 : "85%",
                    backgroundColor: colors.foreground2,
                    opacity: 1,
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
            navigateToProfile={() => {
                setCurrentRoute({routeName: "Profile", userName: item.userName})
                navigation.navigate("Profile", { uid: item.userID, userName: item.userName });
            }}
            setting={'feed'}
            width={window.width}
        />
    ), []);

    const renderHeader = () => {
        if (platform !== "web") return null;
        return <View style={{ height: 10 + getHeaderScale(window.width) * topSectionHeight }} />
    }

    const keyExtractor = React.useCallback((item) => item.id, []);

    return (
        <View
        style={{
            flex: 1,
            width: "100%",
        }}>
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
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.05}
                onEndReached={onEndReached}
                ItemSeparatorComponent={renderSeparator}
                keyExtractor={keyExtractor}
            />
        </View>
    )
}

function areEqual(prevProps, newProps) {
    return (prevProps.posts === newProps.posts && prevProps.refreshing === newProps.refreshing);
}

export default React.memo(HomeFeed, areEqual);