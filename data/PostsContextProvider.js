import React, { Component } from "react";
import PostsContext from "./PostsContext";

/* I'm using this as a temporary dummy data, although perhaps we can use contexts for posts that are currently loaded. */
class PostsContextProvider extends Component {
  state = {
    posts: [
      {
        user: "travis.scott",
        datePurchased: "1622931742",
        datePosted: "1622931742",
        likes: 2904,
        title: "Shakespeare in a Divided America",
        imageSource: require('../assets/jamesshapiro.png'),
      },
      {
        user: "luka",
        datePurchased: "1622766654",
        datePosted: "1622766660",
        likes: 4500,
        title: "A Children's Bible",
        imageSource: require('../assets/lydiamillet.png'),
      },
      {
        user: "michelle.obama",
        datePurchased: "1622606180",
        datePosted: "1622606223",
        likes: 870,
        title: "Uncanny Valley",
        imageSource: require('../assets/annawiener.png'),
      },
      {
        user: "joe",
        datePurchased: "1622589049",
        datePosted: "1622592163",
        likes: 2143,
        title: "Hamnet",
        imageSource: require('../assets/maggieofarrell.png'),
      },
      {
        user: "lex",
        datePurchased: "1622342002",
        datePosted: "1622390711",
        likes: 7489,
        title: "Homeland Elegies",
        imageSource: require('../assets/ayadakhtar.png'),
      },
      {
        user: "michelle.obama",
        datePurchased: "1622230580",
        datePosted: "1622230702",
        likes: 834,
        title: "Hidden Valley Road",
        imageSource: require('../assets/robertkolker.png'),
      },
      {
        user: "joe",
        datePurchased: "1621324680",
        datePosted: "1621324682",
        likes: 5673,
        title: "Deacon King Kong",
        imageSource: require('../assets/jamesmcbride.png'),
      },
      {
        user: "travis.scott",
        datePurchased: "1620470052",
        datePosted: "1620516970",
        likes: 4953,
        title: "War",
        imageSource: require('../assets/margaretmacmillan.png'),
      },
      {
        user: "luka",
        datePurchased: "1619936425",
        datePosted: "1620058856",
        likes: 35746,
        title: "A Promised Land",
        imageSource: require('../assets/barackobama.png'),
      },
      {
        user: "michelle.obama",
        datePurchased: "1618767121",
        datePosted: "1618767260",
        likes: 12467,
        title: "The Vanishing Half",
        imageSource: require('../assets/britbennett.png'),
      },
    ],
  };

  render() {
    return (
      <PostsContext.Provider
        value={{
          posts: this.state.posts,
        }}
      >
        {this.props.children}
      </PostsContext.Provider>
    );
  }
}

export default PostsContextProvider;
