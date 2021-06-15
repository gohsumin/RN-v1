import React from "react";
import RootStackNavigator from "./navigations/RootStackNavigator";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import UsersContextProvider from "./data/UsersContextProvider";
import PostsContextProvider from "./data/PostsContextProvider";
import AppContextProvider from "./data/AppContextProvider";
import ThemeContextProvider from "./data/ThemeContextProvider";
import SwipeCardsContextProvider from "./data/SwipeCardsContextProvider";
import SwipeCardsContext from "./data/SwipeCardsContext";
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
    remaining: [
      {
        "user": "lex",
        "datePurchased": "1623733185",
        "title": "Artificial Plant for Decoration",
        "imageURL": "https://api-prod.freedom.com.au/medias/39137-Popular-Category-Deep-etches-Artificial-Plants.png?context=bWFzdGVyfHJvb3R8ODAxMjI4fGltYWdlL3BuZ3xoNjIvaDhhLzg4MDIzMjg4MzgxNzQvMzkxMzcgUG9wdWxhciBDYXRlZ29yeSAtIERlZXAgZXRjaGVzX0FydGlmaWNpYWwgUGxhbnRzLnBuZ3xhYTFjM2U2NzAxNGZkNzE5NjI5MmY4MWM4ODhiNDk5NjM3MWRkYTA0ZjhiOGQwMDk2MTY3MzMzMTcyMDNmNGIz",
        "itemURL": "https://www.freedomfurniture.co.nz/cushions-throws-and-decor/c/artificial-foliage"
      },
      {
        "user": "travis",
        "datePurchased": "1623733200",
        "title": "Naviglio Couch",
        "imageURL": "https://www.esperiri.com/wp-content/uploads/prodotti/arf-naviglio-sof/arflex-naviglio.png",
        "itemURL": "https://www.esperiri.com/luxury-italian-furniture/sofas/arflex-naviglio/"
      }
    ]
  };

  setRemaining = cards => {
    this.remaining.setState({ cards });
  }

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
      },
      {
        uri: "https://api-prod.freedom.com.au/medias/39137-Popular-Category-Deep-etches-Artificial-Plants.png?context=bWFzdGVyfHJvb3R8ODAxMjI4fGltYWdlL3BuZ3xoNjIvaDhhLzg4MDIzMjg4MzgxNzQvMzkxMzcgUG9wdWxhciBDYXRlZ29yeSAtIERlZXAgZXRjaGVzX0FydGlmaWNpYWwgUGxhbnRzLnBuZ3xhYTFjM2U2NzAxNGZkNzE5NjI5MmY4MWM4ODhiNDk5NjM3MWRkYTA0ZjhiOGQwMDk2MTY3MzMzMTcyMDNmNGIz",
        cache: "force-cache"
      },
      {
        uri: "https://www.esperiri.com/wp-content/uploads/prodotti/arf-naviglio-sof/arflex-naviglio.png",
        cache: "force-cache"
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
      <SwipeCardsContext.Provider value={{ remaining: this.state.remaining, setRemaining: this.setRemaining }}>
        <AppContextProvider>
          <ThemeContextProvider>
            <UsersContextProvider>
              <PostsContextProvider>
                <NavigationContainer>
                  <RootStackNavigator />
                </NavigationContainer>
              </PostsContextProvider>
            </UsersContextProvider>
          </ThemeContextProvider>
        </AppContextProvider>
      </SwipeCardsContext.Provider>
    );
  }
}
