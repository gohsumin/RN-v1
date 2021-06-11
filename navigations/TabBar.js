import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home.js";
import ClubsScreen from "../screens/Clubs.js";
import ActivityScreen from "../screens/Activity.js";
import { HomeStackNavigator } from "./HomeStackNavigator";
import { ActivityStackNavigator } from "./ActivityStackNavigator";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function TabBar() {
  return (
    <Tab.Navigator
      activeColor="white"
      inactiveColor="gray"
      tintColor="white"
      barStyle={{ backgroundColor: "#5d5d5d" }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Feed",
          tabBarIcon: ({ tintColor }) => (
            <Entypo name="home" size={24} color={tintColor} />
          ),
        }}
      />
      <Tab.Screen
        name="Clubs"
        component={ClubsScreen}
        options={{
          tabBarLabel: "Browse",
          tabBarIcon: ({ tintColor }) => (
            <AntDesign name="search1" size={24} color={tintColor} />
          ),
        }}
      />
      <Tab.Screen name="Activity" component={ActivityStackNavigator}
      options={{
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <AntDesign name="user" size={24} color={tintColor} />
        )
      }}/>
    </Tab.Navigator>
  );
}

export default TabBar;
