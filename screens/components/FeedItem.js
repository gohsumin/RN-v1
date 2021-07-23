import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { getElapsedTime } from "../../helpers/postsHelpers";
import AppContext from "../../data/AppContext";
import ThemeContext from "../../data/ThemeContext";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FeedBottomBar from "./FeedBottomBar";
import CommissionsBar from "./CommissionsBar";
import { Colors } from "react-native/Libraries/NewAppScreen";

function FeedItem({
  item,
  navigate,
  key,
  width,
  setting,
}) {

  /* refer to ./FeedItemDiagram */
  const horLeftRatio = 0.18;
  const horRightRatio = 1 - horLeftRatio;
  const itemImageRatio = 0.85;
  const titleRatio = 1 - itemImageRatio;

  const marginVertical = setting === 'popup' ? 17 : 15;
  const marginHorizontal = setting === 'popup' ? 14 : 12;

  const [totalWidth, setTotalWidth] = useState(0);
  const [leftGridWidth, setLeftGridWidth] = useState(0);
  const [rightGridWidth, setRightGridWidth] = useState(0);

  const theme = React.useContext(AppContext).theme;
  const colors = React.useContext(ThemeContext).colors[theme];

  return (
    <View
      key={item.key}
      onLayout={(event) => {
        setTotalWidth(width);
        setLeftGridWidth((width - 2 * marginHorizontal) * horLeftRatio);
        setRightGridWidth((width - 2 * marginHorizontal) * horRightRatio);
      }}
      style={{
        width: totalWidth,
        flexDirection: "row",
        marginVertical: marginVertical,
        paddingHorizontal: marginHorizontal,
        justifyContent: "center",
      }}
    >
      {/* profile pic */}
      <TouchableOpacity
        onPress={navigate}
        style={{
          width: leftGridWidth,
          height: leftGridWidth,
        }}
      >
        <Image
          fadeDuration={0}
          source={{ uri: item.userImageURL }}
          style={{
            width: leftGridWidth * 0.83,
            height: leftGridWidth * 0.83,
            marginTop: -4,
            borderRadius: leftGridWidth / 2,
            alignSelf: "flex-start",
          }}
        />
      </TouchableOpacity>
      <View style={{
        width: rightGridWidth,
      }}>
        {/* texts next to the profile pic: buyer name and date */}
        <View
          style={{
            opacity: 0.9,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 17,
              color: colors.antiBackground,
            }}
          >
            {item.userName} bought:
          </Text>
          <Text
            style={{ fontSize: 14.3, color: colors.foreground1, opacity: 0.9 }}
          >
            {item.itemName}
          </Text>
          <Text style={{
            fontSize: 14.3,
            color: colors.foreground1,
            opacity: 0.9,
            marginTop: -2,
            textAlignVertical: 'center',
          }}>
            {getElapsedTime(item.dateApproved.seconds)}
            <Text style={{ fontSize: 12 }}>
              {"  •  "}
            </Text>
            {item.storeName}
          </Text>
        </View>

        {/* grid with the picture and the title */}
        <View
          style={{
            width: rightGridWidth,
            flexDirection: "row",
            marginBottom: 14.5
          }}
        >
          <TouchableOpacity
            style={{
              borderRadius: 20,
              overflow: 'hidden',
            }}>
            <Image
              fadeDuration={0}
              source={{ uri: item.itemImageURL }}
              style={{
                width: rightGridWidth * itemImageRatio,
                height: rightGridWidth * itemImageRatio,
                borderWidth: 0.2,
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
                width: 20,
                height: 20,
                top: 13,
                right: 13,
              }} >
              <MaterialCommunityIcons
                name="arrow-top-right"
                size={13}
                color={colors.green}
                style={{
                }} />
            </View>
          </TouchableOpacity>
        </View>

        {setting === 'self'
          // two-side view with the number of purchases as a result of the post and the total payout
          ? <CommissionsBar width={rightGridWidth * itemImageRatio} />
          // grid with the buttons, e.g. number of likes; maybe add share button later
          : <FeedBottomBar numBought={item.numBought} />}
      </View>
    </View>
  );
}

function areEqual(prevProps, newProps) {
  return prevProps.key === newProps.key;
}

export default React.memo(FeedItem, areEqual);
