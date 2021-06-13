import React, { useState, useEffect } from "react";
import { LogBox } from "react-native";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import UsersContext from "../data/UsersContext";
import PostsContext from "../data/PostsContext";
import AppContext from "../data/AppContext";
import ThemeContext from "../data/ThemeContext";
import { Octicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import FeedItem from "./components/FeedItem";

const ActivityScreen = ({ route, navigation }) => {
  const users = React.useContext(UsersContext).users;
  const { user } = route.params;
  const isUser = React.useContext(AppContext).user === user;
  const userData = users[user];
  const userFeed = React.useContext(PostsContext).posts.filter(
    (post) => post.user === user
  );
  const feed = React.useContext(PostsContext).posts.filter((post) =>
    users[user].following.includes(post.user)
  );
  const theme = React.useContext(AppContext).theme;
  const colors = React.useContext(ThemeContext).colors[theme];
  const [flatListWidth, setFlatListWidth] = useState(0);
  const [toggleRender, setToggleRender] = useState(false);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const renderBalanceItem = (title, amount, index) => (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        paddingVertical: 6,
        paddingLeft: 12,
        alignItems: "center",
        backgroundColor: colors.balanceItemBackground,
      }}
    >
      <View style={{ flex: 9 }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "500",
            letterSpacing: 0.2,
            color:
              index === 0 ? colors.availableBalance : colors.pendingBalance,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            padding: 2,
            letterSpacing: 0.4,
            color: colors.antiBackground,
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
        color={colors.blue}
      />
    </View>
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
          backgroundColor: colors.background,
          paddingHorizontal: 15,
          paddingTop: 40,
        }}
      >
        {/* this is just for getting the width inside the padding */}
        <View
          style={{
            width: "100%",
            height: 0,
            position: "absolute",
          }}
          onLayout={(event) => {
            setFlatListWidth(event.nativeEvent.layout.width);
            setToggleRender(!toggleRender);
          }}
        />
        {/* profile image */}
        <Image
          source={userData.pfpSource}
          style={{ width: 170, height: 170, borderRadius: 15 }}
        />
        {/* user name and verified icon */}
        <Text
          style={{
            fontWeight: "700",
            letterSpacing: 0.1,
            fontSize: 26,
            color: colors.antiBackground,
            marginTop: 20,
          }}
        >
          {userData.firstName} {userData.lastName}{" "}
          <Octicons name="verified" size={18} color={colors.blue} />
        </Text>
        {/* bio */}
        <Text
          style={{
            color: colors.antiBackground,
            fontSize: 15,
            fontWeight: "400",
            marginTop: 12,
            marginBottom: 12,
            marginHorizontal: 35,
            textAlign: "center",
            lineHeight: 18,
          }}
        >
          {userData.bio}
        </Text>

        {isUser && (
          /* edit profile button */
          <TouchableOpacity
            style={{
              width: 170,
              alignItems: "center",
              backgroundColor: colors.editProfileButton,
              padding: 10,
              marginTop: 25,
              borderRadius: 4,
            }}
          >
            <Text style={{ color: colors.antiBackground }}>Edit Profile</Text>
          </TouchableOpacity>
        )}
        {isUser && (
          /* balance information */
          <View style={{ marginTop: 30 }}>
            <Text
              style={{
                color: colors.smallText,
                alignSelf: "flex-start",
                paddingLeft: 5,
                paddingBottom: 5,
              }}
            >
              MY BALANCE
            </Text>
            <View
              style={{ width: "100%", borderRadius: 9, overflow: "hidden" }}
            >
              {renderBalanceItem("Available:", userData.available, 0)}
              {renderSeparator()}
              {renderBalanceItem("Pending:", userData.pending, 1)}
            </View>
          </View>
        )}
        <View style={{ marginVertical: 30 }}>
          {isUser && (
            <Text
              style={{
                color: colors.smallText,
                alignSelf: "flex-start",
                paddingLeft: 5,
                paddingBottom: 5,
              }}
            >
              MY POSTS
            </Text>
          )}
          {/* user's posts */}
          <View
            style={{
              width: flatListWidth,
              borderRadius: 9,
              backgroundColor: colors.profileFeedBackground,
              overflow: "hidden",
              alignItems: "center",
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
                  imageSource={item.imageSource}
                  likes={item.likes}
                  navigation={navigation}
                  key={item.key}
                  width={flatListWidth * 0.96}
                />
              )}
              extraData={toggleRender}
              keyExtractor={(item) => item.datePosted}
              ItemSeparatorComponent={renderSeparator}
              ListFooterComponent={<View style={{ height: 60 }} />}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default ActivityScreen;
