import React, { useState, useEffect, useContext } from "react";
import {
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import {
  View,
} from "react-native";
import AppContext from "../../data/AppContext";
import ThemeContext from "../../data/ThemeContext";
import WebStyleContext from "../../data/WebStyleContext";
import TopGradient from "../web/TopGradient";
import PostPopUp from "./components/PostPopUp";
import OtherUserPosts from "./components/OtherUserPosts";
import { Helmet } from "react-helmet";
import StickyHeader from "./components/StickyHeader";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { firebaseApp } from "../../data/firebase";
import {
  getFirestore,
  getDoc,
  doc,
  collection,
  query,
  getDocs,
  orderBy,
  limit,
  where,
  startAfter,
  FieldPath
} from "firebase/firestore";

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
    const db = getFirestore(firebaseApp);
    const userProfileRef = doc(db, "User-Profile", uid);
    getDoc(userProfileRef).then((doc) => {
      let ret = doc.data();
      ret.userID = uid;
      if (uid !== logger) {
        callback(ret);
      }
      else {
        // const userBalanceRef = doc(db, "User-Balance", uid);
        ret.available = 0;
        ret.pending = 0;
        // getDoc(userBalanceRef).then((userBalance) => {
        //   const balance = userBalance.data();
        //   if (balance) {
        //     ret.available = balance.activeBalance;
        //     ret.pending = balance.pendingBalance;
        //   }
        //   callback(ret);
        // }).catch(() => {
        //   callback(ret);
        // })
        callback(ret);
      }
    }).catch((error) => { console.log(error) });
  }

  function getUserFeed(uid, cursor, callback) {
    //  console.log("getUserFeed for user " + uid + " with cursor " + Object.keys(cursor));
    if (cursor === undefined) {
      callback([], cursor);
      return;
    }
    const db = getFirestore(firebaseApp);
    const userFeedRef = collection(doc(db, "Feeds", uid), "User");
    const loadSize = 10;
    let feedQuery;
    if (cursor !== 0) {
      feedQuery = query(userFeedRef, orderBy("timestamp", "desc"), startAfter(cursor), limit(loadSize));
    }
    else {
      feedQuery = query(userFeedRef, orderBy("timestamp", "desc"), limit(loadSize));
    }
    getDocs(feedQuery).then((snapshot) => {
      let refs = [];
      snapshot.forEach((doc) => {
        refs.push(doc.id);
      });
      if (refs.length === 0) {
        callback([], cursor);
        return;
      }
      const postsRef = collection(db, "Posts");
      const postsQuery = query(postsRef, where(FieldPath.documentId(), 'in', refs));
      getDocs(postsQuery).then((feedSnapshot) => {
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
      }).catch(err => {
        callback([], cursor);
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
    refresh(userData.userID);
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
          backgroundColor: colors.eyeSafeBackground,
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
};
export default ProfileScreen;
