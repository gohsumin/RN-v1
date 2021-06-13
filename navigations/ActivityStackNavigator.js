import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ActivityScreen from "../screens/Activity";
import AppContext from "../data/AppContext";
import ThemeContext from "../data/ThemeContext";

const Stack = createStackNavigator();

const ActivityStackNavigator = () => {

  const {theme,user} = React.useContext(AppContext);
  const colors = React.useContext(ThemeContext).colors[theme];

  const screenOptionStyle = {
    headerStyle: {
      backgroundColor: colors.background,
    },
    cardStyle: { backgroundColor: colors.background },
    headerTintColor: colors.antiBackground,
    headerBackTitle: "Back",
  };

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
