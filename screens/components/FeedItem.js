import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { getElapsedTime } from "../../helpers/postsHelpers";
import AppContext from "../../data/AppContext";
import ThemeContext from "../../data/ThemeContext";

function FeedItem({
  pfpSource,
  userName,
  firstName,
  lastName,
  title,
  timePosted,
  imageSource,
  likes,
  navigate,
  key,
  width,
}) {

  /* refer to ./FeedItemDiagram */
  const horLeftRatio = 0.17;
  const horRightRatio = 1 - horLeftRatio;
  const itemImageRatio = 0.69;
  const titleRatio = 1 - itemImageRatio;

  const [totalWidth, setTotalWidth] = useState(0);
  const [leftGridWidth, setLeftGridWidth] = useState(0);
  const [rightGridWidth, setRightGridWidth] = useState(0);

  const theme = React.useContext(AppContext).theme;
  const colors = React.useContext(ThemeContext).colors[theme];

  return (
    <View
      key={key}
      onLayout={(event) => {
        setTotalWidth(width);
        setLeftGridWidth(width * horLeftRatio);
        setRightGridWidth(width * horRightRatio);
      }}
      style={{
        width: totalWidth,
        flexDirection: "row",
        marginVertical: 10,
        justifyContent: "center",
      }}
    >
      {/* profile pic */}
      <TouchableOpacity
        onPress={() => {
          navigate(userName);
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
            alignSelf: "flex-start",
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
              color: colors.antiBackground,
            }}
          >
            {firstName} {lastName} bought:
          </Text>
          <Text style={{ fontSize: 14.0, color: colors.foreground1 }}>
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
          <TouchableOpacity>
            <Image
              source={imageSource}
              style={{
                width: rightGridWidth * itemImageRatio,
                height: rightGridWidth * itemImageRatio,
                borderRadius: 20,
                borderWidth: 0.2,
                alignItems: "center",
                resizeMode: "contain",
                backgroundColor: 'white',
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: colors.foreground1,
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
          <EvilIcons name="heart" size={24} color={colors.antiBackground} />
          <Text style={{ paddingLeft: 5, color: colors.antiBackground, fontWeight: "200" }}>
            {likes}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default FeedItem;
