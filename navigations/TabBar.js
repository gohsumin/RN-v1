import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home.js";
import ClubsScreen from "../screens/Clubs.js";
import ActivityScreen from "../screens/Activity.js";
import { HomeStackNavigator } from './HomeStackNavigator';
import { ActivityStackNavigator } from './ActivityStackNavigator';

const Tab = createBottomTabNavigator();

function TabBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Clubs" component={ClubsScreen} />
      <Tab.Screen name="Activity" component={ActivityStackNavigator} />
    </Tab.Navigator>
  );
}

export default TabBar;
