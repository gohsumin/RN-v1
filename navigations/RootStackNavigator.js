import React from "react";
import { Text, View, StatusBar, FlatList } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import TabBar from "../navigations/TabBar";
import WebMainNavigator from "./WebMainNavigator";
import SignInScreen from "../screens/signin/SignIn";
import LoginScreen from "../screens/signin/components/Login";
import SignUpScreen from "../screens/signin/components/SignUp";
import SwipeCards from "../screens/swipe/SwipeCards";
import AppContext from "../data/AppContext";
import PostsContext from "../data/PostsContext";
import ThemeContext from "../data/ThemeContext";
import FlashMessage from "react-native-flash-message";

const RootStack = createStackNavigator();

const RootStackNavigator = () => {

  const { theme, user, platform } = React.useContext(AppContext);
  const colors = React.useContext(ThemeContext).colors[theme];

  const screenOptionStyle = {
    headerStyle: {
      backgroundColor: colors.foreground4,
      height: 83,
      shadowColor: 'transparent',
    },
    cardStyle: {
      backgroundColor: colors.background
    },
    headerTitleStyle: { marginTop: 10, fontSize: 18 },
    headerTitleAlign: 'center',
    headerTintColor: colors.antiBackground,
    headerBackTitle: "Back",
  };

  function Test() {
    return (
      <View
        style={{
          flex: 1,
          borderWidth: 1,
          padding: 20,
          borderColor: 'pink',
          alignItems: 'center',
          backgroundColor: colors.background
        }}>
        <FlatList
          data={[
            { test: "#222" },
            { test: "#333" },
            { test: "#444" },
            { test: "#555" },
            { test: "#666" },
            { test: "#777" },
            { test: "#888" },
            { test: "#999" },
            { test: "#aaa" },
            { test: "#bbb" },
            { test: "#ccc" },
            { test: "#ddd" },
            { test: "#eee" },
            { test: "#fff" },
          ]}
          renderItem={({ item }) =>
            <View style={{
              backgroundColor: item.test,
              width: 180,
              height: 100,
              margin: 20
            }} />
          }
          keyExtractor={(item) => { return item.test }}
        />
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar translucent backgroundColor="transparent" barStyle={theme === "dark" ? "light-content" : "dark-content"} />
      <FlashMessage position="top" />
      <RootStack.Navigator
        initialRouteName={user === "" ?
          "Sign In" :
          platform === "web" ?
            "WebMain" : "Main"}
        mode="modal"
        screenOptions={screenOptionStyle}>
        <RootStack.Screen
          name="Test"
          component={Test} />
        <RootStack.Screen
          name="Sign In"
          component={SignInScreen}
          options={{ headerShown: false }}
        >
        </RootStack.Screen>
        <RootStack.Screen
          name="Login"
          component={LoginScreen}
        >
        </RootStack.Screen>
        <RootStack.Screen
          name="Sign Up"
          component={SignUpScreen}
        >
        </RootStack.Screen>
        <RootStack.Screen
          name="WebMain"
          component={WebMainNavigator}
          options={{ headerShown: false }} />
        <RootStack.Screen
          name="Main"
          component={TabBar}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="Approve Purchases" component={SwipeCards} />
      </RootStack.Navigator>
    </View>
  );
};

export default RootStackNavigator;