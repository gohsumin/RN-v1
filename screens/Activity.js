import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import UsersContext from "../data/UsersContext";
import PostsContext from "../data/PostsContext";
import { Octicons } from "@expo/vector-icons";

const ActivityScreen = ({ navigation }) => {
  const users = React.useContext(UsersContext).users;
  const user = "joe";
  const userData = users[user];
  const feed = React.useContext(PostsContext).posts.filter((post) =>
    users[user].following.includes(post.user)
  );
  const balanceData = [
    { title: "Available:", amount: userData.available },
    { title: "Pending:", amount: userData.pending },
  ];

  const renderItem = ({ item }) => {
    <Text style={{ fontSize: 20, color: "#ffffff" }}>HELLO</Text>;
    /* <View style={{ flexDirection: "row", alignContent: "center" }}>
        <View>
          <Text
            style={{
              color: item.title === "Available" ? "#3CB371" : "#DC143C",
            }}
          >
            {item.title}
          </Text>
          <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: "bold" }}>
            {item.amount}
          </Text>
        </View>
        <Octicons name="right" size={18} color="#539dfc" />
      </View> */
  };

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

  return (
    <View style={styles.container}>
      <Image
        source={userData.pfpSource}
        style={{ width: 150, height: 150, borderRadius: 15 }}
      />
      <Text
        style={{
          fontWeight: "bold",
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
          fontSize: 14,
          marginVertical: 16,
          marginHorizontal: 45,
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
      <FlatList
        data={balanceData}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
};
export default ActivityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#000000",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
});
