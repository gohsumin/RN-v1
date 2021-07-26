import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import AppContext from "../data/AppContext";
import ThemeContext from "../data/ThemeContext";
import { AntDesign } from '@expo/vector-icons';
import HomeFeed from "./components/HomeFeed";
import AppLoading from "expo-app-loading";
import { firebase } from '../data/firebase';
import "firebase/firestore";
const firestore = firebase.firestore();

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [latestDateApproved, setLatestDateApproved] = useState("0");
  const [snapshotListener, setSnapshotListener] = useState(null);
  const [newPostExists, setNewPostExists] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadRequested, setLoadRequested] = useState(false);
  const { theme, uid } = React.useContext(AppContext);
  const colors = React.useContext(ThemeContext).colors[theme];
  const flatlistRef = useRef();
  const loadSize = 8;

  function getTimeline() {
    if (cursor === undefined) {
      console.log("cursor is undefined");
      return;
    }
    let db = null;
    if (cursor === 0) {
      db = firestore.collection('Feeds').doc(uid).collection('Timeline').orderBy("dateApproved", "desc");
    }
    else {
      db = firestore.collection('Feeds').doc(uid).collection('Timeline').orderBy("dateApproved", "desc").startAfter(cursor);
    }
    // list of post ids to include in the timeline. Should never exceed 10 items
    let refs = [];
    db.limit(loadSize).get().then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log("document id for a post: " + doc.id);
        refs.push(doc.id);
      });

      if (refs.length === 0) {
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
          setLatestDateApproved(ret[0].dateApproved);
        }
        setCursor(snapshot.docs[snapshot.docs.length - 1]);
        setPosts([...posts, ...ret]);
        return;
      })
    });
  }

  function loadMoreFeed() {
    console.log("about to call getTimeline from loadMoreFeed");
    getTimeline();
  }

  useEffect(() => {
    if (isReady && cursor === 0) {
      console.log("cursor just reset to 0");
      getTimeline();
    }
  }, [cursor]);

  useEffect(() => {
    if (refreshing) {
      setRefreshing(false);
    }
    if (!isReady) {
      setIsReady(true);
    }
  }, [posts]);

  function refreshTimeline() {
    console.log("Home.js: refreshTimeline");
    setCursor(0);
  }

  // on initial render, grab the first load
  useEffect(() => {
    console.log("Home.js: calling getTimeline")
    getTimeline();
  }, []);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refreshTimeline();
  }, []);

  const onNewPostView = React.useCallback(() => {
    console.log("new post view called");
    setRefreshing(true);
    loadNewPosts(() => {
      wait(0).then(() => {
        setRefreshing(false);
        flatlistRef.current.scrollToIndex({ index: 0 });
      });
    });
  }, []);

  const onEndReached = () => {
    loadMoreFeed();
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        alignItems: "center"
      }}
    >
      <HomeFeed
        posts={posts}
        onEndReached={onEndReached}
        refreshing={refreshing}
        onRefresh={onRefresh}
        flatlistRef={flatlistRef}
        navigation={navigation}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
      //onPress={addRandomPost}
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
      </TouchableOpacity>
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
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh} />
      {!isReady && <AppLoading />}
    </SafeAreaView>
  );
};

export default HomeScreen;
