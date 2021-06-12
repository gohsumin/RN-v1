import React, { Component } from "react";
import PostsContext from "./PostsContext";

/* I'm using this as a temporary dummy data, although perhaps we can use contexts for posts that are currently loaded. */
class PostsContextProvider extends Component {
  state = {
    posts: [
      {
        user: "travis",
        datePurchased: "1622931742",
        datePosted: "1622931742",
        likes: 2904,
        title: "Shakespeare in a Divided America",
        imageSource: {
          uri: "https://static01.nyt.com/images/2020/11/20/books/review/best-books-06/best-books-06-superJumbo.png?quality=90&auto=webp",
          cache: 'force-cache'
        },
      },
      {
        user: "michelle",
        datePurchased: "1622766654",
        datePosted: "1622766660",
        likes: 4500,
        title: "The Vanishing Half",
        imageSource: {
          uri: "https://static01.nyt.com/images/2020/05/27/books/best-books-bennett/26BOOKBENNETT1-superJumbo.jpg?quality=90&auto=webp",
          cache: 'force-cache'
        },
      },
      {
        user: "luka",
        datePurchased: "1622606180",
        datePosted: "1622606223",
        likes: 870,
        title: "Uncanny Valley",
        imageSource: {
          uri: "https://static01.nyt.com/images/2020/11/20/books/review/best-books-07/best-books-07-superJumbo.png?quality=90&auto=webp",
          cache: 'force-cache'
        },
      },
      {
        user: "joe",
        datePurchased: "1622589049",
        datePosted: "1622592163",
        likes: 2143,
        title: "Hamnet",
        imageSource: {
          uri: "https://static01.nyt.com/images/2020/11/20/books/review/best-books-05/best-books-05-superJumbo.png?quality=90&auto=webp",
          cache: 'force-cache'
        },
      },
      {
        user: "lex",
        datePurchased: "1622342002",
        datePosted: "1622390711",
        likes: 7489,
        title: "Homeland Elegies",
        imageSource: {
          uri: "https://static01.nyt.com/images/2020/11/20/books/review/best-books/best-books-superJumbo.png?quality=90&auto=webp",
          cache: 'force-cache'
        },
      },
      {
        user: "michelle",
        datePurchased: "1622230580",
        datePosted: "1622230702",
        likes: 834,
        title: "Hidden Valley Road",
        imageSource: {
          uri: "https://static01.nyt.com/images/2020/04/01/books/best-books-kolker/best-books-kolker-superJumbo-v2.png?quality=90&auto=webp",
          cache: 'force-cache'
        },
      },
      {
        user: "joe",
        datePurchased: "1621324680",
        datePosted: "1621324682",
        likes: 5673,
        title: "Deacon King Kong",
        imageSource: {
          uri: "https://static01.nyt.com/images/2020/11/20/books/review/best-books-03/best-books-03-superJumbo.png?quality=90&auto=webp",
          cache: 'force-cache'
        },
      },
      {
        user: "travis",
        datePurchased: "1620470052",
        datePosted: "1620516970",
        likes: 4953,
        title: "War",
        imageSource: {
          uri: "https://static01.nyt.com/images/2020/11/20/books/review/best-books-02/best-books-02-superJumbo.png?quality=90&auto=webp",
          cache: 'force-cache'
        },
      },
      {
        user: "luka",
        datePurchased: "1619936425",
        datePosted: "1620058856",
        likes: 35746,
        title: "A Promised Land",
        imageSource: {
          uri: "https://static01.nyt.com/images/2020/11/17/books/review/best-books-obama/best-books-obama-superJumbo.png?quality=90&auto=webp",
          cache: 'force-cache'
        },
      },
      {
        user: "michelle",
        datePurchased: "1618767121",
        datePosted: "1618767260",
        likes: 12467,
        title: "A Children's Bible",
        imageSource: {
          uri: "https://static01.nyt.com/images/2020/11/20/books/review/best-books-04/best-books-04-superJumbo.png?quality=90&auto=webp",
          cache: 'force-cache'
        },
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
