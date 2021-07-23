import React, { useState, useContext, useRef, useEffect, useCallback } from "react";
import { FlatList, SafeAreaView, View, Dimensions, Text, RefreshControl, TouchableOpacity, ActivityIndicator } from "react-native";
import UsersContext from "../data/UsersContext";
import PostsContext from "../data/PostsContext";
import AppContext from "../data/AppContext";
import ThemeContext from "../data/ThemeContext";
import FeedItem from "./components/FeedItem";
import { BlurView } from "expo-blur";
// import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useHeaderHeight } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
const stream = require('getstream');

const HomeScreen = ({ navigation }) => {
  const user = useContext(AppContext).user;
  const uid = useContext(AppContext).uid;
  const users = useContext(UsersContext).users;
  const { posts, loadNewPosts, loadMoreFeed, addRandomPost, refreshTimeline, newPostExists } = useContext(PostsContext);
  const [refreshing, setRefreshing] = useState(false);
  const [loadRequested, setLoadRequested] = useState(false);
  //const [scrollEnabled, setScrollEnabled] = useState(true);
  const [flatListWidth, setFlatListWidth] = useState(0);
  //const [toggleRender, setToggleRender] = useState(false);
  const theme = React.useContext(AppContext).theme;
  const colors = React.useContext(ThemeContext).colors[theme];
  // const tabBarheight = useBottomTabBarHeight();
  const WINDOW_WIDTH = Dimensions.get("window").width;
  const headerHeight = useHeaderHeight();
  const flatlistRef = useRef();

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refreshTimeline(() => {
      wait(100).then(() => {
        setRefreshing(false);
      });
    });
  }, []);

  const onNewPostView = React.useCallback(() => {
    console.log("new post view called");
    setRefreshing(true);
    loadNewPosts(() => {
      wait(0).then(() => {
        setRefreshing(false);
        flatlistRef.current.scrollToIndex({ index: 0 });
      });
    });
  }, []);

  const onEndReached = () => {
    if (!loadRequested) {
      setLoadRequested(true);
      loadMoreFeed(() => {
        wait(5).then(setLoadRequested(false)).then(/* setScrollEnabled(true) */);
      });
    }
  }

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

  const renderItem = useCallback(({ item }) => (
    <FeedItem
      item={item}
      navigate={(user) => {
        navigation.navigate("Profile", { uid: item.userID });
      }}
      width={WINDOW_WIDTH}
      setting={'feed'}
    />
  ), []);

  const keyExtractor = useCallback((item) => item.id, []);

  /* return for HomeScreen */
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        alignItems: "center"
      }}
    >
      <FlatList
        ref={flatlistRef}
        data={posts}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        disableIntervalMomentum={true}
        showsVerticalScrollIndicator={true}
        onEndReachedThreshold={0.05}
        onEndReached={() => {
          console.log("end reached");
          //setScrollEnabled(false);
          onEndReached();
        }}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={keyExtractor}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
        onPress={addRandomPost}>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: 'rgba(170, 70, 170, 1)',
            borderWidth: 3,
            borderColor: 'rgba(150, 80, 160, 0.8)',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <AntDesign name="addfile" size={24} color='rgba(200, 180, 200, 1)' />
        </View>
      </TouchableOpacity>
      {loadRequested &&
        <View style={{ position: 'absolute', alignItems: 'center', bottom: 10 }}>
          <ActivityIndicator size="small" color="white" />
        </View>}
      {newPostExists &&
        <TouchableOpacity
          onPress={onNewPostView}
          style={{
            position: 'absolute',
            paddingVertical: 10,
            paddingHorizontal: 12,
            borderRadius: 25,
            backgroundColor: colors.blue,
            alignSelf: 'center',
            top: 19,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Text style={{
            textAlign: 'center',
            fontSize: 15.5,
            color: 'white',
            fontWeight: 'bold',
            marginRight: 3
          }}>
            New Posts
          </Text>
          <AntDesign name="arrowup" size={17} color="white" />
        </TouchableOpacity>}
    </SafeAreaView>
  );
};

export default HomeScreen;
