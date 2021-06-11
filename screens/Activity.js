import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";
import UsersContext from "../data/UsersContext";
import PostsContext from "../data/PostsContext";
import { Octicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import FeedItem from "./components/FeedItem";

const ActivityScreen = ({ navigation }) => {
  const users = React.useContext(UsersContext).users;
  //const user = navigation.state.params.user;
  const user = "michelle";
  const userData = users[user];
  const userFeed = React.useContext(PostsContext).posts.filter(
    (post) => post.user === user
  );
  const feed = React.useContext(PostsContext).posts.filter((post) =>
    users[user].following.includes(post.user)
  );
  const [flatListWidth, setFlatListWidth] = useState(0);
  const [toggleRender, setToggleRender] = useState(false);

  const renderBalanceItem = (title, amount, index) => (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        paddingVertical: 6,
        paddingLeft: 12,
        alignItems: "center",
        backgroundColor: "#1d1b1b",
      }}
    >
      <View style={{ flex: 9 }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "500",
            color: index === 0 ? "#3CB371" : "#ff7400",
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            padding: 2,
            color: "#ffffff",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {amount}
        </Text>
      </View>
      <Entypo
        style={{ flex: 1 }}
        name="chevron-thin-right"
        size={18}
        color="#539dfc"
      />
    </View>
  );

  const renderItem = ({ item } /* , width */) => (
    <FeedItem
      pfpSource={userData.pfpSource}
      userName={user}
      firstName={userData.firstName}
      lastName={userData.lastName}
      title={item.title}
      timePosted={item.datePosted}
      imageURL={item.imageURL}
      likes={item.likes}
      navigation={navigation}
      key={item.key}
      width={flatListWidth}
    />
  );

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

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: "#000000",
          paddingHorizontal: 15,
          paddingTop: 60,
        }}
      >
        <Image
          source={userData.pfpSource}
          style={{ width: 150, height: 150, borderRadius: 15 }}
        />
        <Text
          style={{
            fontWeight: "700",
            letterSpacing: 0.4,
            fontSize: 23,
            color: "#ffffff",
            marginTop: 12,
          }}
        >
          {userData.firstName} {userData.lastName}{" "}
          <Octicons name="verified" size={18} color="#539dfc" />
        </Text>
        <Text
          style={{
            color: "#ffffff",
            fontSize: 15,
            fontWeight: "500",
            letterSpacing: 0.2,
            marginTop: 16,
            marginBottom: 20,
            marginHorizontal: 35,
            textAlign: "center",
            lineHeight: 18,
          }}
        >
          {userData.bio}
        </Text>
        <TouchableOpacity
          style={{
            width: 170,
            alignItems: "center",
            backgroundColor: "#2d2b2b",
            padding: 12,
            borderRadius: 4,
          }}
        >
          <Text style={{ color: "#ffffff" }}>Edit Profile</Text>
        </TouchableOpacity>

        <View
          style={{ marginTop: 30 }}
          onLayout={(event) => {
            setFlatListWidth(event.nativeEvent.layout.width);
            setToggleRender(!toggleRender);
          }}
        >
          <Text
            style={{ color: "#6d6b6b", alignSelf: "flex-start", padding: 5 }}
          >
            MY BALANCE
          </Text>

          <View style={{ width: "100%", borderRadius: 9, overflow: "hidden" }}>
            {renderBalanceItem("Available:", userData.available, 0)}
            {renderSeparator()}
            {renderBalanceItem("Pending:", userData.pending, 1)}
          </View>
        </View>

        <View style={{ marginVertical: 30 }}>
          <Text
            style={{ color: "#6d6b6b", alignSelf: "flex-start", padding: 5 }}
          >
            MY POSTS
          </Text>

          <View
            style={{
              width: flatListWidth,
              borderRadius: 9,
              backgroundColor: "#151515",
              overflow: "hidden",
              alignItems: 'center'
            }}
          >
            {/* Here, it's assumed that the feed is sorted by time, most recent to latest */}
            <FlatList
              data={userFeed}
              renderItem={({ item }) => (
                <FeedItem
                  pfpSource={userData.pfpSource}
                  userName={user}
                  firstName={userData.firstName}
                  lastName={userData.lastName}
                  title={item.title}
                  timePosted={item.datePosted}
                  imageURL={item.imageURL}
                  likes={item.likes}
                  navigation={navigation}
                  key={item.key}
                  width={flatListWidth*.9}
                />
              )}
              extraData={toggleRender}
              keyExtractor={(item) => item.datePosted}
              ItemSeparatorComponent={renderSeparator}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default ActivityScreen;


