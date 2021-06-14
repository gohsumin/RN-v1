import UsersContext from "./UsersContext";
import React, { Component } from "react";

/* Temporary; I imagine it will be more efficient to just grab stuff from backend */
class UsersContextProvider extends Component {
  state = {
    users: {
      dongsan: {
        firstName: "Dongsan",
        lastName: "Goh",
        following: ["lex", "joe", "adin", "travis", "luka"],
        followers: ["lex", "joe", "adin", "travis", "luka"],
        pfpSource: require("../assets/dongsan.jpeg"),
        bio: "n u t r i t i o n",
        available: "$33,351.12",
        pending: "$1,000,000.00",
      },
      lex: {
        firstName: "Lex",
        lastName: "Fridman",
        following: ["joe", "adin", "travis", "luka"],
        followers: ["joe", "adin", "luka"],
        pfpSource: {
          uri: "https://lexfridman.com/wordpress/wp-content/uploads/2019/03/lex_zoomed_out_cropped.jpg",
          cache: "force-cache",
        },
        bio: '"This is the real secret of life -- to be completely engaged with what you are doing in the here and now. And instead of calling it work, realize it is play." - Alan Watts',
        available: "$33,351.12",
        pending: "$1,000,000.00",
      },
      joe: {
        firstName: "Joe",
        lastName: "Jonas",
        following: ["lex", "adin", "michelle", "luka", "travis"],
        followers: ["lex", "luka"],
        pfpSource: {
          uri: "https://static.onecms.io/wp-content/uploads/sites/20/2020/09/20/new-dad-joe-jonas.jpg",
          cache: "force-cache",
        },
        bio: "I love making Italian food. And coconut chicken",
        available: "$33,351.12",
        pending: "$1,000,000.00",
      },
      michelle: {
        firstName: "Michelle",
        lastName: "Obama",
        following: ["lex", "travis"],
        followers: ["lex", "travis", "joe"],
        pfpSource: {
          uri: "https://api.time.com/wp-content/uploads/2020/01/Michelle-Obama.jpg",
          cache: "force-cache",
        },
        bio: "Always stay true to yourself",
        available: "$33,351.12",
        pending: "$1,000,000.00",
      },
      luka: {
        firstName: "Luka",
        lastName: "Doncic",
        following: ["lex", "joe"],
        followers: ["lex", "travis", "joe"],
        pfpSource: {
          uri: "https://thesmokingcuban.com/wp-content/uploads/getty-images/2017/07/1185327461.jpeg",
          cache: "force-cache",
        },
        bio: "To succeed you have to believe in something with such passion that it becomes a reality.",
        available: "$33,351.12",
        pending: "$1,000,000.00",
      },
      travis: {
        firstName: "Travis",
        lastName: "Scott",
        following: ["luka", "adin"],
        followers: ["lex", "adin", "joe"],
        pfpSource: {
          uri: "https://pbs.twimg.com/media/DsIRXVIX4AAlQlj.jpg",
          cache: "force-cache",
        },
        bio: "If she bad, she get a pass into the tour",
        available: "$33,351.12",
        pending: "$1,000,000.00",
      },
    },
  };

  render() {
    return (
      <UsersContext.Provider
        value={{
          users: this.state.users,
        }}
      >
        {this.props.children}
      </UsersContext.Provider>
    );
  }
}

export default UsersContextProvider;
