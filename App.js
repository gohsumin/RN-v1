import React from "react";
import TabBar from "./navigations/TabBar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import UsersContextProvider from "./data/UsersContextProvider";
import PostsContextProvider from "./data/PostsContextProvider";
import AppContextProvider from "./data/AppContextProvider";
import ThemeContextProvider from "./data/ThemeContextProvider";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";

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
  };

  /* To-do: get a list of file names in the assets folder */
  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require("./assets/annawiener.png"),
      require("./assets/ayadakhtar.png"),
      require("./assets/barackobama.png"),
      require("./assets/britbennett.png"),
      require("./assets/jamesmcbride.png"),
      require("./assets/jamesshapiro.png"),
      require("./assets/lydiamillet.png"),
      require("./assets/maggieofarrell.png"),
      require("./assets/margaretmacmillan.png"),
      require("./assets/robertkolker.png"),
      require("./assets/headerbgdark.jpeg"),
      require("./assets/headerbglight.jpeg"),
      require("./assets/dongsan.jpeg"),
      {
        uri: "https://lexfridman.com/wordpress/wp-content/uploads/2019/03/lex_zoomed_out_cropped.jpg",
        cache: "force-cache",
      },
      {
        uri: "https://static.onecms.io/wp-content/uploads/sites/20/2020/09/20/new-dad-joe-jonas.jpg",
        cache: "force-cache",
      },
      {
        uri: "https://api.time.com/wp-content/uploads/2020/01/Michelle-Obama.jpg",
        cache: "force-cache",
      },
      {
        uri: "https://thesmokingcuban.com/wp-content/uploads/getty-images/2017/07/1185327461.jpeg",
        cache: "force-cache",
      },
      {
        uri: "https://pbs.twimg.com/media/DsIRXVIX4AAlQlj.jpg",
        cache: "force-cache",
      }
    ]);

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
      <AppContextProvider>
        <ThemeContextProvider>
          <UsersContextProvider>
            <PostsContextProvider>
              <NavigationContainer>
                <TabBar />
              </NavigationContainer>
            </PostsContextProvider>
          </UsersContextProvider>
        </ThemeContextProvider>
      </AppContextProvider>
    );
  }
}
