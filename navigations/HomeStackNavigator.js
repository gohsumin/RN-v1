import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home";
import ActivityScreen from "../screens/Activity";
import ActivityModalNavigator from "./ActivityModalNavigator";
import AppContext from "../data/AppContext";
import ThemeContext from "../data/ThemeContext";
import { StreamApp, FlatFeed } from 'expo-activity-feed';

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => {

  const theme = React.useContext(AppContext).theme;
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

    <HomeStack.Navigator screenOptions={screenOptionStyle}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
      />
      <HomeStack.Screen name="Profile" component={ActivityScreen} />
    </HomeStack.Navigator>

  );
};

export { HomeStackNavigator };
