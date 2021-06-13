import React, { useState, useContext, useEffect } from "react";
import { FlatList, Text, View, Image, Dimensions } from "react-native";
import UsersContext from "../data/UsersContext";
import PostsContext from "../data/PostsContext";
import AppContext from "../data/AppContext";
import ThemeContext from "../data/ThemeContext";
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
  const theme = React.useContext(AppContext).theme;
  const colors = React.useContext(ThemeContext).colors[theme];

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
          ListHeaderComponent={
            <View style={{ height: 130 }}>
              <Image
                style={{ height: 600, top: -470, width: "100%" }}
                source={
                  theme === "dark"
                    ? require("../assets/headerbgdark.jpeg")
                    : require("../assets/headerbglight.jpeg")
                }
              />
            </View>
          }
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
        <BlurView
          style={{
            height: 130,
            width: "100%",
            position: "absolute",
          }}
          intensity={99}
          blurTint={theme === "dark" ? "dark" : "light"}
        />
        <Text
          style={{
            color: colors.antiBackground,
            fontSize: 42,
            fontWeight: "500",
            marginTop: 70,
            marginLeft: 30,
            backgroundColor: "transparent",
          }}
        >
          Home
        </Text>
      </View>
    </View>
  );
};

export default HomeScreen;
