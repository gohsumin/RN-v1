import React, { useEffect, useState } from "react";
import { View, StatusBar, Text, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import TabBar from "../navigations/TabBar";
import SignInMain from "../screens/signin/SignIn";
import Login from "../screens/signin/components/Login";
import SignUp from "../screens/signin/components/SignUp";
import PhoneSignIn from "../screens/signin/components/PhoneSignIn";
import SwipeCards from "../screens/swipe/SwipeCards";
import AppContext from "../data/AppContext";
import ThemeContext from "../data/ThemeContext";
import FlashMessage from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PhoneCode from "../screens/signin/components/PhoneCode";

const RootStack = createStackNavigator();

/* ASSUMED that this isn't on the web */
const RootStackNavigator = () => {

  const { theme, user, setUID } = React.useContext(AppContext);
  const colors = React.useContext(ThemeContext).colors[theme];
  const [initialRoute, setInitialRoute] = useState("");

  const screenOptionStyle = {
    headerStyle: {
      backgroundColor: colors.foreground4,
      height: Platform.OS === "android" ? 83 : 110,
      shadowColor: 'transparent',
    },
    cardStyle: {
      backgroundColor: colors.background
    },
    headerTitleStyle: { fontSize: 18 },
    headerTitleAlign: 'center',
    headerTintColor: colors.antiBackground,
    headerBackTitle: "Back",
  };

  useEffect(() => {
    try {
      const lgn = AsyncStorage.getItem('@logger:key');
      if (typeof lgn === "string") {
        setUID(lgn);
        setInitialRoute("Main");
      }
      setInitialRoute("SignIn");
    }
    catch (error) {
      setInitialRoute("SignIn");
    }
  }, []);

  return (
    (initialRoute === "") ?
      <View style={{ backgroundColor: '#333' }}></View> :
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <StatusBar translucent
          backgroundColor="transparent"
          barStyle={theme === "dark" ?
            "light-content" :
            "dark-content"} />
        <FlashMessage position="top" />
        <RootStack.Navigator
          initialRouteName={initialRoute}
          mode="modal"
          screenOptions={screenOptionStyle}>
          <RootStack.Screen
            name="SignIn"
            component={SignInMain}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="Sign Up"
            component={SignUp}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="Enter Phone Number"
            component={PhoneSignIn}
            options={{
              headerShown: true,
              gestureEnabled: true
            }}
          />
          <RootStack.Screen
            name="Phone Verification"
            component={PhoneCode}
            options={{ headerShown: true, gestureEnabled: true }}
          />
          <RootStack.Screen
            name="Main"
            component={TabBar}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="Approve Purchases"
            component={SwipeCards}
          />
        </RootStack.Navigator>
      </View>
  );
};

export default RootStackNavigator;