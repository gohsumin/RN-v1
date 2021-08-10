import React from "react";
import { Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import { getElapsedTime } from "../../../helpers/postsHelpers";
import AppContext from "../../../data/AppContext";
import ThemeContext from "../../../data/ThemeContext";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FeedBottomBar from "./FeedBottomBar";
import CommissionsBar from "./CommissionsBar";

function FeedItem({
  item,
  navigate,
  setting,
}) {

  const { theme, platform } = React.useContext(AppContext);
  const colors = React.useContext(ThemeContext).colors[theme];

  const horLeftRatio = 0.18;
  const horRightRatio = 1 - horLeftRatio;
  const itemImageRatio = 0.79;
  const titleRatio = 1 - itemImageRatio;

  const marginVertical = setting === 'popup' ? 17 : 15;
  const marginHorizontal = platform === "web" ? 150 : setting === 'popup' ? 14 : 12;

  const WINDOW_WIDTH = Dimensions.get('window').width;
  const itemTotalWidth = platform === "web" ? 900 : WINDOW_WIDTH;
  const leftGridWidth = (itemTotalWidth - 2 * marginHorizontal) * horLeftRatio;
  const rightGridWidth = (itemTotalWidth - 2 * marginHorizontal) * horRightRatio;


  return (
    <View
      key={item.id}
      style={{
        //width: WINDOW_WIDTH,
        flex: 1,
        flexDirection: "row",
        marginVertical: marginVertical,
        justifyContent: "center",
      }}
    >
      {/* horizontal padding */}
      <View style={{ width: (WINDOW_WIDTH - itemTotalWidth) / 2 }} />

      {console.log("FeedItem with key " + item.id)}
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
            shadowColor: colors.background,
            shadowOpacity: 0.6,
            shadowRadius: 10,
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
              textShadowColor: colors.background,
              textShadowOpacity: 0.6,
              textShadowRadius: 10,
            }}
          >
            {item.userName} bought:
          </Text>
          <Text
            style={{
              fontSize: 14.3,
              color: colors.foreground1,
              opacity: 0.9,
              textShadowColor: colors.background,
              textShadowOpacity: 0.6,
              textShadowRadius: 10,
            }}
          >
            {item.itemName}
          </Text>
          <Text style={{
            fontSize: 14.3,
            color: colors.foreground1,
            opacity: 0.9,
            marginTop: -2,
            textAlignVertical: 'center',
            textShadowColor: colors.background,
            textShadowOpacity: 0.6,
            textShadowRadius: 10,
          }}>
            {getElapsedTime(item.dateApproved.seconds)}
            <Text style={{ fontSize: 12 }}>
              {"  •  "}
            </Text>
            {item.storeName}
          </Text>
        </View>

        {/* grid with the picture */}
        <View
          style={{
            width: rightGridWidth,
            flexDirection: "row",
            marginBottom: 14.5,
          }}
        >
          <TouchableOpacity
            style={{
              borderRadius: 20,
              overflow: 'hidden',
              shadowColor: colors.background,
              shadowOpacity: 0.6,
              shadowRadius: 10,
            }}>
            <Image
              fadeDuration={0}
              source={{ uri: item.itemImageURL }}
              style={{
                width: rightGridWidth * itemImageRatio,
                height: rightGridWidth * itemImageRatio,
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

      {/* horizontal padding */}
      <View style={{ width: (WINDOW_WIDTH - itemTotalWidth) / 2 }} />
    </View>
  );
}

function areEqual(prevProps, newProps) {
  return prevProps.item.id === newProps.item.id;
}

export default React.memo(FeedItem, areEqual);
