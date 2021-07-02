import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { getElapsedTime } from "../../helpers/postsHelpers";
import AppContext from "../../data/AppContext";
import ThemeContext from "../../data/ThemeContext";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FeedBottomBar from "./FeedBottomBar";
import CommissionsBar from "./CommissionsBar";

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
  setting,
}) {

  /* refer to ./FeedItemDiagram */
  const horLeftRatio = 0.18;
  const horRightRatio = 1 - horLeftRatio;
  const itemImageRatio = 0.71;
  const titleRatio = 1 - itemImageRatio;

  const marginHorizontal = 12;

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
        setLeftGridWidth((width - 2 * marginHorizontal) * horLeftRatio);
        setRightGridWidth((width - 2 * marginHorizontal) * horRightRatio);
      }}
      style={{
        width: totalWidth,
        flexDirection: "row",
        marginVertical: 15,
        paddingHorizontal: marginHorizontal,
        justifyContent: "center",
      }}
    >
      {/* profile pic */}
      <TouchableOpacity
        onPress={() => {
          // navigate(userName);
        }}
        style={{
          width: leftGridWidth,
          height: leftGridWidth,
          // borderWidth: 1,
          // borderColor: 'red'
        }}
      >
        <Image
          fadeDuration={0}
          source={{ uri: pfpSource }}
          style={{
            width: leftGridWidth * 0.8,
            height: leftGridWidth * 0.8,
            marginTop: -4,
            borderRadius: leftGridWidth / 2,
            alignSelf: "flex-start",
            // borderWidth: 1,
            // borderColor: 'red'
          }}
        />
      </TouchableOpacity>
      <View style={{
        width: rightGridWidth,
        // borderWidth: 1,
        // borderColor: 'red'
      }}>
        {/* texts next to the profile pic: buyer name and date */}
        <View
          style={{
            height: leftGridWidth * 0.74,
            opacity: 0.9
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: colors.antiBackground,
            }}
          >
            {firstName} {lastName} bought:
          </Text>
          <Text style={{ fontSize: 13.5, color: colors.foreground1, opacity: 0.9 }}>
            {getElapsedTime(timePosted.seconds)}
          </Text>
        </View>

        {/* grid with the picture and the title */}
        <View
          style={{
            width: rightGridWidth,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 2,
          }}
        >
          <TouchableOpacity
            style={{
              borderRadius: 23,
              overflow: 'hidden'
            }}>
            <Image
              fadeDuration={0}
              source={{ uri: imageSource }}
              style={{
                width: rightGridWidth * itemImageRatio,
                height: rightGridWidth * itemImageRatio,
                borderWidth: 0.2,
                alignItems: "center",
                resizeMode: "contain",
                backgroundColor: 'white',
              }}
            />
            <View
              color="black"
              style={{
                position: 'absolute',
                backgroundColor: 'black',
                borderRadius: 3,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
                width: 16,
                height: 16,
                top: 11,
                right: 11,
              }} >
              <MaterialCommunityIcons
                name="arrow-top-right"
                size={15}
                color="white"
                style={{
                }} />
            </View>
          </TouchableOpacity>
          <Text
            style={{
              color: colors.foreground1,
              fontWeight: "300",
              fontSize: 13.5,
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
        {setting === 'feed' && <FeedBottomBar />}

        {/* two-side view with the number of purchases as a result of the post and the total payout */}
        {setting === 'self' && <CommissionsBar width={rightGridWidth * itemImageRatio} />}
      </View>
    </View>
  );
}

export default FeedItem;
