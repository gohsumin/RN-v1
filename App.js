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
      isReady: true,
      remaining: [],
      posts: [], // call getPosts whenever the user opens the app!
      users: users,
      images: images, // make this a context so cached images can keep updating
      user: "gohsumin",
      uid: "yZdwQLMTvgT1nvCwJFyzLUnfvX83",
      theme: "dark",
      loadingMore: false,
      cursor: 0,
      loadThreshhold: 8,
      snapshotListener: null,
      newPostExists: false, // true -> shows "New Posts" button
      isManualTrigger: false, // true from when getTimeline/refreshTimeline/loadMoreFeed are called until the call is over
    };
    this.loadSize = 8;
    this.getTimeline = this.getTimeline.bind(this);
    this.refreshTimeline = this.refreshTimeline.bind(this);
    this.loadMoreFeed = this.loadMoreFeed.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.getUserFeed = this.getUserFeed.bind(this);
    this.refreshUserPage = this.refreshUserPage.bind(this);
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

  addRandomPost() {
    const dateApproved = { seconds: new Date().getTime() / 1000, nanoseconds: 0 };
    const dateBought = { seconds: new Date().getTime() / 1000 - Math.random() * 6048000, nanoseconds: 0 };
    // add post
    firestore.collection('Posts').add({
      dateApproved: dateApproved,
      dateBought: dateBought,
      itemImageURL: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1612995602-df-34_gal-large1_35ce02b1-99d5-48ee-901f-f21d8f9d5f2f_345x@2x.jpg?crop=1xw:1xh;center,top&resize=768:*',
      itemName: 'Time Cube',
      itemURL: 'https://datexx.com/collections/timers/products/df-34',
      numBought: 0,
      storeName: 'Datexx',
      type: 1,
      userID: 'yZdwQLMTvgT1nvCwJFyzLUnfvX83',
      userImageURL: 'https://static.wikia.nocookie.net/disney/images/7/7f/Rihanna.jpg/revision/latest/top-crop/width/360/height/450?cb=20200201173202',
      userName: 'Rihanna'
    }).then((post) => {
      // for now, just add post to the user's own timeline
      firestore.collection('Feeds').doc('yZdwQLMTvgT1nvCwJFyzLUnfvX83').collection('Timeline').doc(post.id).set({
        dateApproved: dateApproved,
        dateBought: dateBought
      });
      firestore.collection('Feeds').doc('yZdwQLMTvgT1nvCwJFyzLUnfvX83').collection('User').doc(post.id).set({
        dateApproved: dateApproved,
        dateBought: dateBought
      });
    })
  }

  async getPostsbyIds(batch) {
    return new Promise(function (resolve, reject) {
      firestore.collection('Posts').where(firebase.firestore.FieldPath.documentId(), 'in', batch).onSnapshot((postSnapshot) => {
        let ret = [];
        postSnapshot.forEach((doc) => {
          const documentId = doc.id;
          const newObj = doc.data();
          newObj.id = documentId;
          ret.push(newObj);
        })
        resolve(ret);
        // reject??
      });
    })
  }

  /* grabs the posts for the timeline of the existing user */
  getTimeline(trigger, callback) {
    console.log("getTimeline with loadThreshhold " + this.state.loadThreshhold);

    // unsubscribes to the previous listener
    if (this.state.snapshotListener !== null) {
      this.state.snapshotListener();
    }

    // the timeline collection
    let db = firestore.collection('Feeds').doc(this.state.uid).collection('Timeline').orderBy("dateApproved", "desc");

    let refs = [];
    // getting the post IDs for the user's timeline
    const listener = db.limit(this.state.loadThreshhold).onSnapshot({
      includeMetadataChanges: true
    }, (snapshot) => {

      console.log("right inside onSnapshot");

      this.setState({ snapshotListener: listener });

      // triggered by an update in firestore feed
      if (!this.state.isManualTrigger && snapshot.docChanges().length > 0) {
        let newPostsCount = 0;
        if (snapshot.docChanges()[0].type === "removed") {
          return false;
        }
        snapshot.docChanges().forEach((change) => {
          console.log("change.type: " + change.type);
          if (change.type === "removed") {
            console.log("deleted item with object keys: " + Object.keys(change.doc.data()));
          }
          if (change.type === "added") {
            console.log("added item with object keys: " + Object.keys(change.doc.data()));
            if (change.doc.data().dateApproved.seconds > this.state.posts[0].dateApproved.seconds) {
              newPostsCount++;
            }
          }
        });
        if (newPostsCount > 0) {
          this.setState({ newPostExists: true });
          if (newPostsCount > this.state.loadThreshhold) {
            this.setState({ loadThreshhold: newPostsCount });
          }
        }
        return false;
      }

      console.log("right before getting each document id");
      snapshot.forEach((doc) => {
        console.log("document id for a post: " + doc.id);
        refs.push(doc.id);
      });

      if (refs.length === 0) {
        return false;
      }

      const newCursor = snapshot.docs[snapshot.docs.length - 1];
      this.setState({ cursor: newCursor });

      // the 'in' query for the 'where' clause takes max 10 items
      let batch = refs.splice(0, 10);

      // array of promises, each of which would return an array of max 10 feed items (because the where clause with the 'in' query only works with up to 10 items!!)
      let batchPromises = [];
      while (batch.length > 0) {
        batchPromises.push(this.getPostsbyIds(batch));
        batch = refs.splice(0, 10);
      }

      Promise.all(batchPromises).then(res => {
        const ret = res.reduce((a, b) => a.concat(b));
        ret.sort((a, b) => (a.dateApproved.seconds < b.dateApproved.seconds) ? 1 : - 1);
        this.setState({ posts: ret });
        this.setState({ loadThreshhold: this.state.loadThreshhold + this.loadSize });
        this.setState({ isReady: true });
        console.log("right before callback");
        callback();
      })
    });
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

  /* updates the feed context by grabbing more from firestore */
  async loadMoreFeed(callback) {
    console.log("loadMoreFeed");
    if (this.state.loadingMore) {
      console.log("true that: loadingMore");
      callback();
    }
    this.setState({ loadingMore: true });
    this.setState({ isManualTrigger: true }, () => {
      console.log("about to call getTimeline from loadMoreFeed");
      this.getTimeline('loadMoreFeed', () => {
        this.setState({ loadingMore: false });
        this.setState({ isManualTrigger: false });
        console.log("ALL DONE!!!!!!");
        callback();
      });
    });
  }

  refreshTimeline(callback) {
    console.log("refreshing");
    this.setState({ loadThreshhold: this.loadSize, isManualTrigger: true, newPostExists: false }, () => {
      console.log("about to call getTimeline from refreshTimeline");
      setTimeout(() => {
        this.getTimeline('refreshTimeline', () => {
          this.setState({ isManualTrigger: false });
          callback();
        })
      }, 100);
    });
  }

  getUserData(uid, callback) {
    console.log("getUserData for user " + uid);

    // the user data collection
    const db = firestore.collection('User-Profile').doc(uid);

    db.get().then((doc) => {
      // TO-DO: also get the folollowing list from 'Following' collection
      const following = db.collection('Following');
      const followers = db.collection('Followers');
      following.get().then((following) => {
        followers.get().then((followers) => {
          let ret = doc.data();
          ret.following = [];
          ret.followers = [];
          following.forEach((followingDoc) => {
            ret.following.push(followingDoc.id);
          })
          followers.forEach((followersDoc) => {
            ret.followers.push(followersDoc.id);
          })
          callback(doc.data());
        })
      })
    }).catch((error) => { console.log(error) });
  }

  getUserFeed(uid, callback) {
    console.log("getUserFeed for user " + uid);

    let db = firestore.collection('Feeds').doc(uid).collection('User');

    db.get().then((snapshot) => {

      let refs = [];

      snapshot.forEach((doc) => {
        refs.push(doc.id);
      })

      let batch = refs.splice(0, 10);
      let batchPromises = [];

      while (batch.length > 0) {
        batchPromises.push(this.getPostsbyIds(batch));
        batch = refs.splice(0, 10);
      }

      Promise.all(batchPromises).then(res => {
        const ret = res.reduce((a, b) => a.concat(b));
        ret.sort((a, b) => (a.dateApproved.seconds < b.dateApproved.seconds) ? 1 : -1);
        callback(ret);
      })
    })
  }

  refreshUserPage(uid, callback) {
    let ret = {};
    this.getUserData(uid, (userData) => {
      ret.userData = userData;
      this.getUserFeed(uid, (userFeed) => {
        ret.userFeed = userFeed;
        callback(ret);
      });
    });
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.getSwipeCards();
    if (this.state.uid !== "") {
      console.log("componentDidMount called getTimeline");
      this.setState({ isManualTrigger: true, isReady: false }, () => {
        this.getTimeline('componentDidMount', () => {
          this.setState({ isManualTrigger: false, isReady: true });
        });
      });
    }
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
      <SwipeCardsContext.Provider value={{
        remaining: this.state.remaining,
        popRemaining: this.popRemaining
      }}>
        <AppContext.Provider value={{
          user: this.state.user,
          uid: this.state.uid, theme: this.state.theme,
          setUser: this.setUser,
          setUID: this.setUID
        }}>
          <ThemeContextProvider>
            <UsersContext.Provider value={{
              users: this.state.users,
              getUserData: this.getUserData,
              getUserFeed: this.getUserFeed,
              refreshUserPage: this.refreshUserPage,
            }}>
              <PostsContext.Provider value={{
                posts: this.state.posts,
                getTimeline: () => {
                  console.log("postsContext called getTimeline");
                  this.setState({ isManualTrigger: true }, () => {
                    this.getTimeline('function calling PostsContext', () => {
                      this.setState({ isManualTrigger: false });
                    });
                  });
                },
                updateTimelineAfterFollowing: this.updateTimelineAfterFollowing,
                updateTimelineAfterUnfollowing: this.updateTimelineAfterUnfollowing,
                loadMoreFeed: this.loadMoreFeed,
                addRandomPost: this.addRandomPost,
                refreshTimeline: this.refreshTimeline,
                newPostExists: this.state.newPostExists,
              }}>
                <NavigationContainer>
                  <RootStackNavigator />
                  {!this.state.isReady && <AppLoading />}
                </NavigationContainer>
              </PostsContext.Provider>
            </UsersContext.Provider>
          </ThemeContextProvider>
        </AppContext.Provider>
      </SwipeCardsContext.Provider>
    );
  }
}
