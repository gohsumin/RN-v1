import React, { useState, useEffect } from "react";
import { LogBox, Dimensions } from "react-native";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import UsersContext from "../data/UsersContext";
import PostsContext from "../data/PostsContext";
import AppContext from "../data/AppContext";
import ThemeContext from "../data/ThemeContext";
import { BlurView } from "expo-blur";
import Bio from './components/Bio';
import FeedItem from "./components/FeedItem";
import BalanceSection from './components/BalanceSection';
import UserPostsSection from './components/UserPostsSection';
import UserInfoBar from './components/UserInfoBar';
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useHeaderHeight } from '@react-navigation/stack';
import { toggle } from "cli-spinners";

const ActivityScreen = ({ route, navigation }) => {
  const users = React.useContext(UsersContext).users;
  const { user } = route.params;
  const isUser = React.useContext(AppContext).user === user;
  const userData = users[user];
  const userFeed = React.useContext(PostsContext).posts.filter(
    (post) => post.user === user
  );
  const theme = React.useContext(AppContext).theme;
  const colors = React.useContext(ThemeContext).colors[theme];
  const [flatListWidth, setFlatListWidth] = useState(0);
  const [toggleRender, setToggleRender] = useState(false);
  const tabBarheight = useBottomTabBarHeight();
  const headerHeight = useHeaderHeight();
  const fullWidth = Dimensions.get("window").width;
  const fullHeight = Dimensions.get("window").height;

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
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

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            backgroundColor: colors.background,
            paddingHorizontal: 14,
            paddingTop: 40,
          }}
        >
          {/* this is just for getting the width inside the padding */}
          <View
            style={{
              width: "100%",
              height: 0,
              position: "absolute",
            }}
            onLayout={(event) => {
              setFlatListWidth(event.nativeEvent.layout.width);
              setToggleRender(!toggleRender);
            }}
          />
          {/* profile pic, name, bio */}
          <Bio userData={userData} />
          {/* following | followers | edit/follow */}
          <UserInfoBar userData={userData} isUser={isUser} />
          { /* balance information */
            isUser && <BalanceSection userData={userData} />}
{/*           <UserPostsSection
            navigation={ navigation }
            userFeed={ userFeed }
            user={ user }
            userData={ userData }
            isUser={ isUser }
            flatListWidth={ flatListWidth }
            fullWidth={ fullWidth }
            toggleRender={ toggleRender }
          /> */}
          <View style={{ marginVertical: 30 }}>
            {isUser && (
              <Text
                style={{
                  color: colors.foreground1,
                  alignSelf: "flex-start",
                  paddingLeft: 5,
                  paddingBottom: 5,
                }}
              >
                MY POSTS
              </Text>
            )}
            {/* user's posts */}
            <View
              style={{
                flex: !isUser ? 1 : 'auto',
                width: isUser ? flatListWidth : fullWidth,
                borderRadius: 9,
                backgroundColor: isUser ? colors.foreground4 : colors.background,
                overflow: "hidden",
                alignItems: "center",
                marginBottom: 60,
              }}
            >
              {/* Here, it's assumed that the feed is sorted by time, most recent to latest */}
              <FlatList
                data={userFeed}
                numColumns={(isUser ? 1 : 3)}
                renderItem={({ item }) => (isUser ?
                  <FeedItem
                    pfpSource={userData.pfpSource}
                    userName={user}
                    firstName={userData.firstName}
                    lastName={userData.lastName}
                    title={item.title}
                    timePosted={item.datePosted}
                    imageSource={item.imageSource}
                    likes={item.likes}
                    navigation={navigation}
                    key={item.datePosted}
                    width={flatListWidth}
                  /> :
                  <TouchableOpacity style={{
                    width: flatListWidth / 3,
                    height: flatListWidth / 3,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    /* borderWidth: 1,
                    borderColor: 'pink' */
                  }}
                    onPress={() => {
                      // modal with the feed item
                      navigation.navigate('Feed Item', { height: fullHeight });
                    }}>
                    <View style={{
                      padding: 8,
                      width: 92,
                      height: 92,
                      borderRadius: 28,
                      overflow: 'hidden',
                      backgroundColor: 'white'
                    }}>
                      <Image style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                      }}
                        source={item.imageSource} />
                    </View>

                  </TouchableOpacity>
                )}
                extraData={toggleRender}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={isUser && renderSeparator} /* 
              ListFooterComponent={<View style={{ height: 60 }} />} */
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <BlurView
        style={{
          height: tabBarheight,
          width: "100%",
          position: "absolute",
          bottom: 0,
        }}
        intensity={99}
        blurTint={theme === "dark" ? "dark" : "light"}
      />
    </View>
  );
};
export default ActivityScreen;
