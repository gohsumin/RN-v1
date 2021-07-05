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
      loadThreshhold: 8,
      snapshotListener: null,
      newPostExists: false,
      isManualTrigger: false,
    };
    this.loadSize = 8;
    this.getTimeline = this.getTimeline.bind(this);
    this.refreshTimeline = this.refreshTimeline.bind(this);
    this.loadMoreFeed = this.loadMoreFeed.bind(this);
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
    firestore.collection('Posts').where("type", "==", 0).get().then((snapshot) => {
      snapshot.forEach((doc) => {
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
      userID: 'tqsjujBkrYfzwAqgpd2mE1ic0gn2',
      userImageURL: 'https://static.wikia.nocookie.net/disney/images/7/7f/Rihanna.jpg/revision/latest/top-crop/width/360/height/450?cb=20200201173202',
      userName: 'Rihanna'
    }).then((docRef) => {
      firestore.collection('Feeds').doc('b5aU5qla3eVPqX1asJviRcpYuDq1').collection('Timeline').doc(docRef.id).set({
        dateApproved: dateApproved,
        dateBought: dateBought
      });
    })
  }

  /*  getPostsbyIds = async (refs, ret) => {
   const batch = refs.splice(0, 10);
   if (batch.length > 0) {
     return new Promise(function (resolve, reject) {
       firestore.collection('Posts').where(firebase.firestore.FieldPath.documentId(), 'in', batch).onSnapshot((postSnapshot) => {
         postSnapshot.forEach((doc) => {
           const documentId = doc.id;
           const newObj = doc.data();
           newObj.id = documentId;
           ret.push(newObj);
         })
         const res = await this.getPostsbyIds(refs, ret);
         ret.concat(res);
         resolve(ret);
         // reject??
       });
     })
   }
   else {
     return new Promise(function (resolve, reject) {
       resolve([]);
       // reject??
     })
   }
 } */

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

      this.setState({ snapshotListener: listener });

      // triggered by an update in firestore feed
      if (!this.state.isManualTrigger) {
        let newPostsCount = 0;
        snapshot.docChanges().forEach((change) => {
          console.log("change.type: "+change.type);
          if (change.type === "removed") {
            console.log("deleted change object keys: "+Object.keys(change.doc.data()));
          }
          if (change.type === "added") {
            console.log("added change object keys: "+Object.keys(change.doc.data()));
            newPostsCount++;
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

      snapshot.forEach((doc) => {
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

  /* updates the feed context by grabbing more from firestore */
  async loadMoreFeed(callback) {
    console.log("loadMoreFeed");
    if (this.state.loadingMore) {
      console.log("true that: loadingMore");
      callback();
    }
    this.setState({ loadingMore: true });
    this.setState({ isManualTrigger: true }, () => {
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
      setTimeout(() => {
        this.getTimeline('refreshTimeline', () => {
          this.setState({ isManualTrigger: false });
          callback();
        })
      }, 100);
    });
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.getSwipeCards();
    this.setState({ isManualTrigger: true }, () => {
      this.getTimeline('componentDidMount', () => {
        this.setState({ isManualTrigger: false });
      });
    });
    LogBox.ignoreAllLogs(true);
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
    if (!this.state.isReady) {
      return (
        <AppLoading
        />
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
          uid: this.state.uid, theme: this.state.theme,
          setUser: this.setUser,
          setUID: this.setUID
        }}>
          <ThemeContextProvider>
            <UsersContext.Provider value={{ users: this.state.users }}>
              <PostsContext.Provider value={{
                posts: this.state.posts,
                loadMoreFeed: this.loadMoreFeed,
                addRandomPost: this.addRandomPost,
                refreshTimeline: this.refreshTimeline,
                newPostExists: this.state.newPostExists,
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
