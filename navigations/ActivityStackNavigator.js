import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ActivityScreen from "../screens/Activity";
import AppContext from "../data/AppContext";

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#000000",
  },
  cardStyle: { backgroundColor: "#000" },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const Stack = createStackNavigator();

const ActivityStackNavigator = () => {
  const user = React.useContext(AppContext).user;
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Profile"
        component={ActivityScreen}
        initialParams={{ user: user }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export { ActivityStackNavigator };
