import React from "react";
import { firebase } from '../data/firebase';
import "firebase/firestore";
const firestore = firebase.firestore();

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


export { getElapsedTime };
