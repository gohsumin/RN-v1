import React, { Component, useState } from "react";
import { FlatList, Text, View, StyleSheet, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import UsersContext from "../data/UsersContext";
import PostsContext from "../data/PostsContext";

const HomeScreen = () => {
  const user = "dongsan";

  const users = React.useContext(UsersContext).users;
  const feed = React.useContext(PostsContext).posts.filter((post) =>
    users[user].following.includes(post.user)
  );

  const data = [
    {
      user: "lex",
      title: "A Children's Bible",
      imageURL:
        "https://static01.nyt.com/images/2020/11/20/books/review/best-books-04/best-books-04-superJumbo.png?quality=90&auto=webp",
    },
    {
      user: "joe",
      title: "Deacon King Kong",
      imageURL:
        "https://static01.nyt.com/images/2020/11/20/books/review/best-books-03/best-books-03-superJumbo.png?quality=90&auto=webp",
    },
    {
      user: "lex",
      title: "Hamnet",
      imageURL:
        "https://static01.nyt.com/images/2020/11/20/books/review/best-books-05/best-books-05-superJumbo.png?quality=90&auto=webp",
    },
    {
      user: "lex",
      title: "Homeland Elegies",
      imageURL:
        "https://static01.nyt.com/images/2020/11/20/books/review/best-books/best-books-superJumbo.png?quality=90&auto=webp",
    },
    {
      user: "adin",
      title: "The Vanishing Half",
      imageURL:
        "https://static01.nyt.com/images/2020/05/27/books/best-books-bennett/26BOOKBENNETT1-superJumbo.jpg?quality=90&auto=webp",
    },
    {
      user: "adin",
      title: "Hidden Valley Road",
      imageURL:
        "https://static01.nyt.com/images/2020/04/01/books/best-books-kolker/best-books-kolker-superJumbo-v2.png?quality=90&auto=webp",
    },
    {
      user: "lex",
      title: "A Promised Land",
      imageURL:
        "https://static01.nyt.com/images/2020/11/17/books/review/best-books-obama/best-books-obama-superJumbo.png?quality=90&auto=webp",
    },
    {
      user: "adin",
      title: "Shakespeare in a Divided America",
      imageURL:
        "https://static01.nyt.com/images/2020/11/20/books/review/best-books-06/best-books-06-superJumbo.png?quality=90&auto=webp",
    },
    {
      user: "luka",
      title: "Uncanny Valley",
      imageURL:
        "https://static01.nyt.com/images/2020/11/20/books/review/best-books-07/best-books-07-superJumbo.png?quality=90&auto=webp",
    },
    {
      user: "travis",
      title: "War",
      imageURL:
        "https://static01.nyt.com/images/2020/11/20/books/review/best-books-02/best-books-02-superJumbo.png?quality=90&auto=webp",
    },
  ];

  const Item = ({ pfpSource, firstName, lastName, title, imageURL }) => (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        paddingTop: 15,
        paddingBottom: 25,
        paddingHorizontal: 10,
      }}
    >
      <Image
        source={pfpSource}
        style={{ width: 50, height: 50, marginRight: 10, borderRadius: 30 }}
      />
      <View>
        <Text
          style={{
            paddingTop: 7,
            fontWeight: "bold",
            fontSize: 16.0,
            color: "black",
          }}
        >
          {firstName} {lastName} bought:
        </Text>
        <Text style={{ paddingTop: 3, fontSize: 14.0, color: "gray" }}>
          19 hours ago
        </Text>
        <View
          style={{
            width: 290,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: imageURL }}
            style={{
              width: 200,
              height: 200,
              borderRadius: 20,
              borderWidth: 0.2,
              marginTop: 10,
              marginRight: 10,
              alignItems: "center",
              resizeMode: "contain",
            }}
          />
          <Text style={{ flex: 1, flexWrap: "wrap", flexShrink: 1 }}>
            {title}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
          <Image
            source={require("../assets/heart.png")}
            style={{
              width: 20,
              height: 20,
              resizeMode: "contain",
            }}
          />
          <Text style={{ paddingLeft: 5 }}>12,467</Text>
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <UsersContext.Consumer>
      {(context) => (
        <Item
          pfpSource={context.users[item.user].pfpSource}
          firstName={context.users[item.user].firstName}
          lastName={context.users[item.user].lastName}
          title={item.title}
          imageURL={item.imageURL}
        />
      )}
    </UsersContext.Consumer>
  );

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 0.3,
          width: "90%",
          backgroundColor: "#000",
          opacity: 0.5,
          alignSelf: "center",
        }}
      />
    );
  };

  const renderHeader = () => {
    return (
      <View>
        <Text
          style={{
            fontSize: 40,
            fontWeight: "bold",
            paddingTop: 30,
            paddingBottom: 20,
          }}
        >
          Home
        </Text>
        {renderSeparator()}
      </View>
    );
  };
  /* return for HomeScreen */
  return (
    <View style={styles.container}>
      <PostsContext.Consumer>
        {(context) => (
          <FlatList
            data={feed}
            renderItem={renderItem}
            ListHeaderComponent={renderHeader}
            ItemSeparatorComponent={renderSeparator}
          />
        )}
      </PostsContext.Consumer>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 15,
    backgroundColor: "#ffffff",
  },
});
