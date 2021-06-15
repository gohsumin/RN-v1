import React from "react";
import RootStackNavigator from "./navigations/RootStackNavigator";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import UsersContext from "./data/UsersContext";
import PostsContext from "./data/PostsContext";
import AppContextProvider from "./data/AppContextProvider";
import ThemeContextProvider from "./data/ThemeContextProvider";
import SwipeCardsContext from "./data/SwipeCardsContext";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import { images, remaining, posts, users } from './data/dummydata';

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
  };

  setRemaining = cards => {
    this.remaining.setState({ cards });
  }

  addPost = newPost => {
    this.setState(prev => ({posts: [newPost, ...prev.posts]}));
  }

  setImages = images => {
    this.images.setState({ images });
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
      <SwipeCardsContext.Provider value={{ remaining: this.state.remaining, setRemaining: this.setRemaining }}>
        <AppContextProvider>
          <ThemeContextProvider>
            <UsersContext.Provider value={{ users: this.state.users }}>
              <PostsContext.Provider value={{ posts: this.state.posts, addPost: this.addPost }}>
                <NavigationContainer>
                  <RootStackNavigator />
                </NavigationContainer>
              </PostsContext.Provider>
            </UsersContext.Provider>
          </ThemeContextProvider>
        </AppContextProvider>
      </SwipeCardsContext.Provider>
    );
  }
}
