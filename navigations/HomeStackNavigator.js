import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home";
import ActivityScreen from "../screens/Activity";
import ActivityModalNavigator from "./ActivityModalNavigator";
import AppContext from "../data/AppContext";
import ThemeContext from "../data/ThemeContext";

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => {

  const theme = React.useContext(AppContext).theme;
  const colors = React.useContext(ThemeContext).colors[theme];

  const screenOptionStyle = {
    headerStyle: {
      backgroundColor: colors.foreground4,
      height: 100,
      shadowColor: 'transparent'
    },
    
    headerTintColor: colors.antiBackground,
    headerBackTitle: "Back",
    //headerTransparent: 'true',
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
