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
        pfpSource: require("../assets/user.png"),
      },
      lex: {
        firstName: "Lex",
        lastName: "Fridman",
        following: ["joe", "adin", "travis", "luka"],
        followers: ["joe", "adin", "luka"],
        pfpSource: {
          uri: "https://lexfridman.com/wordpress/wp-content/uploads/2019/03/lex_zoomed_out_cropped.jpg",
        },
      },
      joe: {
        firstName: "Joe",
        lastName: "Jonas",
        following: ["lex", "adin"],
        followers: ["lex", "luka"],
        pfpSource: {
          uri: "https://static.onecms.io/wp-content/uploads/sites/20/2020/09/20/new-dad-joe-jonas.jpg",
        },
      },
      adin: {
        firstName: "Adin",
        lastName: "Ross",
        following: ["lex", "travis"],
        followers: ["lex", "travis", "joe"],
        pfpSource: {
          uri: "https://informone.com/wp-content/uploads/2021/04/adinross-4f375e.jpg",
        },
      },
      luka: {
        firstName: "Luka",
        lastName: "Doncic",
        following: ["lex", "joe"],
        followers: ["lex", "travis"],
        pfpSource: {
          uri: "https://thesmokingcuban.com/wp-content/uploads/getty-images/2017/07/1185327461.jpeg",
        },
      },
      travis: {
        firstName: "Travis",
        lastName: "Scott",
        following: ["luka", "adin"],
        followers: ["lex", "adin"],
        pfpSource: { uri: "https://pbs.twimg.com/media/DsIRXVIX4AAlQlj.jpg" },
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
