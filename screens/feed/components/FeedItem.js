import React from "react";
import { View, Image, Text, TouchableOpacity, useWindowDimensions, Linking } from "react-native";
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
  const {
    getCenterSectionWidth,
    getProfileWidth,
    getFeedFontSize,
    getFeedImageRatio,
    getFeedLeftRatio, } = React.useContext(WebStyleContext);

  const marginVertical = platform === "web" ? 20 : setting === 'popup' ? 17 : 15;
  const marginHorizontal = platform === "web" ? 0 : setting === 'popup' ? 14 : 12;

  const window = useWindowDimensions();

  const getItemTotalWidth = () => {
    return (platform == "web" && setting === "others") ?
      getProfileWidth() :
      (platform === "web" && setting === "feed") ? getCenterSectionWidth(window.width)
        : width;
  }

  const getLeftGridWidth = () => {
    return (getItemTotalWidth() - 2 * marginHorizontal) * getFeedLeftRatio(window.width);
  }

  const getRightGridWidth = () => {
    return (getItemTotalWidth() - 2 * marginHorizontal) * (1 - getFeedLeftRatio(window.width));
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
        justifyContent: "space-between",
        width: "100%",
        marginVertical: marginVertical,
        // borderColor: 'violet',
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
          sideLength={getLeftGridWidth() * 0.85}
          rightShift={getLeftGridWidth() * 0}
          source={{ uri: "https://images.unsplash.com/photo-1636557343665-dcf9adcead85?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=772&q=80" }}
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
              Linking.canOpenURL(item.itemURL).then(supported => {
                if (supported) {
                  Linking.openURL(item.itemURL);
                } else {
                  console.log("Can't open URL: " + item.itemURL);
                }
              });
            }}
            style={{
              borderRadius: 24,
              overflow: 'hidden',
              shadowColor: colors.background,
              shadowOpacity: 0.6,
              shadowRadius: 10,
            }}>

            <View style={{
              width: getRightGridWidth() * getFeedImageRatio(window.width),
              height: getRightGridWidth() * getFeedImageRatio(window.width),
              borderRadius: 24,
              backgroundColor: 'white',
              overflow: 'hidden',
              shadowColor: colors.background,
              shadowOpacity: 0.6,
              shadowRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              // borderColor: 'crimson',
              // borderWidth: 1
            }}>
              <Image
                fadeDuration={0}
                source={{ uri: item.itemImageURL }}
                style={{
                  width: getRightGridWidth() * getFeedImageRatio(window.width) - 64,
                  height: getRightGridWidth() * getFeedImageRatio(window.width) - 64,
                  resizeMode: "contain",
                  backgroundColor: 'white',
                  alignItems: 'center',
                  // borderColor: 'orange',
                  // borderWidth: 1
                }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Linking.canOpenURL(item.itemURL).then(supported => {
                if (supported) {
                  Linking.openURL(item.itemURL);
                } else {
                  console.log("Can't open URL: " + item.itemURL);
                }
              });
            }}>
            <Text
              numberOfLines={4}
              style={{
                fontSize: getFeedFontSize(window.width, 16.5),
                color: colors.foreground1,
                opacity: 1,
                width: getRightGridWidth() * (1 - getFeedImageRatio(window.width)),
                textShadowColor: colors.background,
                textShadowRadius: 10,
                paddingLeft: 12,
                // borderColor: 'crimson',
                // borderWidth: 1
              }}
            >
            {item.itemName}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: getRightGridWidth() * getFeedImageRatio(window.width),
            // borderWidth: 1,
            // borderColor: 'blue',
          }}>
          {setting === 'self'
            // two-side view with the number of purchases as a result of the post and the total payout
            ? <CommissionsBar width={getRightGridWidth() * getFeedImageRatio(window.width)} />
            // grid with the buttons, e.g. number of likes; maybe add share button later
            : <FeedBottomBar numTapped={item.followersTapped.length} />}
        </View>

      </View>

      {/* horizontal padding */}
      <HorPadding />
    </View>
  );
}

function areEqual(prevProps, newProps) {
  return prevProps.width === newProps.width && prevProps.item.id === newProps.item.id;
}

export default React.memo(FeedItem, areEqual);
