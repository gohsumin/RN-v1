import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home";
import ActivityScreen from "../screens/Activity";

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#000000",
  },
  cardStyle: { backgroundColor: "#000" },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={screenOptionStyle}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="Profile" component={ActivityScreen} />
    </HomeStack.Navigator>
  );
};

export { HomeStackNavigator };
