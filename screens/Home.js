import React, { useState, useContext, useRef, useEffect, useCallback } from "react";
import { FlatList, SafeAreaView, View, Dimensions, Text, RefreshControl, TouchableOpacity, ActivityIndicator } from "react-native";
import UsersContext from "../data/UsersContext";
import PostsContext from "../data/PostsContext";
import AppContext from "../data/AppContext";
import ThemeContext from "../data/ThemeContext";
import FeedItem from "./components/FeedItem";
import { BlurView } from "expo-blur";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useHeaderHeight } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
const stream = require('getstream');
import { getTimeline } from "../helpers/postsHelpers";

const HomeScreen = ({ navigation }) => {
  const user = useContext(AppContext).user;
  //const userToken = useContext(AppContext).userToken;
  const uid = useContext(AppContext).uid;
  const users = useContext(UsersContext).users;
  const { posts, loadMoreFeed, addRandomPost, refreshTimeline, newPostExists } = useContext(PostsContext);
  const [refreshing, setRefreshing] = useState(false);
  const [loadRequested, setLoadRequested] = useState(false);
  const [flatListWidth, setFlatListWidth] = useState(0);
  const [toggleRender, setToggleRender] = useState(false);
  const theme = React.useContext(AppContext).theme;
  const colors = React.useContext(ThemeContext).colors[theme];
  const tabBarheight = useBottomTabBarHeight();
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
    setRefreshing(true);
    refreshTimeline(() => {
      wait(100).then(() => {
        setRefreshing(false);
        flatlistRef.current.scrollToIndex({ index: 0 });
      });
    });
  }, []);

  const onEndReached = () => {
    console.log("end reached");
    if (!loadRequested) {
      setLoadRequested(true);
      loadMoreFeed(() => { wait(200).then(setLoadRequested(false)) });
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
        navigation.navigate("Profile", item.uid);
      }}
      width={Dimensions.get("window").width}
      setting={'feed'}
    />
  ), []);

  const keyExtractor = useCallback((item) => item.id, []);

  /* return for HomeScreen */
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
      onLayout={(event) => {
        setFlatListWidth(event.nativeEvent.layout.width);
        setToggleRender(!toggleRender);
      }}
    >
      <View
        style={{ backgroundColor: colors.background, alignItems: "center" }}
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
          onEndReachedThreshold={0.01}
          onEndReached={onEndReached}
          ListFooterComponent={
            <View style={{ height: tabBarheight }}>
            </View>
          }
          ItemSeparatorComponent={renderSeparator}
          keyExtractor={keyExtractor}
        />

        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: tabBarheight + 20,
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
          <View style={{ position: 'absolute', alignItems: 'center', bottom: tabBarheight + 10 }}>
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
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
