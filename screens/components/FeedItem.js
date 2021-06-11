import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { getElapsedTime } from "../../helpers/postsHelpers";

function FeedItem({
  pfpSource,
  userName,
  firstName,
  lastName,
  title,
  timePosted,
  imageURL,
  likes,
  navigation,
  key,
  width
}) {
  const horLeftRatio = 0.15;
  const horRightRatio = 1 - horLeftRatio;

  const [leftGridWidth, setLeftGridWidth] = useState(width*horLeftRatio);
  const [rightGridWidth, setRightGridWidth] = useState(width*horRightRatio);

  const itemImageRatio = 0.6;
  const titleRatio = 1 - itemImageRatio;

  return (
    <View
      onLayout={(event) => {
        setLeftGridWidth(event.nativeEvent.layout.width * horLeftRatio);
        setRightGridWidth(event.nativeEvent.layout.width * horRightRatio);
        console.log("hey");
      }}
      key={key}
      style={{
        width: "100%",
        flexDirection: "row",
        marginVertical: 10,
      }}
    >
      {/* profile pic */}
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
        style={{
          width: leftGridWidth,
          height: leftGridWidth,
          justifyContent: "center",
        }}
      >
        <Image
          source={pfpSource}
          style={{
            width: leftGridWidth * 0.8,
            height: leftGridWidth * 0.8,
            borderRadius: leftGridWidth / 2,
            alignSelf: "center",
          }}
        />
      </TouchableOpacity>
      <View style={{ width: rightGridWidth }}>
        {/* texts next to the profile pic: buyer name and date */}
        <View
          style={{
            height: leftGridWidth,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "500",
              fontSize: 16.0,
              color: "white",
            }}
          >
            {firstName} {lastName} bought:
          </Text>
          <Text style={{ fontSize: 14.0, color: "gray" }}>
            {getElapsedTime(timePosted)}
          </Text>
        </View>
        {/* grid with the picture and the title */}
        <View
          style={{
            width: rightGridWidth,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 10,
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
              source={{ uri: imageURL }}
              style={{
                borderColor: "#4d4b4b",
                width: rightGridWidth * itemImageRatio,
                height: rightGridWidth * itemImageRatio,
                borderRadius: 20,
                borderWidth: 0.2,
                alignItems: "center",
                resizeMode: "contain",
                backgroundColor: "white",
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: "#cecece",
              fontWeight: "300",
              fontSize: 13,
              paddingLeft: 10,
              width: rightGridWidth * titleRatio,
              flex: 1,
              flexWrap: "wrap",
              flexShrink: 1,
            }}
          >
            {title}
          </Text>
        </View>
        {/* grid with the buttons, e.g. number of likes; maybe add share button later */}
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

export default FeedItem;
