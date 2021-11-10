import React, { useState, useEffect, useContext } from "react";
import { Dimensions, RefreshControl, ActivityIndicator, useWindowDimensions } from "react-native";
import {
  Text,
  View,
  ScrollView,
} from "react-native";
import AppContext from "../../data/AppContext";
import ThemeContext from "../../data/ThemeContext";
import WebStyleContext from "../../data/WebStyleContext";
import Header from './components/Header';
import TopGradient from "../web/TopGradient";
import WebNavigationView from "../web/WebNavigationView";
import WebHeaderView from "../web/WebHeaderView";
import Bio from './components/Bio';
import BalanceSection from './components/BalanceSection';
import UserInfoBar from './components/UserInfoBar';
import PostPopUp from "./components/PostPopUp";
import SelfPosts from "./components/SelfPosts";
import OtherUserPosts from "./components/OtherUserPosts";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { firebase } from '../../data/firebase';
import "firebase/firestore";
const firestore = firebase.firestore();

const ProfileScreen = ({ route, navigation }) => {
  const [isReady, setIsReady] = useState(false);
  const [isUser, setIsUser] = useState(true);
  const [userData, setUserData] = useState({});
  const [userFeed, setUserFeed] = useState([]);
  const [cursor, setCursor] = useState(0);
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loadRequested, setLoadRequested] = useState(false);
  const [currentRoute, setCurrentRoute] = useState("Home");

  const theme = useContext(AppContext).theme;
  const logger = useContext(AppContext).uid;
  const { platform } = useContext(AppContext);
  const colors = useContext(ThemeContext).colors[theme];
  const tabBarHeight = platform === "web" ? 0 : useBottomTabBarHeight();
  const window = useWindowDimensions();
  const { getCenterSectionWidth, getProfileWidth } = useContext(WebStyleContext);
  const paddingHorizontal = platform === "web" ? 0 : 12;

  function getUserData(uid, callback) {
    console.log("getUserData for user " + uid);

    // the user data collection
    const userProfileDB = firestore.collection('User-Profile').doc(uid);

    userProfileDB.get().then((doc) => {
      // TO-DO: also get the folollowing list from 'Following' collection
      const following = userProfileDB.collection('Following');
      const followers = userProfileDB.collection('Followers');
      const userBalanceDB = firestore.collection('User-Balance').doc(uid);
      following.get().then((following) => {
        followers.get().then((followers) => {

          let ret = doc.data();
          ret.userID = uid;
          ret.following = [];
          ret.followers = [];

          following.forEach((followingDoc) => {
            ret.following.push(followingDoc.id);
          })
          followers.forEach((followersDoc) => {
            ret.followers.push(followersDoc.id);
          })
          if (uid !== logger) {
            callback(ret);
          }
          else {
            userBalanceDB.get().then((userBalance) => {
              console.log("getting user balance");
              const balance = userBalance.data();
              if (balance) {
                ret.available = balance.activeBalance;
                ret.pending = balance.pendingBalance;
              }
              else {
                ret.available = 0;
                ret.pending = 0;
              }
              callback(ret);
            })
          }
        })
      })
    }).catch((error) => { console.log(error) });
  }

  function getUserFeed(uid, cursor, callback) {
    console.log("getUserFeed for user " + uid + " with cursor " + Object.keys(cursor));
    if (cursor === undefined) {
      callback([], cursor);
      return;
    }
    let db = firestore.collection('Feeds').doc(uid).collection('User').orderBy("timestamp", "desc");
    if (cursor !== 0) {
      db = db.startAfter(cursor);
    }
    const loadSize = 10;
    db.limit(loadSize).get().then((snapshot) => {
      let refs = [];
      snapshot.forEach((doc) => {
        refs.push(doc.id);
      });
      if (refs.length === 0) {
        callback([], cursor);
        return;
      }
      console.log("typeof refs.length: " + (typeof refs.length));
      console.log("refs.length === 0: " + (refs.length === 0));
      const posts = firestore.collection('Posts').where(firebase.firestore.FieldPath.documentId(), 'in', refs);
      posts.get().then((feedSnapshot) => {
        let ret = [];
        feedSnapshot.forEach((post) => {
          const documentId = post.id;
          const newObj = post.data();
          newObj.id = documentId;
          ret.push(newObj);
        });
        ret.sort((a, b) => (a.dateApproved.seconds < b.dateApproved.seconds) ? 1 : - 1);
        const newCursor = snapshot.docs[snapshot.docs.length - 1];
        callback(ret, newCursor);
      })
    })
  }

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
      navigation.setOptions({ title: userData.userName });
      setUserData(userData);
      getUserFeed(uid, cursor, (newItems, newCursor) => {
        setCursor(newCursor);
        setUserFeed(userFeed.concat(newItems));
        setShow(true);
      })
    })
  }, []);

  useEffect(() => {
    var uid = "";
    if (route.params === undefined) {
      console.log("this is how we know it's a user's me page");
      uid = logger;
    }
    else {
      if (platform === "web") {
        setCurrentRoute(route.params.currentRoute);
      }
      uid = route.params.uid;
      if (uid !== logger) {
        setIsUser(false);
      }
      else {
        setIsUser(true);
      }
    }
    getUserData(uid, (userData) => {
      console.log("from getUserData, userID: " + userData.userID);
      navigation.setOptions({ title: userData.userName });
      setUserData(userData);
      getUserFeed(uid, cursor, (newItems, newCursor) => {
        setCursor(newCursor);
        setUserFeed(newItems);
        setShow(true);
      })
    })
  }, [route]);

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

  function refresh(uid) {
    getUserData(uid, (newUserData) => {
      setUserData(newUserData);
      getUserFeed(uid, cursor, (newItems, newCursor) => {
        setCursor(newCursor);
        setUserFeed(newItems);
        setRefreshing(false);
      })
    });
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // parameter was not passed in; this is the profile tab
    if (route.params === undefined) {
      refresh(logger);
    }
    // parameter was passed in
    else if (route.params.uid !== undefined) {
      refresh(route.params.uid);
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
        style={{
          flex: 1,
          width: "100%",
          alignSelf: 'center',
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        showsVerticalScrollIndicator={false}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            onEndReached();
          }
        }}
      >
        <View
          style={{
            width: platform === "web" ? getProfileWidth(window.width) : "100%",
            alignSelf: 'center',
            paddingHorizontal: paddingHorizontal,
            // borderWidth: 1,
            // borderColor: 'pink'
          }}>

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

          {/* user balance info */}
          {isUser && <BalanceSection userData={userData} />}

          <View style={{ height: 30 }} />

          <View style={{
            marginVertical: 0,
          }}>
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
            {(isUser && (userFeed.length > 0)) ?
              /* user's posts */
              <View
                style={{
                  borderRadius: 9,
                  backgroundColor: platform === "web" ? colors.foreground4 : 'transparent',
                  overflow: "hidden",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <SelfPosts
                  userFeed={userFeed}
                  width={(platform === "web" ?
                    getProfileWidth(window.width) : window.width)
                    - 2 * paddingHorizontal}
                />
              </View> :
              (isUser && (userFeed.length === 0)) ?
                <View
                  style={{
                    borderRadius: 9,
                    backgroundColor: colors.foreground4,
                    overflow: "hidden",
                    alignItems: "center",
                    marginBottom: 5,
                    height: 110,
                    marginBottom: tabBarHeight + 5,
                    justifyContent: 'center',
                    shadowColor: 'black',
                    shadowOpacity: platform === "web" ? 0.3 : 0,
                    shadowRadius: 5,
                    shadowOffset: { width: 1, height: 1 }
                  }}>
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: 16,
                    }}>
                    Yet to post :)
                  </Text>
                </View> :
                <View
                  style={{
                    flex: 1,
                    borderRadius: 9,
                    overflow: "hidden",
                    alignItems: "center",
                    marginBottom: 5,
                    width: window.width,
                    alignSelf: 'center'
                  }}>
                  <OtherUserPosts
                    navigation={navigation}
                    userFeed={userFeed}
                    setModal={setModal}
                    setModalInfo={(info) => {
                      setModalInfo({
                        ...info,
                        navigate: navigation,
                        setModal: setModal,
                      });
                    }}
                  />
                </View>}
          </View>
        </View>
      </ScrollView>
    )
  }

  return (

    <View style={{
      flex: 1,
      backgroundColor: colors.eyeSafeBackground,
      alignItems: "center",
    }}>

      {/* web view background gray */}
      {platform === "web" &&
        <View
          style={{
            position: 'absolute',
            width: getCenterSectionWidth(window.width),
            height: "100%",
            alignSelf: 'center',
            backgroundColor: colors.webMainBackground
          }}>
        </View>
      }

      {show ?
        renderView()
        : <View />
      }

      {/* header */}
      {platform !== "web" && <Header title={userData.userName} />}

      {loadRequested &&
        <View style={{
          position: 'absolute',
          alignItems: 'center',
          alignSelf: 'center',
          bottom: 10,
        }}>
          <ActivityIndicator size="small" color="white" />
        </View>}
      {platform === "web" &&
        <TopGradient />}
      {/* {platform === "web" &&
        <WebHeaderView
          navigation={navigation}
          userName={userData.userName} />} */}
      {/* {platform === "web" &&
        <WebNavigationView
          currentRoute={currentRoute}
          navigation={navigation} />} */}
      {modal && <PostPopUp info={modalInfo} />}
    </View>
  );
};
export default ProfileScreen;
