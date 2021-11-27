/* This navigation only for the web has the following features:
   ** A simplified, temporary home page that is half a visual intro to sosh
      and half the search bar that yields links to sosh profiles based on
      instagram/sosh ids
   ** A page for every sosh uid or instagram id on record at the address
      "soshwrld.com/uid/sosh_uid" or "soshwrld.com/ig/ig_id"
   */

import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Text, useWindowDimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AppContext from "../data/AppContext";
import ThemeContext from "../data/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WebMainSimpleHome from "../screens/web/WebMainSimpleHome";
import ProfileScreen from "../screens/profile/Profile";
import FlashMessage from 'react-native-flash-message';
import { BlurView } from 'expo-blur';
import { EvilIcons } from '@expo/vector-icons';

const WebMainSimple = createStackNavigator();

const WebMainSimpleNavigator = () => {

  const { theme, platform } = React.useContext(AppContext);
  const window = useWindowDimensions();
  const colors = React.useContext(ThemeContext).colors[theme];
  const [initialRoute, setInitialRoute] = useState("");
  const badgeCollapsePoint = 850;
  const badgeTabWidth = 30;
  const badgeHeight = 100;
  const [badgeCollapsed, setBadgeCollapsed] = useState(false);

  useEffect(() => {
    if (window.width > badgeCollapsePoint) {
      setBadgeCollapsed(false);
    }
  });


  function getBadgeMarginRight(windowWidth) {
    return windowWidth > 1400 ?
      30 :
      windowWidth > 1050 ?
        20 :
        windowWidth > badgeCollapsePoint ?
          15 : 0;
  }

  function getBadgeHeaderFontSize(windowWidth) {
    return windowWidth > 1400 ?
      27 :
      windowWidth > 1000 ? 25 :
        windowWidth > 920 ? 22 : 20;
  }

  function getBadgeWidth(windowWidth) {
    return windowWidth > 1000 ? 170 :
      windowWidth > 920 ? 140 : 130;
  }

  useEffect(() => {
    try {
      const lgn = AsyncStorage.getItem('@logger:key');
      if (lgn === null) {
        setInitialRoute("Log In");
      }
      else if (platform === "web") {
        setInitialRoute("WebMain");
      }
      else {
        setInitialRoute("Main");
      }
    }
    catch (error) {
      setInitialRoute("Log In");
    }
  }, []);

  function Badge() {
    return (
      <View style={{
        position: "absolute",
        flex: 1,
        bottom: 50,
        right: getBadgeMarginRight(window.width),
        width: getBadgeWidth(window.width) +
          (badgeCollapsed ? badgeTabWidth : 0),
        height: badgeHeight,
        justifyContent: "flex-end",
        alignItems: "center",
        flex: 1,
        flexDirection: "row",
        // borderWidth: 1,
        // borderColor: "green"
      }} >
        {!badgeCollapsed &&
          <View style={{
            width: getBadgeWidth(window.width),
          }} >
            <Text style={{
              fontWeight: "800",
              fontSize: getBadgeHeaderFontSize(window.width),
              lineHeight: getBadgeHeaderFontSize(window.width) - 1,
              color: "white",
              textAlign: "right",
              textShadowRadius: 10,
              textShadowColor: "black",
              shadowOpacity: 0.5
            }} >
              For full experience
            </Text>
            <Image
              source={require("../assets/appStoreBadge.svg")}
              style={{
                width: "93%",
                alignSelf: "flex-end",
                aspectRatio: 2.99,
                marginTop: 12,
                shadowRadius: 10,
                shadowColor: "black",
                shadowOpacity: 0.5,
                shadowOffset: { width: 1, height: 1 },
                overflow: "visible"
              }}
              resizeMode={"contain"}
            />
          </View>}

        {window.width <= badgeCollapsePoint &&
          <TouchableOpacity style={{
            marginLeft: 10,
            width: badgeTabWidth,
            height: badgeHeight,
            // borderWidth: 1,
            // borderColor: "pink"
          }}
            onPress={() => {
              setBadgeCollapsed(!badgeCollapsed);
            }} >
            <Image
              style={{
                width: "80%",
                paddingHorizontal: "10%",
                height: "100%",
                borderRadius: 10,
              }}
              source={require("../assets/logo.png")}
            />
            <BlurView
              intensity={100}
              tint={"light"}
              style={{
                position: "absolute",
                width: "80%",
                paddingHorizontal: "10%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                borderRadius: 10,
              }}
            >
              <EvilIcons
                name="chevron-right"
                size={43}
                color={"rgba(0, 0, 0, 0.5)"} />
            </BlurView>
          </TouchableOpacity>}
      </View>
    )
  }

  return (
    (initialRoute === "") ?
      <View style={{ backgroundColor: 'red' }}></View> :
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <FlashMessage position="top" />
        <WebMainSimple.Navigator
          initialRouteName={"Home"}>
          <WebMainSimple.Screen
            name="Home"
            component={WebMainSimpleHome}
            options={{ headerShown: false }}
          >
          </WebMainSimple.Screen>
          <WebMainSimple.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          >
          </WebMainSimple.Screen>
        </WebMainSimple.Navigator>
        <Badge />
      </View>
  );
};

export default WebMainSimpleNavigator;