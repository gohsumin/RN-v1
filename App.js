import React from "react";
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
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAUSNeT750wI-oDmpQm4AZcsYmZfc-ShSU",
  authDomain: "soshwrldinc.firebaseapp.com",
  projectId: "soshwrldinc",
  storageBucket: "soshwrldinc.appspot.com",
  messagingSenderId: "342162757131",
  appId: "1:342162757131:web:398ab17e13b560d8f0990e",
  measurementId: "G-JMPYGPX7P5"
};

firebase.default.initializeApp(firebaseConfig);

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
    remaining: remaining,
    posts: posts,
    users: users,
    images: images, // make this a context so cached images can keep updating
    user: "",
    theme: "dark",
  };

  popRemaining = () => {
    this.setState(prev => ({remaining: prev.remaining.slice(1)}));
  }

  addPost = newPost => {
    this.setState(prev => ({posts: [newPost, ...prev.posts]}));
  }

  setImages = images => {
    this.images.setState({ images });
  }

  setUser = user => {
    this.setState({user: user});
  }

  /* To-do: get a list of file names in the assets folder */
  async _loadAssetsAsync() {
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
        <AppContext.Provider value={{ user: this.state.user, theme: this.state.theme, setUser: this.setUser }}>
          <ThemeContextProvider>
            <UsersContext.Provider value={{ users: this.state.users }}>
              <PostsContext.Provider value={{ posts: this.state.posts, addPost: this.addPost }}>
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
