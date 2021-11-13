/* This navigation only for the web has the following features:
   ** A simplified, temporary home page that is half a visual intro to sosh
      and half the search bar that yields links to sosh profiles based on
      instagram/sosh ids
   ** A page for every sosh uid or instagram id on record at the address
      "soshwrld.com/uid/sosh_uid" or "soshwrld.com/ig/ig_id"
   */

import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AppContext from "../data/AppContext";
import ThemeContext from "../data/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WebMainSimpleHome from "../screens/web/WebMainSimpleHome";
import ProfileScreen from "../screens/profile/Profile";

const WebMainSimple = createStackNavigator();

const WebMainSimpleNavigator = () => {

  const { theme, platform } = React.useContext(AppContext);
  const colors = React.useContext(ThemeContext).colors[theme];
  const [initialRoute, setInitialRoute] = useState("");

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

  return (
    (initialRoute === "") ?
      <View style={{ backgroundColor: 'red' }}></View> :
      <View style={{ flex: 1, backgroundColor: colors.background }}>
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
      </View>
  );
};

export default WebMainSimpleNavigator;