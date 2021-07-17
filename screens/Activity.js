import React, { useState, useEffect, useContext } from "react";
import { LogBox, Dimensions, RefreshControl } from "react-native";
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

const ActivityScreen = ({ route, navigation }) => {
  const { getUserData, getUserFeed } = useContext(UsersContext);
  const [isUser, setIsUser] = useState(true);
  const [userData, setUserData] = useState({});
  const [userFeed, setUserFeed] = useState({});
  const logger = useContext(AppContext).uid;
  const [show, setShow] = useState(false);

  useEffect(() => {
    var uid = "";
    if (route.params === undefined) {
      console.log("this is how we know it's a user's me page");
      uid = logger;
    }
    else if (route.params.uid !== undefined) {
      uid = route.params.uid;
      if (uid !== logger) {
        setIsUser(false);
      }
    }
    else {
      console.log("user not found");
      return;
    }
    getUserData(uid, (userData) => {
      setUserData(userData);
    })
    getUserFeed(uid, (userFeed) => {
      setUserFeed(userFeed);
    })
    navigation.setOptions({ title: userData.userName });
    setShow(true);
  }, [route.params]);

  const theme = useContext(AppContext).theme;
  const colors = useContext(ThemeContext).colors[theme];
  const [flatListWidth, setFlatListWidth] = useState(0);
  const [toggleRender, setToggleRender] = useState(false);
  const tabBarheight = useBottomTabBarHeight();
  const headerHeight = useHeaderHeight();
  const fullWidth = Dimensions.get("window").width;
  const fullHeight = Dimensions.get("window").height;

  const [modal, setModal] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);

  const [refreshing, setRefreshing] = useState(false);
  const { refreshUserPage } = useContext(UsersContext);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (route.params === undefined) {
      refreshUserPage(logger, ({ userData, userFeed }) => {
        wait(100).then(() => {
          setUserData(userData);
          setUserFeed(userFeed);
          setRefreshing(false);
        });
      });
    }
    else if (route.params.uid !== undefined) {
      refreshUserPage(route.params.uid, ({ userData, userFeed }) => {
        wait(100).then(() => {
          setUserData(userData);
          setUserFeed(userFeed);
          setRefreshing(false);
        });
      });
    }
    else {
      console.log("user not found");
      setRefreshing(false);
    }
  }, []);

  const renderView = () => {
    return (
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
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
          <UserInfoBar
            userData={userData}
            isUser={isUser}
            setUserData={setUserData}
            navigate={navigation.navigate}
          />
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
