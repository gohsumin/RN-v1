import React, { useEffect } from "react";
import { LogBox } from "react-native";
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
  };

  /* grabs freshly-approved posts with type: 0 */
  getPosts() {
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

  /* grabs the posts for the timeline of the existing user */
  getTimeline() {
    let ret = {};
    firestore.collection('Feeds').doc(this.state.uid).collection('Timeline').onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const documentName = doc.id;
        ret[documentName] = doc.data();
      });
      this.setState({ posts: ret });
    });
  }

  componentDidMount() {
    this.getPosts();
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
    this.setState({ uid: uid })
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
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      /* Contexts can be composed later into a single component. */
      <SwipeCardsContext.Provider value={{ remaining: this.state.remaining, popRemaining: this.popRemaining }}>
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
              <PostsContext.Provider value={{ posts: this.state.posts, /* addPost: this.addPost */ }}>
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
