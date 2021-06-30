import React, { useState, useContext, useEffect } from "react";
import { FlatList, SafeAreaView, View, Dimensions, Text } from "react-native";
import UsersContext from "../data/UsersContext";
import PostsContext from "../data/PostsContext";
import AppContext from "../data/AppContext";
import ThemeContext from "../data/ThemeContext";
import FeedItem from "./components/FeedItem";
import { BlurView } from "expo-blur";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useHeaderHeight } from '@react-navigation/stack';
//import { StreamApp, FlatFeed } from 'expo-activity-feed';
const stream = require('getstream');
import { getTimeline } from "../helpers/postsHelpers";

const HomeScreen = ({ navigation }) => {
  const user = useContext(AppContext).user;
  //const userToken = useContext(AppContext).userToken;
  const uid = useContext(AppContext).uid;
  const users = useContext(UsersContext).users;
  const feed = useContext(PostsContext).posts;

  // const feed = user === "" ? useContext(PostsContext).posts
  //   : useContext(PostsContext).posts.filter((post) =>
  //     users[user].following.concat(user).includes(post.user)
  //   );
  // const client = stream.connect(
  //   't6d6x66485xc',
  //   userToken,
  //   '1130088'
  // );
  //const testingFeed = client.feed('timeline', user, userToken);
  //console.log(testingFeed);
  const [flatListWidth, setFlatListWidth] = useState(0);
  const [toggleRender, setToggleRender] = useState(false);
  const theme = React.useContext(AppContext).theme;
  const colors = React.useContext(ThemeContext).colors[theme];
  const tabBarheight = useBottomTabBarHeight();
  const headerHeight = useHeaderHeight();

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
        <Text style={{color: 'white'}}>
          {feed.length}
        </Text>
        <FlatList
          data={Object.keys(feed)}
          renderItem={({ item }) => ( // 'item' has fields 'dateApproved', 'dateBought', 'itemImageURL', 'itemName', 'itemURL', 'numBought', 'storeName', 'userImageURL', 'userName'
            <FeedItem
              pfpSource={feed[item].userImageURL}
              userName={feed[item].userName}
              firstName={"First Name"}
              lastName={"Last Name"}
              title={feed[item].itemName}
              timePosted={feed[item].dateApproved}
              imageSource={feed[item].itemImageURL}
              likes={"no likes"}
              navigate={(user) => {
                navigate("Profile", "somehow get uid");
              }}
              key={feed[item].dateApproved+feed[item].userName}
              width={Dimensions.get("window").width}
              setting={'feed'}
            />
          )}
          ListFooterComponent={
            <View style={{ height: tabBarheight }}>
            </View>
          }
          ItemSeparatorComponent={renderSeparator}
          keyExtractor={(item) => feed[item].dateApproved}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
