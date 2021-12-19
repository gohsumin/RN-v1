import React, { useEffect } from "react";
import { LogBox, Platform, Text } from "react-native";
import * as Linking from 'expo-linking';
import RootStackNavigator from "./navigations/RootStackNavigator";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import UsersContext from "./data/UsersContext";
import PostsContext from "./data/PostsContext";
import AppContext from "./data/AppContext";
import SwipeCardsContext from "./data/SwipeCardsContext";
import { Asset } from "expo-asset";
import styled from 'styled-components/native';
import { firebase } from './data/firebase';
import "firebase/firestore";
import WebStyleContextProvider from './data/WebStyleContextProvider';
import ThemeContextProvider from "./data/ThemeContextProvider";
import WebNavigationContext from './data/WebNavigationContext';
import WebMainSimpleNavigator from "./navigations/WebMainSimple";
const firestore = firebase.firestore();

// ###########################
// note:
// run...
// vercel  --local-config ~/RN-v1/vercel.json --prod
// from ~/RN-v1/web-build
// after running...
// expo build:web
// from ~/RN-v1
// ###########################

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      remaining: [],
      user: "", //"realhunion",
      uid: "", //"b5aU5qla3eVPqX1asJviRcpYuDq1",
      theme: "dark",
      currentRoute: { routeName: "Home", userName: "" },
    };

    this.platform = Platform.OS;
    this.linking = {
      prefixes: [Linking.createURL('https://www.soshworld.com')],
      config: {
        screens: {
          Landing: "landing",
          Privacy: "privacy",
          Terms: "terms",
          Home: "Home",
          Profile: ":app/:id",
          Tools: "tools",
        },
      },
    };

  }

  componentDidMount() {
   //console.log("component mounted");
    LogBox.ignoreAllLogs(true);
  }

  componentWillUnmount() {
   //console.log("COMPONENT WILL UNMOUNT");
  }

  popRemaining = (key) => {
    const newRemaining = this.state.remaining;
    delete newRemaining[key];
    this.setState(prev => ({ remaining: newRemaining }));
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

  setCurrentRoute = routeInfo => {
    this.setState({ currentRoute: routeInfo });
  }

  render() {
    return (
      /* Contexts can be composed later into a single component. */
      <WebNavigationContext.Provider
      value={{
        currentRoute: this.state.currentRoute,
        setCurrentRoute: this.setCurrentRoute
      }}>
        <WebStyleContextProvider>
          <SwipeCardsContext.Provider
          value={{
            remaining: this.state.remaining,
            popRemaining: this.popRemaining
          }}>
            <AppContext.Provider
            value={{
              platform: this.platform,
              user: this.state.user,
              uid: this.state.uid,
              theme: this.state.theme,
              setUser: this.setUser,
              setUID: this.setUID
            }}>
              <ThemeContextProvider>
                <UsersContext.Provider>
                  <PostsContext.Provider
                  value={{
                    updateTimelineAfterFollowing: this.updateTimelineAfterFollowing,
                    updateTimelineAfterUnfollowing: this.updateTimelineAfterUnfollowing,
                  }}>
                    <NavigationContainer linking={this.linking} fallback={<Text>Loading...</Text>}>
                      {this.platform === "web" ? <WebMainSimpleNavigator /> : <RootStackNavigator />}
                    </NavigationContainer>
                  </PostsContext.Provider>
                </UsersContext.Provider>
              </ThemeContextProvider>
            </AppContext.Provider>
          </SwipeCardsContext.Provider>
        </WebStyleContextProvider>
      </WebNavigationContext.Provider>
    );
  }
}
