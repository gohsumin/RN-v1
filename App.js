import React, { useEffect } from "react";
import { LogBox, Platform } from "react-native";
import RootStackNavigator from "./navigations/RootStackNavigator";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import UsersContext from "./data/UsersContext";
import PostsContext from "./data/PostsContext";
import AppContext from "./data/AppContext";
import ThemeContextProvider from "./data/ThemeContextProvider";
import SwipeCardsContext from "./data/SwipeCardsContext";
import { Asset } from "expo-asset";
import { images, remaining, posts, users } from './data/dummydata';
import { firebase } from './data/firebase';
import "firebase/firestore";
import StyleContextProvider from "./data/StyleContextProvider";
const firestore = firebase.firestore();

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

  constructor(props) {
    super(props);
    this.state = {
      remaining: [],
      images: images, // make this a context so cached images can keep updating
      user: "rihanna",
      uid: "yZdwQLMTvgT1nvCwJFyzLUnfvX83",
      theme: "dark",
    };
    this.platform = Platform.OS;
    this.updateTimelineAfterFollowing = this.updateTimelineAfterFollowing.bind(this);
    this.updateTimelineAfterUnfollowing = this.updateTimelineAfterUnfollowing.bind(this);
  }

  /* grabs freshly-approved posts with type: 0 */
  getSwipeCards() {
    // TO-DO: filter by user name: only the ones that match the current signed in user
    // fetch(`https://soshwrld.com/posts`).then((r) => { return r.json() }).then((d) => {
    //   return d.posts;
    // }).catch((err) => {
    //   console.log(err);
    // })
    let ret = {};
    firestore.collection('Posts').where("type", "==", 0).where("userID", "==", this.state.uid).get().then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log("swipe card id : " + doc.id);
        const documentName = doc.id;
        ret[documentName] = doc.data();
      })
      this.setState({ remaining: ret });
    })
  }

  updateTimelineAfterFollowing(followingUID) {
    console.log("updateTimelineAfterFollowing");
    if (this.state.uid === "") {
      return;
    }
    // reference to logged in user's timeline
    const db = firestore.collection('Feeds').doc(this.state.uid).collection('Timeline');

    // followingUID's posts
    const posts = firestore.collection('Posts').where('type', '==', 1).where('userID', '==', followingUID);
    posts.get().then((docs) => {
      //console.log(docs);
      docs.forEach((doc) => {
        console.log("post id: " + doc.id);
        db.doc(doc.id).set({
          dateApproved: doc.data().dateApproved,
          dateBought: doc.data().dateBought
        }).then(() => { }).catch((error) => { console.log(error) });
      })
    }).catch((error) => console.log(error));
  }

  updateTimelineAfterUnfollowing(unfollowingUID) {
    if (this.state.uid === "") {
      return;
    }
    // reference to logged in user's timeline
    const db = firestore.collection('Feeds').doc(this.state.uid).collection('Timeline');
    // followingUID's posts
    const posts = firestore.collection('Posts').where('type', '==', 1).where('userID', '==', unfollowingUID);
    posts.get().then((docs) => {
      docs.forEach((doc) => {
        db.doc(doc.id).delete().then(() => { }).catch((error) => { console.log(error) });
      })
    }).catch((error) => console.log(error));
  }

  componentDidMount() {
    LogBox.ignoreAllLogs(true);
  }

  componentWillUnmount() {
    console.log("COMPONENT WILL UNMOUNT");
  }

  popRemaining = (key) => {
    const newRemaining = this.state.remaining;
    delete newRemaining[key];
    this.setState(prev => ({ remaining: newRemaining }));
  }

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
    return (
      /* Contexts can be composed later into a single component. */
      <StyleContextProvider>
        <SwipeCardsContext.Provider value={{
          remaining: this.state.remaining,
          popRemaining: this.popRemaining
        }}>
          <AppContext.Provider value={{
            platform: this.platform,
            user: this.state.user,
            uid: this.state.uid,
            theme: this.state.theme,
            setUser: this.setUser,
            setUID: this.setUID
          }}>
            <ThemeContextProvider>
              <UsersContext.Provider>
                <PostsContext.Provider value={{
                  updateTimelineAfterFollowing: this.updateTimelineAfterFollowing,
                  updateTimelineAfterUnfollowing: this.updateTimelineAfterUnfollowing,
                }}>
                  <NavigationContainer>
                    <RootStackNavigator />
                  </NavigationContainer>
                </PostsContext.Provider>
              </UsersContext.Provider>
            </ThemeContextProvider>
          </AppContext.Provider>
        </SwipeCardsContext.Provider>
      </StyleContextProvider>
    );
  }
}
