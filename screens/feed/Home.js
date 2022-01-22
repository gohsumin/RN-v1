import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions
} from "react-native";
import AppContext from "../../data/AppContext";
import ThemeContext from "../../data/ThemeContext";
import WebStyleContext from "../../data/WebStyleContext";
import { AntDesign } from '@expo/vector-icons';
import HomeFeed from "./components/HomeFeed";
import CenterBackground from "../web/CenterBackground";
import AppLoading from "expo-app-loading";
import WebHeaderView from "../web/WebHeaderView";
import WebNavigationView from "../web/WebNavigationView";
import { firebase } from '../../data/firebase';
import "firebase/compat/firestore";
import { LinearGradient } from "expo-linear-gradient";
import TopGradient from "../web/TopGradient";
const firestore = firebase.firestore();

const HomeScreenasdf = () => {
  const { platform } = React.useContext(AppContext);
  const { getCenterSectionWidth } = React.useContext(WebStyleContext);

  return (
    <View style={{
      flex: 1,
      backgroundColor: 'salmon',
      paddingHorizontal: 20,
      paddingVertical: 50,
    }}>
      <Text style={{
        color: "white",
        fontWeight: "bold",
      }}>
        platform: {platform}
        {"\n"}
        platform === "web": {platform === "web"}
      </Text>
    </View>
  )
}

const HomeScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [cursor, setCursor] = useState(0);
  const latestDateApproved = useRef("0");
  const [snapshotListener, setSnapshotListener] = useState(null);
  const [newPostExists, setNewPostExists] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadRequested, setLoadRequested] = useState(false);
  const [currentRoute, setCurrentRoute] = useState("Home");
  const { theme, uid, platform } = React.useContext(AppContext);
  const colors = React.useContext(ThemeContext).colors[theme];
  const flatlistRef = useRef();
  const loadSize = 8;
  const window = useWindowDimensions();
  const { getCenterSectionWidth, getHeaderWidth, topSectionHeight } = React.useContext(WebStyleContext);

  function listenForNewPosts() {
   //console.log("listenForNewPosts");
    const db = firestore.collection('Feeds').doc(uid).collection('Timeline');
    /* const listener =  */db.orderBy('timestamp', 'desc').limit(1).onSnapshot((snapshot) => {
     //console.log("onSnapshot");
      const changes = snapshot.docChanges();
      changes.forEach((change) => {
        if (change.type === 'added' && change.doc.data().timestamp.seconds > latestDateApproved.current.seconds) {
         //console.log("change.doc.data().timestamp.seconds: " + change.doc.data().timestamp.seconds);
         //console.log("change.doc.id: " + change.doc.id);
          setNewPostExists(true);
        }
      });
    });
    //setSnapshotListener(listener);
  }

  function getTimeline() {
    if (cursor === undefined) {
     //console.log("cursor is undefined");
      setRefreshing(false);
      setLoadRequested(false);
      return;
    }
    let db = null;
    if (cursor === 0) {
      db = firestore.collection('Feeds').doc(uid).collection('Timeline').orderBy("timestamp", "desc");
    }
    else {
      db = firestore.collection('Feeds').doc(uid).collection('Timeline').orderBy("timestamp", "desc").startAfter(cursor);
    }
    // list of post ids to include in the timeline. Should never exceed 10 items
    let refs = [];
    db.limit(loadSize).get().then((snapshot) => {
     //console.log("about to get post ids");
      snapshot.forEach((doc) => {
       //console.log("document id for a post: " + doc.id);
        refs.push(doc.id);
      });

     //console.log(Object.keys(refs).length === 0);

      if (Object.keys(refs).length === 0) {
        setRefreshing(false);
        setLoadRequested(false);
        return;
      }

      const postsDB = firestore.collection('Posts').where(firebase.firestore.FieldPath.documentId(), 'in', refs);

      postsDB.get().then((feedSnapshot) => {

        let ret = [];
        feedSnapshot.forEach((post) => {
          const documentId = post.id;
          const newObj = post.data();
          newObj.id = documentId;
          ret.push(newObj);
        });

        // if it's the first time loading the feed, get dateApproved of the latest post
        ret.sort((a, b) => (a.dateApproved.seconds < b.dateApproved.seconds) ? 1 : - 1);
        if (cursor === 0) {
          latestDateApproved.current = ret[0].dateApproved;
        }
        setCursor(snapshot.docs[snapshot.docs.length - 1]);
        if (isReady && cursor === 0) {
          setPosts(ret);
        }
        else {
          setPosts([...posts, ...ret]);
        }
        return;
      })
    });
  }

  useEffect(() => {
    if (isReady && cursor === 0) {
     //console.log("cursor just reset to 0");
      getTimeline();
    }
  }, [cursor]);

  useEffect(() => {
    if (platform === "web" && route.params !== undefined) {
     //console.log(route.params.currentRoute + "!!!");
      setCurrentRoute(route.params.currentRoute);
    }
  }, [route]);

  useEffect(() => {
    if (refreshing) {
      setRefreshing(false);
    }
    if (!isReady && cursor !== 0) {
      setIsReady(true);
    }
    if (loadRequested) {
      setLoadRequested(false);
    }
    if (newPostExists) {
      setNewPostExists(false);
      flatlistRef.current.scrollToIndex({ index: 0 });
    }
  }, [posts]);

  // on initial render, grab the first load
  useEffect(() => {
   //console.log("Home.js: calling getTimeline and listenForNewPosts");
    getTimeline();
    listenForNewPosts();

    return () => {
     //console.log("Home.js: about to unmount");
      //snapshotListener();
    }
  }, []);

  function addRandomPost() {
    const dateApproved = { seconds: new Date().getTime() / 1000, nanoseconds: 0 };
    const dateBought = { seconds: new Date().getTime() / 1000 - Math.random() * 6048000, nanoseconds: 0 };
    // add post
    firestore.collection('Posts').add({
      dateApproved: dateApproved,
      dateBought: dateBought,
      itemImageURL: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1612995602-df-34_gal-large1_35ce02b1-99d5-48ee-901f-f21d8f9d5f2f_345x@2x.jpg?crop=1xw:1xh;center,top&resize=768:*',
      itemName: 'Time Cube',
      itemURL: 'https://datexx.com/collections/timers/products/df-34',
      numBought: 0,
      storeName: 'Datexx',
      type: 1,
      userID: 'yZdwQLMTvgT1nvCwJFyzLUnfvX83',
      userImageURL: 'https://static.wikia.nocookie.net/disney/images/7/7f/Rihanna.jpg/revision/latest/top-crop/width/360/height/450?cb=20200201173202',
      userName: 'Rihanna'
    }).then((post) => {
      // for now, just add post to the user's own timeline
      firestore.collection('Feeds').doc('yZdwQLMTvgT1nvCwJFyzLUnfvX83').collection('Timeline').doc(post.id).set({
        timestamp: timestamp,
        dateBought: dateBought
      });
      firestore.collection('Feeds').doc('yZdwQLMTvgT1nvCwJFyzLUnfvX83').collection('User').doc(post.id).set({
        timestamp: timestamp,
        dateBought: dateBought
      });
    })
  }

  function loadMoreFeed() {
   //console.log("about to call getTimeline from loadMoreFeed");
    getTimeline();
  }

  function refreshTimeline() {
   //console.log("Home.js: refreshTimeline");
    setCursor(0);
  }

  function loadNewPosts() {
   //console.log("loadNewPosts");
    const db = firestore.collection('Feeds').doc(uid).collection('Timeline');
    db.where('timestamp.seconds', '>', latesttimestamp.current.seconds).get().then((snapshot) => {
      let refs = [];
      snapshot.forEach((doc) => {
        refs.push(doc.id);
      });
     //console.log("refs: " + refs);
      if (refs.length === 0) {
        setNewPostExists(false);
        return;
      }
      const postsDB = firestore.collection('Posts').where(firebase.firestore.FieldPath.documentId(), 'in', refs);
      postsDB.get().then((feedSnapshot) => {
        let ret = [];
        feedSnapshot.forEach((post) => {
          const documentId = post.id;
          const newObj = post.data();
          newObj.id = documentId;
          ret.push(newObj);
        });
        ret.sort((a, b) => (a.timestamp.seconds < b.timestamp.seconds) ? 1 : - 1);
        latesttimestamp.current = ret[0].timestamp;
        setPosts([...ret, ...posts]);
        return;
      })
    });
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refreshTimeline();
  }, []);

  const onNewPostView = React.useCallback(() => {
   //console.log("new post view called");
    loadNewPosts();
  }, []);

  const onEndReached = () => {
    setLoadRequested(true);
    loadMoreFeed();
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.eyeSafeBackground,
        alignItems: "center",
      }}
    >

      {/* background in the center section */}
      {platform === "web" &&
        <CenterBackground />
      }

      {/* home header on app */}
      {platform !== "web" &&
        <LinearGradient
          style={{
            width: "100%",
            height: 105,
            justifyContent: 'flex-end',
          }}
          colors={colors.homeHeaderGradient}
          locations={[0, 1]}
        >
          <Text
            style={{
              textAlignVertical: 'bottom',
              marginLeft: 33,
              marginBottom: 14,
              fontSize: 37,
              fontWeight: 'bold',
              color: colors.antiBackground
            }}>
            Home
          </Text>
        </LinearGradient>}

      <HomeFeed
        posts={posts}
        onEndReached={onEndReached}
        refreshing={refreshing}
        onRefresh={onRefresh}
        flatlistRef={flatlistRef}
        navigation={navigation}
      />
      {/* <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
        onPress={addRandomPost}
      >
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
      </TouchableOpacity> */}
      {loadRequested &&
        <View style={{ position: 'absolute', alignItems: 'center', bottom: 10 }}>
          <ActivityIndicator size="small" color="white" />
        </View>}
      {newPostExists &&
        <TouchableOpacity
          onPress={onNewPostView}
          style={{
            position: 'absolute',
            paddingVertical: 10,
            paddingHorizontal: 12,
            borderRadius: 25,
            backgroundColor: colors.blue,
            alignSelf: 'center',
            top: 19,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Text style={{
            textAlign: 'center',
            fontSize: 15.5,
            color: 'white',
            fontWeight: 'bold',
            marginRight: 3
          }}>
            New Posts
          </Text>
          <AntDesign name="arrowup" size={17} color="white" />
        </TouchableOpacity>}
      {!isReady && <AppLoading />}
      {platform === "web" &&
        <TopGradient />}
    </SafeAreaView>
  );
};

export default HomeScreen;
