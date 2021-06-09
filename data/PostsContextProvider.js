import React, { Component } from "react";
import PostsContext from "./PostsContext";
import Moment from "moment";

/* I'm using this as a temporary dummy data, although perhaps we can use contexts for posts that are currently loaded. */
class PostsContextProvider extends Component {
  state = {
    posts: [
      {
        user: "lex",
        datePurchased: Moment("2021-04-18T17:32:01").format("d MMM"),
        datePosted: Moment("2018-04-18T17:34:20").format("d MMM"),
        likes: 12467,
        title: "A Children's Bible",
        imageURL:
          "https://static01.nyt.com/images/2020/11/20/books/review/best-books-04/best-books-04-superJumbo.png?quality=90&auto=webp",
      },
      {
        user: "lex",
        datePurchased: Moment("2021-05-02T06:20:25").format("d MMM"),
        datePosted: Moment("2016-05-03T04:20:56").format("d MMM"),
        likes: 12467,
        title: "A Promised Land",
        imageURL:
          "https://static01.nyt.com/images/2020/11/17/books/review/best-books-obama/best-books-obama-superJumbo.png?quality=90&auto=webp",
      },
      {
        user: "travis",
        datePurchased: Moment("2021-05-08T10:34:12").format("d MMM"),
        datePosted: Moment("2021-05-08T00:36:10").format("d MMM"),
        likes: 12467,
        title: "War",
        imageURL:
          "https://static01.nyt.com/images/2020/11/20/books/review/best-books-02/best-books-02-superJumbo.png?quality=90&auto=webp",
      },
      {
        user: "joe",
        datePurchased: Moment("2021-05-18T07:58:00").format("d MMM"),
        datePosted: Moment("2021-05-18T07:58:02").format("d MMM"),
        likes: 12467,
        title: "Deacon King Kong",
        imageURL:
          "https://static01.nyt.com/images/2020/11/20/books/review/best-books-03/best-books-03-superJumbo.png?quality=90&auto=webp",
      },
      {
        user: "adin",
        datePurchased: Moment("2021-05-28T19:38:21").format("d MMM"),
        datePosted: Moment("2021-05-28T19:38:21").format("d MMM"),
        likes: 12467,
        title: "Hidden Valley Road",
        imageURL:
          "https://static01.nyt.com/images/2020/04/01/books/best-books-kolker/best-books-kolker-superJumbo-v2.png?quality=90&auto=webp",
      },
      {
        user: "lex",
        datePurchased: Moment("2021-05-30T02:33:56").format("d MMM"),
        datePosted: Moment("2021-05-30T04:05:11").format("d MMM"),
        likes: 12467,
        title: "Homeland Elegies",
        imageURL:
          "https://static01.nyt.com/images/2020/11/20/books/review/best-books/best-books-superJumbo.png?quality=90&auto=webp",
      },
      {
        user: "lex",
        datePurchased: Moment("2021-06-01T23:10:49").format("d MMM"),
        datePosted: Moment("2021-06-02T00:02:43").format("d MMM"),
        likes: 12467,
        title: "Hamnet",
        imageURL:
          "https://static01.nyt.com/images/2020/11/20/books/review/best-books-05/best-books-05-superJumbo.png?quality=90&auto=webp",
      },
      {
        user: "luka",
        datePurchased: Moment("2021-06-02T03:56:20").format("d MMM"),
        datePosted: Moment("2021-06-02T15:08:41").format("d MMM"),
        likes: 12467,
        title: "Uncanny Valley",
        imageURL:
          "https://static01.nyt.com/images/2020/11/20/books/review/best-books-07/best-books-07-superJumbo.png?quality=90&auto=webp",
      },
      {
        user: "adin",
        datePurchased: Moment("2021-06-04T12:30:59").format("d MMM"),
        datePosted: Moment("2021-06-04T12:31:00").format("d MMM"),
        likes: 12467,
        title: "The Vanishing Half",
        imageURL:
          "https://static01.nyt.com/images/2020/05/27/books/best-books-bennett/26BOOKBENNETT1-superJumbo.jpg?quality=90&auto=webp",
      },
      {
        user: "adin",
        datePurchased: Moment("2021-06-05T22:22:22").format("d MMM"),
        datePosted: Moment("2021-06-05T22:31:47").format("d MMM"),
        likes: 12467,
        title: "Shakespeare in a Divided America",
        imageURL:
          "https://static01.nyt.com/images/2020/11/20/books/review/best-books-06/best-books-06-superJumbo.png?quality=90&auto=webp",
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
