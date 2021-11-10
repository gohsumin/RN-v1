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
import styled from 'styled-components/native';
import { firebase } from './data/firebase';
import "firebase/firestore";
import WebStyleContextProvider from './data/WebStyleContextProvider';
import WebNavigationContext from './data/WebNavigationContext';
import WebMainSimpleNavigator from "./navigations/WebMainSimple";
const firestore = firebase.firestore();

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      remaining: [],
      user: "realhunion",
      uid: "b5aU5qla3eVPqX1asJviRcpYuDq1",
      theme: "dark",
      currentRoute: { routeName: "Home", userName: "" },
    };
    this.platform = Platform.OS;
    this.updateTimelineAfterFollowing = this.updateTimelineAfterFollowing.bind(this);
    this.updateTimelineAfterUnfollowing = this.updateTimelineAfterUnfollowing.bind(this);
    this.linking = {
      config: {
        Profile: "/:app/:id",
        NotFound: "404",
      },
    };
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
      console.log(docs);
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
      <WebNavigationContext.Provider value={{
        currentRoute: this.state.currentRoute,
        setCurrentRoute: this.setCurrentRoute
      }}>
        <WebStyleContextProvider>
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
                    <NavigationContainer linking={this.linking}>
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
