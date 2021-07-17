import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import TabBar from "../navigations/TabBar";
import SignInScreen from "../screens/SignIn";
import SwipeCards from "../screens/SwipeCards";
import AppContext from "../data/AppContext";
import PostsContext from "../data/PostsContext";
import ThemeContext from "../data/ThemeContext";

const RootStack = createStackNavigator();

const RootStackNavigator = () => {
  
  const { theme, user } = React.useContext(AppContext);
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

  return (
    <RootStack.Navigator
      initialRouteName={user === "" ? "Sign In" : "Main"}
      mode="modal"
      screenOptions={screenOptionStyle}>
      <RootStack.Screen
        name="Sign In"
        component={SignInScreen}
        options={{ headerShown: false }}
      >
      </RootStack.Screen>
      <RootStack.Screen
        name="Main"
        component={TabBar}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="Approve Purchases" component={SwipeCards} />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;