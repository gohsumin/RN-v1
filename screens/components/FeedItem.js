import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

function FeedItem({ pfpSource, firstName, lastName, title, imageURL, likes }) {
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
          <Image source={{ uri: imageURL }} style={styles.itemImage} />
          <Text style={{ flex: 1, flexWrap: "wrap", flexShrink: 1 }}>
            {title}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
          <Image
            source={require("../../assets/heart.png")}
            style={{
              width: 20,
              height: 20,
              resizeMode: "contain",
            }}
          />
          <Text style={{ paddingLeft: 5 }}>{likes}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemImage: {
    width: 200,
    height: 200,
    borderRadius: 20,
    borderWidth: 0.2,
    marginTop: 10,
    marginRight: 10,
    alignItems: "center",
    resizeMode: "contain",
  },
});
export default FeedItem;
