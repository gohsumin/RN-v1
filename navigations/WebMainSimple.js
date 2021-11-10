import React, { useEffect, useState } from "react";
import { Text, View, StatusBar, FlatList } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import TabBar from "../navigations/TabBar";
import WebMainNavigator from "./WebMainNavigator";
import SignInScreen from "../screens/signin/SignIn";
import LoginScreen from "../screens/signin/components/Login";
import SignUpScreen from "../screens/signin/components/SignUp";
import SwipeCards from "../screens/swipe/SwipeCards";
import AppContext from "../data/AppContext";
import ThemeContext from "../data/ThemeContext";
import FlashMessage from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WebMainSimpleHome from "../screens/web/WebMainSimpleHome";
import IG from "../screens/web/components/IG";
import ProfileScreen from "../screens/profile/Profile";

const WebMainSimple = createStackNavigator();

const WebMainSimpleNavigator = () => {

  const { theme, user, platform } = React.useContext(AppContext);
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