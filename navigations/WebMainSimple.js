/* This navigation only for the web has the following features:
   ** A simplified, temporary home page that is half a visual intro to sosh
      and half the search bar that yields links to sosh profiles based on
      instagram/sosh ids
   ** A page for every sosh uid or instagram id on record at the address
      "soshwrld.com/uid/sosh_uid" or "soshwrld.com/ig/ig_id"
   */

import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AppContext from "../data/AppContext";
import ThemeContext from "../data/ThemeContext";
import { Helmet } from "react-helmet";
import WebMainSimpleHome from "../screens/web/WebMainSimpleHome";
import ProfileScreen from "../screens/profile/Profile";
import FlashMessage from 'react-native-flash-message';
import Landing from "../screens/web/components/landing/Landing";
import Privacy from "../screens/web/components/Privacy";
import Terms from "../screens/web/components/Terms";
import TeamTools from "../teamtools/TeamTools";

const WebMainSimple = createStackNavigator();

const WebMainSimpleNavigator = () => {

  const { theme } = React.useContext(AppContext);
  const colors = React.useContext(ThemeContext).colors[theme];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Helmet>
        <meta property='og:title' content='SOSH WORLD' />
        <meta property='og:image' content='https://www.soshworld.com/static/media/SoShNavLogo.4e45a847.png' />
        <meta property='og:description' content='Follow what your favorite influencers are buying.' />
        <meta property='og:url' content='https://www.soshworld.com/' />
      </Helmet>
      <FlashMessage position="top" />
      <WebMainSimple.Navigator
        initialRouteName={"Landing"}>
        <WebMainSimple.Screen
          name="Landing"
          component={Landing}
          options={{ headerShown: false, gestureEnabled: true }}
        >
        </WebMainSimple.Screen>
        <WebMainSimple.Screen
          name="Privacy"
          component={Privacy}
          options={{ headerShown: false, gestureEnabled: true }}
        >
        </WebMainSimple.Screen>
        <WebMainSimple.Screen
          name="Terms"
          component={Terms}
          options={{ headerShown: false, gestureEnabled: true }}
        >
        </WebMainSimple.Screen>
        <WebMainSimple.Screen
          name="Home"
          component={WebMainSimpleHome}
          options={{ headerShown: false, gestureEnabled: true }}
        >
        </WebMainSimple.Screen>
        <WebMainSimple.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false, gestureEnabled: true }}
        >
        </WebMainSimple.Screen>
        <WebMainSimple.Screen
          name="Tools"
          component={TeamTools}
          options={{ headerShown: false, gestureEnabled: true }}
        >
        </WebMainSimple.Screen>
      </WebMainSimple.Navigator>
    </View>
  );
};

export default WebMainSimpleNavigator;