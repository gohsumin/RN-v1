import React, { useState, useContext, useEffect } from "react";
import { FlatList, Text, View, Image } from "react-native";
import UsersContext from "../data/UsersContext";
import PostsContext from "../data/PostsContext";
import AppContext from "../data/AppContext";
import FeedItem from "./components/FeedItem";
import { BlurView } from "expo-blur";

const HomeScreen = ({ navigation }) => {
  const user = useContext(AppContext).user;
  const users = useContext(UsersContext).users;
  const feed = useContext(PostsContext).posts.filter((post) =>
    users[user].following.concat(user).includes(post.user)
  );
  const [flatListWidth, setFlatListWidth] = useState(0);
  const [toggleRender, setToggleRender] = useState(false);

  /* useEffect(() => {
    feed.forEach((post) => {
      Image.prefetch(post.imageSource.uri);
    });
  }); */

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 0.3,
          width: "95%",
          backgroundColor: "#808080",
          opacity: 0.5,
          alignSelf: "flex-end",
        }}
      />
    );
  };

  const renderHeader = () => {
    return (
      <View style={{ backgroundColor: "transparent", position: "absolute" }}>
        <BlurView
          style={{
            height: "100%",
            position: "absolute",
          }}
          intensity={100}
        />
        <Text
          style={{
            color: "white",
            fontSize: 40,
            fontWeight: "600",
            paddingTop: 30,
            paddingBottom: 20,
            backgroundColor: "transparent",
            paddingTop: 60,
            paddingHorizontal: 15,
          }}
        >
          Home
        </Text>
      </View>
    );
  };

  function navigate(screen, user) {
    navigation.navigate(screen, { user: user });
  }

  /* return for HomeScreen */
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 15,
      }}
    >
      <View
        onLayout={(event) => {
          setFlatListWidth(event.nativeEvent.layout.width);
          setToggleRender(!toggleRender);
        }}
      >
        <FlatList
          data={feed}
          renderItem={({ item }) => (
            <FeedItem
              pfpSource={users[item.user].pfpSource}
              userName={item.user}
              firstName={users[item.user].firstName}
              lastName={users[item.user].lastName}
              title={item.title}
              timePosted={item.datePosted}
              imageSource={item.imageSource}
              likes={item.likes}
              navigate={(user) => {
                navigate("Profile", user);
              }}
              key={item.key}
              width={flatListWidth}
            />
          )}
          ListHeaderComponent={<View style={{ height: 68, width: '100%', backgroundColor: 'black' }} />}
          ItemSeparatorComponent={renderSeparator}
          keyExtractor={(item) => item.datePosted}
        />
      </View>
      <View style={{ backgroundColor: "transparent", position: "absolute", left:0, right:0 }}>
        <BlurView
          style={{
            height: "100%",
            width: '100%',
            position: "absolute",
          }}
          intensity={100}
          blurTint='dark'
        />
        <Text
          style={{
            color: "white",
            fontSize: 40,
            fontWeight: "600",
            paddingTop: 30,
            paddingBottom: 20,
            backgroundColor: "transparent",
            paddingTop: 60,
            paddingHorizontal: 15,
          }}
        >
          Home
        </Text>
      </View>
    </View>
  );
};

export default HomeScreen;
