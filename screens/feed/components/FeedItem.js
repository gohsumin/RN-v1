import React from "react";
import { View, Image, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import AppContext from "../../../data/AppContext";
import ThemeContext from "../../../data/ThemeContext";
import WebStyleContext from "../../../data/WebStyleContext";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FeedBottomBar from "./FeedBottomBar";
import CommissionsBar from "./CommissionsBar";
import MiniProfileImage from "../../components/MiniProfileImage";
import FeedHeaderText from "./FeedHeaderText";

function FeedItem({
  item,
  navigateToProfile,
  setting,
  width
}) {

  const { theme, platform } = React.useContext(AppContext);
  const colors = React.useContext(ThemeContext).colors[theme];
  const { getCenterSectionWidth } = React.useContext(WebStyleContext);

  const horLeftRatio = 0.17;
  const horRightRatio = 1 - horLeftRatio;
  const itemImageRatio = 0.67;
  const itemTextRatio = 1 - itemImageRatio;

  const marginVertical = platform === "web" ? 20 : setting === 'popup' ? 17 : 15;
  const marginHorizontal = platform === "web" ? 20 : setting === 'popup' ? 14 : 12;

  const window = useWindowDimensions();

  const getItemTotalWidth = () => {
    return (platform === "web" && setting === "feed")
      ? getCenterSectionWidth(window.width) : width;
  }

  const getLeftGridWidth = () => {
    return (getItemTotalWidth() - 2 * marginHorizontal) * horLeftRatio;
  }

  const getRightGridWidth = () => {
    return (getItemTotalWidth() - 2 * marginHorizontal) * horRightRatio;
  }

  const HorPadding = () => {
    return (
      <View style={{
        width: (platform === "web" && setting === "feed")
          ? (window.width - getItemTotalWidth()) / 2 + marginHorizontal
          : (width - getItemTotalWidth()) / 2 + marginHorizontal,
        pointerEvents: 'none',
        // borderWidth: 1,
        // borderColor: 'darksalmon'
      }} />
    )
  }

  return (
    <View
      key={item.id}
      style={{
        flexDirection: "row",
        width: "100%",
        marginVertical: marginVertical,
        // borderColor: 'crimson',
        // borderWidth: 1
      }}
    >
      {/* horizontal padding */}
      <HorPadding />

      {console.log("FeedItem with key " + item.id)}
      {/* profile pic */}
      <View
        style={{
          width: getLeftGridWidth(),
          height: getLeftGridWidth(),
          // borderColor: 'crimson',
          // borderWidth: 1
        }}
      >
        <MiniProfileImage
          sideLength={getLeftGridWidth() * 0.8}
          source={{ uri: item.userImageURL }}
          navigate={navigateToProfile} />
      </View>

      {/* right grid — everything to the right of profile pic */}
      <View style={{
        width: getRightGridWidth(),
      }}>
        {/* texts next to the profile pic: buyer name and date */}
        <FeedHeaderText item={item} navigateToProfile={navigateToProfile} />

        {/* grid with the picture */}
        <View
          style={{
            width: getRightGridWidth(),
            flexDirection: "row",
            alignItems: 'center',
            marginBottom: 10,
            // borderColor: 'crimson',
            // borderWidth: 1
          }}
        >
          <TouchableOpacity
            onPress={() => {

            }}
            style={{
              borderRadius: 17,
              overflow: 'hidden',
              shadowColor: colors.background,
              shadowOpacity: 0.6,
              shadowRadius: 10,
            }}>
            <Image
              fadeDuration={0}
              source={{ uri: item.itemImageURL }}
              style={{
                width: getRightGridWidth() * itemImageRatio,
                height: getRightGridWidth() * itemImageRatio,
                resizeMode: "contain",
                backgroundColor: 'white',
              }}
            />
            <View
              color="black"
              style={{
                position: 'absolute',
                backgroundColor: 'black',
                borderRadius: 5,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
                width: 24,
                height: 24,
                top: 13,
                right: 13,
              }} >
              <MaterialCommunityIcons
                name="arrow-top-right"
                size={16}
                color={colors.green}
                style={{
                }} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {

            }}>
            <Text
              style={{
                fontSize: 13,
                color: colors.foreground1,
                opacity: 1,
                width: getRightGridWidth() * itemTextRatio,
                textShadowColor: colors.background,
                textShadowRadius: 10,
                paddingLeft: 10,
                // borderWidth: 1,
                // borderColor: 'blue',
              }}
            >
              {item.itemName}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: getRightGridWidth() * itemImageRatio,
            // borderWidth: 1,
            // borderColor: 'blue',
          }}>
          {setting === 'self'
            // two-side view with the number of purchases as a result of the post and the total payout
            ? <CommissionsBar width={getRightGridWidth() * itemImageRatio} />
            // grid with the buttons, e.g. number of likes; maybe add share button later
            : <FeedBottomBar height={43} numBought={item.numBought} />}
        </View>

      </View>

      {/* horizontal padding */}
      <HorPadding />
    </View>
  );
}

function areEqual(prevProps, newProps) {
  return prevProps.item.id === newProps.item.id;
}

export default React.memo(FeedItem, areEqual);
