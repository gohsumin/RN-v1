import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

function FeedItem({
  pfpSource,
  userName,
  firstName,
  lastName,
  title,
  imageURL,
  likes,
  navigation,
}) {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        paddingTop: 15,
        paddingBottom: 25,
        paddingHorizontal: 10,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(
            "Profile",
            {},
            {
              type: "Navigate",
              routeName: "HomeStackNavigator",
              params: { user: userName },
            }
          );
        }}
      >
        <Image
          source={pfpSource}
          style={{ width: 50, height: 50, marginRight: 10, borderRadius: 30 }}
        />
      </TouchableOpacity>
      <View>
        <Text
          style={{
            paddingTop: 7,
            fontWeight: "400",
            fontSize: 16.0,
            color: "white",
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
          <Image source={{ uri: imageURL }} style={styles.itemImage} />
          <Text
            style={{
              color: "white",
              fontWeight: "300",
              flex: 1,
              flexWrap: "wrap",
              flexShrink: 1,
            }}
          >
            {title}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            alignContent: "center",
          }}
        >
          <EvilIcons name="heart" size={24} color="white" />
          <Text style={{ paddingLeft: 5, color: "white", fontWeight: "200" }}>
            {likes}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemImage: {
    borderColor: "#4d4b4b",
    width: 200,
    height: 200,
    borderRadius: 20,
    borderWidth: 0.2,
    marginTop: 10,
    marginRight: 10,
    alignItems: "center",
    resizeMode: "contain",
    backgroundColor: "white",
  },
});
export default FeedItem;
