import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, useWindowDimensions, Linking } from "react-native";
import AppContext from "../../../data/AppContext";
import ThemeContext from "../../../data/ThemeContext";
import WebStyleContext from "../../../data/WebStyleContext";
import FeedBottomBar from "./FeedBottomBar";
import CommissionsBar from "./CommissionsBar";
import MiniProfileImage from "../../components/MiniProfileImage";
import FeedHeaderText from "./FeedHeaderText";
import { getProfile } from "react-gmail";
import { firebase } from '../../../data/firebase';
const firestore = firebase.firestore();

// NUMBER OF VIEWS

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
  const [headerTextHeight, setHeaderTextHeight] = useState(0);

  const window = useWindowDimensions();

  function incrementViews(postID) {
    const db = firestore.collection("Posts").doc(postID);
   //console.log("id (post ID): " + postID);
    db.get().then((doc) => {
      const d = doc.data();
      if ("numViews" in d) {
        db.update({ numViews: d.numViews + 1 }).then(() => {
         //console.log("Updated views to " + (d.numViews + 1));
        }).catch((error) => { console.log(error); });
      }
      else {
        db.update({ numViews: 1 }).then(() => {
         //console.log("Set views to  " + 1);
        }).catch((error) => { console.log(error); });
      }
    }).catch((error) => { console.log(error) });
  }

  const getItemTotalWidth = (windowWidth) => {
    return (platform === "web" && setting === "feed") ? getCenterSectionWidth(windowWidth)
      : width;
  }

  const getLeftGridWidth = (windowWidth) => {
    return (getItemTotalWidth(windowWidth) - 2 * marginHorizontal) * 0.23;
  }

  const getRightGridWidth = (windowWidth) => {
    return (getItemTotalWidth(windowWidth) - 2 * marginHorizontal) - getLeftGridWidth(windowWidth);
  }

  const getTitleWidth = (windowWidth) => {
    return getLeftGridWidth(windowWidth);
  }

  const getFeedImageWidth = (windowWidth) => {
    return getRightGridWidth(windowWidth) - getTitleWidth(windowWidth);
  }

  const getProfileImageWidth = (windowWidth) => {
    if (windowWidth > 950) {
      return getLeftGridWidth(windowWidth) * 0.45;
    }
    if (windowWidth > 750) {
      return getLeftGridWidth(windowWidth) * 0.5;
    }
    if (windowWidth > 600) {
      return getLeftGridWidth(windowWidth) * 0.6;
    }
    if (windowWidth > 500) {
      return getLeftGridWidth(windowWidth) * 0.7;
    }
    return getLeftGridWidth(windowWidth) * 0.8;
  }

  const HorPadding = () => {
    return (
      <View style={{
        width: (platform === "web" && setting === "feed")
          ? (window.width - getItemTotalWidth(window.width)) / 2 + marginHorizontal
          : (width - getItemTotalWidth(window.width)) / 2 + marginHorizontal,
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
        width: width,
        marginVertical: marginVertical,
        // borderColor: 'violet',
        // borderWidth: 1
      }}
    >
      {/* horizontal padding */}
      <HorPadding />

      {/* profile pic */}
      <View
        style={{
          width: getLeftGridWidth(window.width),
          height: getLeftGridWidth(window.width),
          alignItems: "flex-end",
          // borderColor: platform === "web" ? "cyan" : 'crimson',
          // borderWidth: 1,
        }}
      >
        <TouchableOpacity
          style={{
            width: getProfileImageWidth(window.width),
            height: getProfileImageWidth(window.width),
            alignSelf: "flex-end",
            marginRight: 13,
            shadowColor: colors.background,
            shadowOpacity: 0.6,
            shadowRadius: 10,
            // borderColor: "pink",
            // borderWidth: 1
          }}
          onPress={navigateToProfile}>
          <Image
            fadeDuration={0}
            source={item.userImageURL}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: getProfileImageWidth(window.width) / 2,
              // borderWidth: 1,
              // borderColor: "blue",
              // alignSelf: "flex-start",
            }}
            resizeMethod="scale"
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>

      {/* right grid — everything to the right of profile pic */}
      <View style={{
        width: getRightGridWidth(window.width),
        // borderColor: platform === "web" ? "cyan" : 'crimson',
        // borderWidth: 1,
      }}>

        {/* texts next to the profile pic: buyer name and date */}
        <View style={{
          paddingTop: window.width > 750 ? 2 : 0,
          // borderWidth: 1, borderColor: "red"
        }}
          onLayout={(event) => {
            setHeaderTextHeight(event.nativeEvent.layout.height);
          }} >
          <FeedHeaderText item={item} navigateToProfile={navigateToProfile} />
        </View>

        {/* grid with the picture */}
        <View
          style={{
            width: getRightGridWidth(window.width),
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
                  // incrementViews(item.id);
                } else {
                 //console.log("Can't open URL: " + item.itemURL);
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
              width: getFeedImageWidth(window.width),
              height: getFeedImageWidth(window.width),
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
                  width: getFeedImageWidth(window.width) - 64,
                  height: getFeedImageWidth(window.width) - 64,
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
                  // incrementViews(item.id);
                } else {
                 //console.log("Can't open URL: " + item.itemURL);
                }
              });
            }}>
            <Text
              numberOfLines={3}
              style={{
                fontSize: getFeedFontSize(window.width, 16.5),
                color: colors.foreground1,
                opacity: 1,
                width: getTitleWidth(window.width),
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
            width: getFeedImageWidth(window.width),
            // borderWidth: 1,
            // borderColor: 'blue',
          }}>
          {setting === 'self'
            // two-side view with the number of purchases as a result of the post and the total payout
            ? <CommissionsBar width={getRightGridWidth(window.width) * getFeedImageRatio(window.width)} />
            // grid with the buttons, e.g. number of likes; maybe add share button later
            : <FeedBottomBar
              incrementViews={() => {
                incrementViews(item.id);
              }}
              numTapped={item.followersTapped.length}
              link={item.itemURL} />}
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
