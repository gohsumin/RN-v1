import React, { useState, useEffect } from "react";
import { LogBox, Dimensions } from "react-native";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Animated,
  Easing
} from "react-native";
import UsersContext from "../data/UsersContext";
import PostsContext from "../data/PostsContext";
import AppContext from "../data/AppContext";
import ThemeContext from "../data/ThemeContext";
import { BlurView } from "expo-blur";
import Bio from './components/Bio';
import FeedItem from "./components/FeedItem";
import BalanceSection from './components/BalanceSection';
import UserInfoBar from './components/UserInfoBar';
import PostPopUp from "./components/PostPopUp";
import SelfPosts from "./components/SelfPosts";
import OtherUserPosts from "./components/OtherUserPosts";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useHeaderHeight } from '@react-navigation/stack';
import { toggle } from "cli-spinners";

const ActivityScreen = ({ route, navigation }) => {
  const users = React.useContext(UsersContext).users;
  const posts = React.useContext(PostsContext).posts;
  const [user, setUser] = useState("");
  const [isUser, setIsUser] = useState(true);
  const [userData, setUserData] = useState({});
  const [userFeed, setUserFeed] = useState({});
  const logger = React.useContext(AppContext).user;
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log("useEffect");
    console.log("route.params.user: "+route.params.user);
    console.log("navigation.params.user: "+navigation.params);
    if ((typeof route.params.user === "string")) {
      const u = route.params.user;
      console.log("user: "+u);
      setUser(u);
      if (u === logger) {
        setIsUser(true);
      }
      else {
        setIsUser(false);
      }
      setUserData(users[u]);
      setUserFeed(posts.filter(
        (post) => post.user === u
      ));
      navigation.setOptions({ title: u });
      setShow(true);
    }
  }, [route.params]);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const theme = React.useContext(AppContext).theme;
  const colors = React.useContext(ThemeContext).colors[theme];
  const [flatListWidth, setFlatListWidth] = useState(0);
  const [toggleRender, setToggleRender] = useState(false);
  const tabBarheight = useBottomTabBarHeight();
  const headerHeight = useHeaderHeight();
  const fullWidth = Dimensions.get("window").width;
  const fullHeight = Dimensions.get("window").height;

  const [modal, setModal] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);

  const renderView = () => {
    return (
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
              style={isUser ? {
                width: flatListWidth,
                borderRadius: 9,
                backgroundColor: colors.foreground4,
                overflow: "hidden",
                alignItems: "center",
                marginBottom: 60,
              } : {
                flex: 1,
                width: fullWidth,
                borderRadius: 9,
                backgroundColor: colors.background,
                overflow: "hidden",
                alignItems: "center",
                marginBottom: 60,
              }}
            >
              {/* Here, it's assumed that the feed is sorted by time, most recent to latest */}
              {isUser ?
                <SelfPosts
                  navigation={navigation}
                  userFeed={userFeed}
                  userData={userData}
                  width={flatListWidth}
                  toggleRender={toggleRender}
                /> :
                <OtherUserPosts
                  navigation={navigation}
                  userFeed={userFeed}
                  userData={userData}
                  width={flatListWidth}
                  height={fullHeight}
                  toggleRender={toggleRender}
                  setModal={setModal}
                  setModalInfo={(info) => {
                    setModalInfo({
                      ...info,
                      navigate: navigation,
                      setModal: setModal,
                      width: fullWidth * 0.90
                    });
                  }}
                />}
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }

  return (

    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {show ?
        renderView()
        : <View />
      }
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
      {modal && <PostPopUp info={modalInfo} />}
    </View>
  );
};
export default ActivityScreen;
