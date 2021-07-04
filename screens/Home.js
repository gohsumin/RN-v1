import React, { useState, useContext, useEffect } from "react";
import { FlatList, SafeAreaView, View, Dimensions, Text, RefreshControl, TouchableOpacity } from "react-native";
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
  const feed = useContext(PostsContext).posts;
  const loadMoreFeed = useContext(PostsContext).loadMoreFeed;
  const setLoaded = useContext(PostsContext).setLoaded;
  const addRandomPost = useContext(PostsContext).addRandomPost;
  const [refreshing, setRefreshing] = useState(false);
  const [loadRequested, setLoadRequested] = useState(false);
  const [flatListWidth, setFlatListWidth] = useState(0);
  const [toggleRender, setToggleRender] = useState(false);
  const theme = React.useContext(AppContext).theme;
  const colors = React.useContext(ThemeContext).colors[theme];
  const tabBarheight = useBottomTabBarHeight();
  const headerHeight = useHeaderHeight();

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);

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

  const renderItem = ({ item }) => ( // 'item' has fields 'dateApproved', 'dateBought', 'itemImageURL', 'itemName', 'itemURL', 'numBought', 'storeName', 'userImageURL', 'userName'
    <FeedItem
      pfpSource={item.userImageURL}
      userName={item.userName}
      firstName={"First Name"}
      lastName={"Last Name"}
      title={item.itemName}
      timePosted={item.dateApproved}
      imageSource={item.itemImageURL}
      likes={"no likes"}
      navigate={(user) => {
        navigate("Profile", "somehow get uid");
      }}
      width={Dimensions.get("window").width}
      setting={'feed'}
    />
  )

  function navigate(screen, user) {
    navigation.navigate(screen, { user: user });
  }

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
          // feed: only the value of each object in timeline
          data={feed}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          onEndReachedThreshold={0.01}
          onEndReached={info => {
            console.log("end reached");
            if (!loadRequested) {
              setLoadRequested(true);
              loadMoreFeed(info).then(() => {
                setLoadRequested(false);
              });
            }
          }}
          ListFooterComponent={
            <View style={{ height: tabBarheight, borderColor: 'red', borderWidth: 1 }}>
            </View>
          }
          ItemSeparatorComponent={renderSeparator}
          keyExtractor={(item) => item.dateApproved+item.userName}
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

      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
