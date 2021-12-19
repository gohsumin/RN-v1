import React, { useState, useEffect, useContext } from "react";
import {
  RefreshControl,
  ActivityIndicator,
  useWindowDimensions
} from "react-native";
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
import Bio from './components/Bio';
import BalanceSection from './components/BalanceSection';
import UserInfoBar from './components/UserInfoBar';
import PostPopUp from "./components/PostPopUp";
import SelfPosts from "./components/SelfPosts";
import ProfileTop from "./components/ProfileTop";
import OtherUserPosts from "./components/OtherUserPosts";
import { Helmet } from "react-helmet";
import StickyHeader from "./components/StickyHeader";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { firebase } from '../../data/firebase';
import "firebase/firestore";
const firestore = firebase.firestore();

// NUMBER OF CLICKS & STATS ON THE USERS THAT CLICKED (E.G. LOCATION)

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
  const [topHeight, setTopHeight] = useState(0);
  const [stickyHeaderOpacity, setStickyHeaderOpacity] = useState(0);
  const [isStickyHeaderExpanded, setIsStickyHeaderExpanded] = useState(false);
  const [updateToggle, setUpdateToggle] = useState(true);

  const theme = useContext(AppContext).theme;
  const logger = useContext(AppContext).uid;
  const { platform } = useContext(AppContext);
  const colors = useContext(ThemeContext).colors[theme];
  const tabBarHeight = platform === "web" ? 0 : useBottomTabBarHeight();
  const stickyHeaderHeight = 65;
  const window = useWindowDimensions();
  const { getCenterSectionWidth, getProfileWidth } = useContext(WebStyleContext);
  const paddingHorizontal = platform === "web" ? 0 : 12;

  function getUserData(uid, callback) {
    //console.log("getUserData for user " + uid);

    // the user data collection
    const userProfileDB = firestore.collection('User-Profile').doc(uid);

    userProfileDB.get().then((doc) => {
      const userBalanceDB = firestore.collection('User-Balance').doc(uid);
      let ret = doc.data();
      ret.userID = uid;
      if (uid !== logger) {
        callback(ret);
      }
      else {
        userBalanceDB.get().then((userBalance) => {
          //console.log("getting user balance");
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
    }).catch((error) => { console.log(error) });
  }

  function getUserFeed(uid, cursor, callback) {
    //  console.log("getUserFeed for user " + uid + " with cursor " + Object.keys(cursor));
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
      const posts = firestore.collection('Posts').where(firebase.firestore.FieldPath.documentId(), 'in', refs);
      posts.get().then((feedSnapshot) => {
        //console.log("after getting posts");
        let ret = [];
        feedSnapshot.forEach((post) => {
          //console.log("post id: " + post.id);
          const documentId = post.id;
          const newObj = post.data();
          newObj.id = documentId;
          ret.push(newObj);
        });
        //console.log("ret: "+ret);
        ret.sort((a, b) => (a.dateApproved.seconds < b.dateApproved.seconds) ? 1 : - 1);
        const newCursor = snapshot.docs[snapshot.docs.length - 1];
        callback(ret, newCursor);
      })
    })
  }

  useEffect(() => {
    if (route.params.app === "uid" && route.params.id != undefined) {
      let uid = route.params.id;
      getUserData(uid, (userData) => {
        navigation.setOptions({ title: userData.userName });
        setUserData(userData);
        getUserFeed(uid, cursor, (newItems, newCursor) => {
          setCursor(newCursor);
          setUserFeed(userFeed.concat(newItems));
          setIsUser(logger === uid);
          setShow(true);
        })
      })
    }
    else if (route.params.app === "ig" && route.params.id != undefined) {
      // check if ig exists
      const userProfileDB = firestore.collection('User-Profile');
      userProfileDB.where("instagramHandle", "==", route.params.id).limit(1).get().then((snapshot) => {
        if (snapshot != null) {
          snapshot.forEach((doc) => {
            getUserData(doc.id, (userData) => {
              navigation.setOptions({ title: userData.userName });
              setUserData(userData);
              getUserFeed(doc.id, cursor, (newItems, newCursor) => {
                setCursor(newCursor);
                setUserFeed(userFeed.concat(newItems));
                setIsUser(logger === doc.id);
                setShow(true);
              })
            })
          })
        }
        else {
          // 404 not found
        }
      });
    }
    else if (route.params === undefined) { // should be deprecated
      //console.log("this is how we know it's a user's me page");
      let uid = logger;
      getUserData(doc.id, (userData) => {
        //console.log("from getUserData, userID: " + userData.userID);
        navigation.setOptions({ title: userData.userName });
        setUserData(userData);
        getUserFeed(doc.id, cursor, (newItems, newCursor) => {
          setCursor(newCursor);
          setUserFeed(userFeed.concat(newItems));
          setShow(true);
        })
      })
    }
    else {
      // 404 not found
    }
  }, []);

  useEffect(() => {
    //console.log("userFeed updated");
    setUpdateToggle(!updateToggle);
  }, [userFeed])

  function onEndReached() {
    //console.log("end reached, toggle: "+updateToggle);
    if (!loadRequested) {
      setLoadRequested(true);
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
      setRefreshing(false);
    }
  }, []);

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  const distanceToStickyHeader = ({ contentOffset }) => {
    // positive: distance remaining from top; negative: distance remaining from bottom
    const currentOffset = contentOffset.y - topHeight;
    return currentOffset;
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
            width: "100%",
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
                  backgroundColor: 'transparent',
                  overflow: "hidden",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <SelfPosts
                  userFeed={userFeed}
                  width={window.width - 2 * paddingHorizontal}
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
                    shadowOpacity: 0,
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
                    borderRadius: 9,
                    backgroundColor: 'transparent',
                    overflow: "hidden",
                    alignItems: "center",
                    marginBottom: 5,
                  }}
                >
                  <OtherUserPosts
                    userFeed={userFeed}
                    width={window.width - 2 * paddingHorizontal}
                  />
                </View>}
          </View>
        </View>
      </ScrollView>
    )
  }

  const renderWebView = () => {
    return (
      <View style={{
        height: window.height,
        width: window.width,
        // borderWidth: 1,
        // borderColor: 'pink'
      }} >
        <ScrollView
          style={{
            flex: 1,
            alignSelf: 'center',
            width: "100%",
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
            const threshhold = 80;
            const d = distanceToStickyHeader(nativeEvent);
            if (d < -threshhold) {
              setStickyHeaderOpacity(0);
            }
            else if (d < 0) {
              setIsStickyHeaderExpanded(false);
              setStickyHeaderOpacity((threshhold + d) / threshhold);
            }
            else {
              setStickyHeaderOpacity(1);
            }
          }}
          scrollEventThrottle={5}
        >

          <View
            style={{
              // borderRadius: 9,
              position: "absolute",
              backgroundColor: 'transparent',
              //backgroundColor: colors.foreground4,
              // overflow: "hidden",
              alignSelf: "center",
              alignItems: "center",
              // borderColor: "orange",
              // borderWidth: 1
            }}
          >
            <OtherUserPosts
              updateToggle={updateToggle}
              userFeed={userFeed}
              width={getProfileWidth(window.width)}
              topHeight={topHeight}
              height={window.height - topHeight}
            />
          </View>

          <ProfileTop
            topHeight={topHeight}
            setTopHeight={setTopHeight}
            userData={userData}
            isUser={isUser}
            setUserData={setUserData}
            navigate={navigation.navigate} />

        </ScrollView>
      </View>
    )
  }

  if (platform === "web") {

    let userName;
    let userImage;
    let uid;
    let link;
    if (route.params.app === "uid" && route.params.id != undefined) {
      uid = route.params.id;
      link = "https://www.soshworld.com/uid/" + uid;
    }
    else if (route.params.app === "ig" && route.params.id != undefined) {
      link = "https://www.soshworld.com/ig/" + route.params.id;
      // check if ig exists
      const userProfileDB = firestore.collection('User-Profile');
      userProfileDB.where("instagramHandle", "==", route.params.id).limit(1).get().then((snapshot) => {
        if (snapshot != null) {
          snapshot.forEach((doc) => {
            uid = doc.id;
            getUserData(uid, (userData) => {
              userName = userData.userName;
              userImage = userData.userImage;
            })
          })
        }
      });
    }
    else {
      userName = "";
      userImage = "";
      uid = "";
      link = "";
    }
    getUserData(uid, (userData) => {
      userName = userData.userName;
      userImage = userData.userImageURL;
    });

    return (
      <View style={{
        flex: 1,
        backgroundColor: colors.eyeSafeBackground,
        alignItems: "center",
      }}>

        <Helmet>
          <meta property='og:title' content={userName ? userName : "SOSH WORLD"} />
          <meta property='og:image' content={userImage ? userImage : 'https://www.soshworld.com/static/media/SoShNavLogo.4e45a847.png'} />
          <meta property='og:description' content={"Follow what " +
            (userName ? userName + " is" : "your favorite influences are") +
            " buying."} />
          <meta property='og:url' content={location.href} />
        </Helmet>

        {/* web view background gray */}
        <View
          style={{
            position: 'absolute',
            width: getCenterSectionWidth(window.width),
            height: "100%",
            alignSelf: 'center',
            backgroundColor: colors.webMainBackground,
            // shadowRadius: 20,
            // shadowColor: "black",
            // shadowOpacity: 1
          }}>
        </View>
        <TopGradient />

        {show ?
          <OtherUserPosts
            updateToggle={updateToggle}
            userFeed={userFeed}
            width={getProfileWidth(window.width)}
            topHeight={topHeight}
            setTopHeight={setTopHeight}
            isUser={isUser}
            userData={userData}
            setUserData={setUserData}
            navigate={() => { }}
            height={window.height - topHeight}
            setStickyHeaderOpacity={setStickyHeaderOpacity}
            setIsStickyHeaderExpanded={setIsStickyHeaderExpanded}
            onEndReached={onEndReached}
            loadRequested={loadRequested}
          />
          : <View />
        }

        <StickyHeader
          opacity={stickyHeaderOpacity}
          isStickyHeaderExpanded={isStickyHeaderExpanded}
          setIsStickyHeaderExpanded={setIsStickyHeaderExpanded}
          stickyHeaderHeight={stickyHeaderHeight}
          topHeight={topHeight}
          userData={userData}
          colors={colors}
          setTopHeight={setTopHeight}
          userData={userData}
          isUser={isUser}
          setUserData={setUserData}
          navigate={() => { }} />

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
    )
  }
  else {
    return (
      <View style={{
        flex: 1,
        backgroundColor: colors.eyeSafeBackground,
        alignItems: "center",
      }}>

        {show ?
          renderView()
          : <View />
        }

        {/* header */}
        <Header title={userData.userName} />

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
    )
  }
};
export default ProfileScreen;
