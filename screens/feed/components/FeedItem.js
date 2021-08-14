import React from "react";
import { View, Image, TouchableOpacity, useWindowDimensions } from "react-native";
import AppContext from "../../../data/AppContext";
import ThemeContext from "../../../data/ThemeContext";
import StyleContext from "../../../data/StyleContext";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FeedBottomBar from "./FeedBottomBar";
import CommissionsBar from "./CommissionsBar";
import ProfileImage from "../../components/ProfileImage";
import FeedHeaderText from "./FeedHeaderText";

function FeedItem({
  item,
  navigateToProfile,
  setting,
  width
}) {

  const { theme, platform } = React.useContext(AppContext);
  const colors = React.useContext(ThemeContext).colors[theme];
  const { getCenterSectionWidth } = React.useContext(StyleContext).web;

  const horLeftRatio = 0.18;
  const horRightRatio = 1 - horLeftRatio;
  const itemImageRatio = 0.79;

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
        borderWidth: 1,
        borderColor: 'darksalmon'
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
        overflow: 'hidden',
        borderColor: 'crimson',
        borderWidth: 1
      }}
    >
      {/* horizontal padding */}
      <HorPadding />

      {console.log("FeedItem with key " + item.id)}
      {/* profile pic */}
      <TouchableOpacity
        onPress={navigateToProfile}
        style={{
          width: getLeftGridWidth(),
          height: getLeftGridWidth(),
        }}
      >
        <ProfileImage
          sideLength={getLeftGridWidth() * 0.83}
          source={{ uri: item.userImageURL }} />
      </TouchableOpacity>

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
          ? <CommissionsBar width={getRightGridWidth() * itemImageRatio} />
          // grid with the buttons, e.g. number of likes; maybe add share button later
          : <FeedBottomBar height={43} numBought={item.numBought} />}
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
