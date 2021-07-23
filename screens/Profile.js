import React, { useState, useEffect, useContext } from "react";
import { Dimensions, RefreshControl, ActivityIndicator } from "react-native";
import {
  Text,
  View,
  ScrollView,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import UsersContext from "../data/UsersContext";
import AppContext from "../data/AppContext";
import ThemeContext from "../data/ThemeContext";
import { BlurView } from "expo-blur";
import Bio from './components/Bio';
import BalanceSection from './components/BalanceSection';
import UserInfoBar from './components/UserInfoBar';
import PostPopUp from "./components/PostPopUp";
import SelfPosts from "./components/SelfPosts";
import OtherUserPosts from "./components/OtherUserPosts";
// import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useHeaderHeight } from '@react-navigation/stack';

const ActivityScreen = ({ route, navigation }) => {
  const { getUserData, getUserFeed } = useContext(UsersContext);
  const [isUser, setIsUser] = useState(true);
  const [userData, setUserData] = useState({});
  const [userFeed, setUserFeed] = useState([]);
  const [cursor, setCursor] = useState(0);
  const logger = useContext(AppContext).uid;
  const [show, setShow] = useState(false);

  useEffect(() => {
    var uid = "";
    if (route.params === undefined) {
      console.log("this is how we know it's a user's me page");
      uid = logger;
    }
    else {
      uid = route.params.uid;
      if (uid !== logger) {
        setIsUser(false);
      }
    }
    getUserData(uid, (userData) => {
      console.log("from getUserData, userID: " + userData.userID);
      setUserData(userData);
    })
    getUserFeed(uid, cursor, (newItems, newCursor) => {
      setCursor(newCursor);
      setUserFeed(userFeed.concat(newItems));
    })
    navigation.setOptions({ title: userData.userName });
    setShow(true);
  }, [route.params]);

  const theme = useContext(AppContext).theme;
  const colors = useContext(ThemeContext).colors[theme];
  const [flatListWidth, setFlatListWidth] = useState(0);
  const [toggleRender, setToggleRender] = useState(false);
  // const tabBarheight = useBottomTabBarHeight();
  const headerHeight = useHeaderHeight();
  const fullWidth = Dimensions.get("window").width;
  const fullHeight = Dimensions.get("window").height;

  const [modal, setModal] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);

  const [refreshing, setRefreshing] = useState(false);
  const { refreshUserPage } = useContext(UsersContext);
  const [loadRequested, setLoadRequested] = useState(false);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  function onEndReached() {
    if (!loadRequested) {
      console.log("onEndReached!");
      setLoadRequested(true);
      console.log("user id: " + userData.userID);
      getUserFeed(userData.userID, cursor, (newItems, newCursor) => {
        setCursor(newCursor);
        setUserFeed(userFeed.concat(newItems));
        setLoadRequested(false);
      })
    }
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (route.params === undefined) {
      refreshUserPage(logger, cursor, ({ userData, userFeed, newCursor }) => {
        wait(100).then(() => {
          setUserData(userData);
          setUserFeed(userFeed);
          setRefreshing(false);
        });
      });
    }
    else if (route.params.uid !== undefined) {
      refreshUserPage(route.params.uid, cursor, ({ userData, userFeed, newCursor }) => {
        wait(100).then(() => {
          setUserData(userData);
          setUserFeed(userFeed);
          setCursor(newCursor);
          setRefreshing(false);
        });
      });
    }
    else {
      console.log("user not found");
      setRefreshing(false);
    }
  }, []);

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

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
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            onEndReached();
          }
        }}
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
          <View style={{ height: 23 }} />
          {/* following | followers | edit/follow */}
          <UserInfoBar
            userData={userData}
            isUser={isUser}
            setUserData={setUserData}
            navigate={navigation.navigate}
          />
          { /* balance information */
            isUser && <BalanceSection userData={userData} />}
          <View style={{ height: 30 }} />
          <View style={{ marginVertical: 0 }}>
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
                marginBottom: 5,
              } : {
                flex: 1,
                width: fullWidth,
                borderRadius: 9,
                backgroundColor: colors.background,
                overflow: "hidden",
                alignItems: "center",
                marginBottom: 5,
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
                  width={flatListWidth}
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
      {loadRequested &&
        <View style={{
          position: 'absolute',
          alignItems: 'center',
          alignSelf: 'center',
          bottom: 10,
        }}>
          <ActivityIndicator size="small" color="white" />
        </View>}
      {modal && <PostPopUp info={modalInfo} />}
    </View>
  );
};
export default ActivityScreen;
