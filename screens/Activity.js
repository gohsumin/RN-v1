import React, { useState, useEffect } from "react";
import { LogBox, Dimensions } from "react-native";
import {
  Text,
  View,
  ScrollView,
} from "react-native";
import UsersContext from "../data/UsersContext";
import PostsContext from "../data/PostsContext";
import AppContext from "../data/AppContext";
import ThemeContext from "../data/ThemeContext";
import { BlurView } from "expo-blur";
import Bio from './components/Bio';
import BalanceSection from './components/BalanceSection';
import UserInfoBar from './components/UserInfoBar';
import PostPopUp from "./components/PostPopUp";
import SelfPosts from "./components/SelfPosts";
import OtherUserPosts from "./components/OtherUserPosts";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useHeaderHeight } from '@react-navigation/stack';
import { toggle } from "cli-spinners";
import { getUserData } from "../helpers/postsHelpers";

const ActivityScreen = ({ route, navigation }) => {
  const users = React.useContext(UsersContext).users;
  const posts = React.useContext(PostsContext).posts;
  const [uid, setUID] = useState("");
  const [isUser, setIsUser] = useState(true);
  const [userData, setUserData] = useState({});
  const [userFeed, setUserFeed] = useState({});
  const logger = React.useContext(AppContext).uid;
  //const userToken = React.useContext(AppContext).userToken;
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log("useEffect");
    console.log("route.params.uid: " + route.params.uid);
    if ((typeof route.params.uid === "string")) {
      const u = route.params.uid;
      console.log("uid: " + u);
      setUID(u);
      if (u === logger) {
        setIsUser(true);
      }
      else {
        setIsUser(false);
      }
      /////
      // instead of getting it from 'users',
      // grab it from:
      /* const client = stream.connect(
        't6d6x66485xc',
        userToken,
        '1130088'
      ); */
      // now somehow get the feed aka timeline
      // also grab user's pfp, bio, etc. from firestore
      
      // scratch everything before and after the following
      // const userData = getUserData(uid);

      // const feed = client.feed('timeline', 'jack');
      // setUserFeed(feed);
      setUserData(users[u]);

      setUserFeed(posts.filter(
        (post) => post.user === u
      ));
      /////
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
      <ScrollView
        style={{ flex: 1 }}
      >
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
