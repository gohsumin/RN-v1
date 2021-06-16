import React, { useState, useContext, useEffect } from "react";
import { FlatList, Text, View, Image, Dimensions } from "react-native";
import UsersContext from "../data/UsersContext";
import PostsContext from "../data/PostsContext";
import AppContext from "../data/AppContext";
import ThemeContext from "../data/ThemeContext";
import FeedItem from "./components/FeedItem";
import { BlurView } from "expo-blur";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useHeaderHeight } from '@react-navigation/stack';

const HomeScreen = ({ navigation }) => {
  const user = useContext(AppContext).user;
  const users = useContext(UsersContext).users;
  const feed = user === "" ? useContext(PostsContext).posts
    : useContext(PostsContext).posts.filter((post) =>
      users[user].following.concat(user).includes(post.user)
    );
  const [flatListWidth, setFlatListWidth] = useState(0);
  const [toggleRender, setToggleRender] = useState(false);
  const theme = React.useContext(AppContext).theme;
  const colors = React.useContext(ThemeContext).colors[theme];
  const tabBarheight = useBottomTabBarHeight();
  const headerHeight = useHeaderHeight();

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 0.4,
          width: "100%",
          backgroundColor: "#808080",
          opacity: 0.5,
          alignSelf: "flex-end",
        }}
      />
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
      }}
      onLayout={(event) => {
        setFlatListWidth(event.nativeEvent.layout.width);
        setToggleRender(!toggleRender);
      }}
    >
      <View
        style={{ backgroundColor: colors.background, alignItems: "center" }}
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
              width={Dimensions.get("window").width}
            />
          )}
          /* ListHeaderComponent={
            <View style={{ height: headerHeight }}>
              <Image
                style={{ height: 600, top: (headerHeight - 600), width: "100%" }}
                source={
                  theme === "dark"
                    ? require("../assets/headerbgdark.jpeg")
                    : require("../assets/headerbglight.jpeg")
                }
              />
            </View>
          } */
          ListFooterComponent={
            <View style={{ height: 90 }}>
              {/* <Image
                style={{ height: 200, bottom: -110, width: "100%" }}
                source={require("../assets/headerbg.jpeg")}
              /> */}
            </View>
          }
          ItemSeparatorComponent={renderSeparator}
          keyExtractor={(item) => item.datePosted}
        />
      </View>
      <View
        style={{
          backgroundColor: "transparent",
          position: "absolute",
          left: 0,
          right: 0,
        }}
      >
        {/* <BlurView
          style={{
            height: headerHeight,
            width: "100%",
            position: "absolute",
          }}
          intensity={100}
          blurTint={theme === "dark" ? "dark" : "light"}
        /> */}
        {/* <View
          style={{
            height: headerHeight,
            width: "100%",
            position: "absolute",
            backgroundColor: colors.background,
            borderBottomColor: colors.antiBackground,
            borderBottomWidth: 0.4
          }}
        /> */}
        {/* 
        <Text
          style={{
            color: colors.antiBackground,
            fontSize: 44,
            fontWeight: "300",
            marginTop: (headerHeight - 57),
            marginLeft: 22,
            backgroundColor: "transparent",
            opacity: 1,
            shadowOffset: { width: 1, height: 1 },
            shadowColor: colors.background,
            shadowOpacity: 0.1,
            letterSpacing: 0.1
          }}
        >
          Home
        </Text> */}
      </View>
      <BlurView
        style={{
          height: tabBarheight,
          width: "100%",
          position: "absolute",
          bottom: 0,
        }}
        intensity={100}
        blurTint={theme === "dark" ? "dark" : "light"}
      />
    </View>
  );
};

export default HomeScreen;
