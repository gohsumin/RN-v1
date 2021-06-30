import React from "react";
import { firebase } from '../data/firebase';
import "firebase/firestore";
const firestore = firebase.firestore();

function getTimeline(uid) {
  let ret = {};
  firestore.collection('Feeds').doc(uid).collection('Timeline').onSnapshot((snapshot) => {
    snapshot.forEach((doc) => {
      const documentName = doc.id;
      ret[documentName] = doc.data();
    });
  });
  console.log(ret);
  return ret;
}

/* returns an object containing user data from firestore, given the uid */
function getUserData(uid) {
  firestore.collection('User-Profile').doc(uid).get().then((doc) => {
    if (doc.exists) {
      const nameArr = doc.data().name.split(" ");
      const firstName = "firstName";
      const lastName = "lastName";
      if (nameArr.length === 2) {
        firstName = nameArr[0];
        lastName = nameArr[1];
      }
      const userData = {
        firstName: firstName,
        lastName: lastName,
        userName: "userName",
        pfpSource: doc.data().imageURL,
        bio: doc.data().description,
        dateJoined: doc.data().dateJoined,
        email: doc.data().email,
        followerCount: doc.data().followerCount,
        followingCount: doc.data().followingCount,
        followingIDArray: doc.data().followingIDArray
      }
      return userData;
    }
    else {
      console.log("No such document!");
    }
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode + ": " + errorMessage);
  });
}

/* returns elapsed time in string format, given a timestamp */
function getElapsedTime(then) {
  const now = new Date();
  let difference = Math.floor(now / 1000 - then);
  const min = 60;
  // less than a minute ago
  if (difference < min) {
    return "less than a minute ago";
  }
  // one minute ago (less than two minutes)
  if (difference < min * 2) {
    return "1 minute ago";
  }
  const hour = min * 60;
  // minutes ago (less than an hour)
  if (difference < hour) {
    return "" + Math.floor(difference / (60)) + " minutes ago";
  }
  // one hour ago (less than two hours)
  if (difference < hour * 2) {
    return "1 hour ago";
  }
  const day = hour * 24;
  // hours ago (less than a day)
  if (difference < day) {
    return "" + Math.floor(difference / (hour)) + " hours ago";
  }
  // one day ago (less than two days)
  if (difference < day * 2) {
    return "1 day ago";
  }
  const week = day * 7;
  // days ago (less than a week)
  if (difference < week) {
    return "" + Math.floor(difference / (day)) + " days ago";
  }
  const dateObj = new Date(then * 1000);
  const year = dateObj.getFullYear();
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[dateObj.getMonth()];
  if (year != now.getFullYear()) {
    return "" + month + " " + year;
  }
  const date = dateObj.getDate();
  return "" + month + " " + date;
}


export { getTimeline, getUserData, getElapsedTime };
