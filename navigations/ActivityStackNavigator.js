import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ActivityScreen from "../screens/Activity";

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#000000",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const Stack = createStackNavigator();

const ActivityStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Profile" component={ActivityScreen} />
    </Stack.Navigator>
  );
};

export { ActivityStackNavigator };
