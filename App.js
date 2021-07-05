import React, { useEffect } from "react";
import { LogBox, AsyncStorageStatic } from "react-native";
import RootStackNavigator from "./navigations/RootStackNavigator";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import UsersContext from "./data/UsersContext";
import PostsContext from "./data/PostsContext";
import AppContext from "./data/AppContext";
import ThemeContextProvider from "./data/ThemeContextProvider";
import SwipeCardsContext from "./data/SwipeCardsContext";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import { images, remaining, posts, users } from './data/dummydata';
import { firebase } from './data/firebase';
import "firebase/firestore";
const firestore = firebase.firestore();

//const currentPosts = getPosts();

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {

  state = {
    isReady: false,
    remaining: [],
    posts: [], // call getPosts whenever the user opens the app!
    users: users,
    images: images, // make this a context so cached images can keep updating
    user: "jack.jack",
    userToken: "",
    uid: "b5aU5qla3eVPqX1asJviRcpYuDq1",
    theme: "dark",
    loadingMore: false,
    cursor: 0,
    loadList: [],
  };

  loadSize = 5;

  /* grabs freshly-approved posts with type: 0 */
  getSwipeCards() {
    // TO-DO: filter by user name: only the ones that match the current signed in user
    // fetch(`https://soshwrld.com/posts`).then((r) => { return r.json() }).then((d) => {
    //   return d.posts;
    // }).catch((err) => {
    //   console.log(err);
    // })
    let ret = {};
    firestore.collection('Posts').where("type", "==", 0).get().then((snapshot) => {
      snapshot.forEach((doc) => {
        const documentName = doc.id;
        ret[documentName] = doc.data();
      })
      this.setState({ remaining: ret });
    })
  }

  async refreshTimeline() {
    this.setState({ cursor: 0 });
    this.getTimeline();
  }

  async addRandomPost() {
    const dateApproved = { seconds: new Date().getTime() / 1000, nanoseconds: 0 };
    const dateBought = { seconds: new Date().getTime() / 1000 - Math.random() * 6048000, nanoseconds: 0 };
    // add post
    firestore.collection('Posts').add({
      dateApproved: dateApproved,
      dateBought: dateBought,
      itemImageURL: 'https://picsum.photos/800',
      itemName: 'New Item',
      itemURL: 'https://picsum.photos/',
      numBought: 0,
      storeName: 'Picsum',
      type: 0,
      userID: 'tqsjujBkrYfzwAqgpd2mE1ic0gn2',
      userImageURL: 'https://pbs.twimg.com/profile_images/634514155261833216/czgYrPLQ.jpg',
      userName: 'Travis Scott414'
    }).then((docRef) => {
      // get the list of followers of tqsjujBkrYfzwAqgpd2mE1ic0gn2
      firestore.collection('User-Profile').doc('tqsjujBkrYfzwAqgpd2mE1ic0gn2').collection('Followers').onSnapshot((snapshot) => {
        const followers = [];
        snapshot.forEach((doc) => {
          followers.push(doc.id);
        })
        console.log("followers.length: " + followers.length);
        // what should happen: add to timelines that follow the poster tqsjujBkrYfzwAqgpd2mE1ic0gn2
        // instead: 
        firestore.collection('Feeds').doc('b5aU5qla3eVPqX1asJviRcpYuDq1').collection('Timeline').doc(docRef.id).set({
          dateApproved: dateApproved,
          dateBought: dateBought
        });
      })
    })
  }

  /* grabs the posts for the timeline of the existing user */
  async getTimeline() {
    const cursor = this.state.cursor;
    let db = null;
    if (this.state.cursor === undefined) {
      return false;
    }
    if (this.state.cursor === 0) {
      db = firestore.collection('Feeds').doc(this.state.uid).collection('Timeline').orderBy("dateApproved", "desc");
    }
    else {
      db = firestore.collection('Feeds').doc(this.state.uid).collection('Timeline').orderBy("dateApproved", "desc").startAfter(cursor);
    }
    let refs = [];
    db.limit(this.loadSize).onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        refs.push(doc.id);
      });
      if (refs.length === 0) {
        return false;
      }
      const newCursor = snapshot.docs[snapshot.docs.length - 1];
      this.setState({ cursor: newCursor });
      let ret = [];
      firestore.collection('Posts').where(firebase.firestore.FieldPath.documentId(), 'in', refs).get().then((snapshot) => {
        snapshot.forEach((doc) => {
          const documentId = doc.id;
          const newObj = doc.data();
          newObj.id = documentId;
          ret.push(newObj);
        })
        ret.sort((a, b) => (a.dateApproved.seconds < b.dateApproved.seconds) ? 1 : - 1);
        this.setState({ posts: this.state.posts.concat(ret) });
        this.setState({ isReady: true });
        return true;
      })
    });
  }

  /* updates the feed context by grabbing more from firestore */
  loadMoreFeed = async info => {
    console.log("loadMoreFeed");
    if (this.state.loadingMore) {
      console.log("true that: loadingMore || loaded");
      return;
    }
    this.setState({ loadingMore: true });

    this.getTimeline().then((res) => {
      if (!res) {
        // there were no more
      }
    });

    this.setState({ loadingMore: false });

    return true;
  }

  componentDidMount() {
    this.getSwipeCards();
    this.getTimeline();
    LogBox.ignoreAllLogs(true);
  }

  popRemaining = (key) => {
    const newRemaining = this.state.remaining;
    delete newRemaining[key];
    this.setState(prev => ({ remaining: newRemaining }));
  }

  /* addPost = newPost => {
    this.setState(prev => ({ posts: [newPost, ...prev.posts] }));
  } */

  setImages = images => {
    this.images.setState({ images });
  }

  setUser = user => {
    this.setState({ user: user });
  }

  setUserToken = userToken => {
    this.setState({ userToken: userToken });
  }

  setUID = uid => {
    this.setState({ uid: uid });
  }

  async _loadAssetsAsync() {
    // TO-DO 1: grab these images from the posts and user data that's grabbed
    // TO-DO 2: when new posts are loaded ("new posts available" button) or the
    //          user pulls down for refresh, grab new images and user data
    //          again from backend and cache them
    // TO-D0 3: when some post data, images, and user data are out of view after
    //          a reload and it's no longer necessary to have them around,
    //          empty that cache
    const imageAssets = cacheImages(images);

    await Promise.all([...imageAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading/>
      );
    }

    return (
      /* Contexts can be composed later into a single component. */
      <SwipeCardsContext.Provider value={{
        remaining: this.state.remaining,
        popRemaining: this.popRemaining
      }}>
        <AppContext.Provider value={{
          user: this.state.user,
          //userToken: this.state.userToken,
          uid: this.state.uid, theme: this.state.theme,
          setUser: this.setUser,
          //setUserToken: this.setUserToken,
          setUID: this.setUID
        }}>
          <ThemeContextProvider>
            <UsersContext.Provider value={{ users: this.state.users }}>
              <PostsContext.Provider value={{
                posts: this.state.posts,
                loadMoreFeed: this.loadMoreFeed,
                addRandomPost: this.addRandomPost,
                /* addPost: this.addPost */
              }}>
                <NavigationContainer>
                  <RootStackNavigator />
                </NavigationContainer>
              </PostsContext.Provider>
            </UsersContext.Provider>
          </ThemeContextProvider>
        </AppContext.Provider>
      </SwipeCardsContext.Provider>
    );
  }
}
