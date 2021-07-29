import React from "react";
import { View, Text } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import ActivityScreen from "../screens/Profile";
import AppContext from "../data/AppContext";
import ThemeContext from "../data/ThemeContext";
import { useEffect } from "react/cjs/react.development";
import UpdateUser from '../screens/components/UpdateUser';

const Stack = createStackNavigator();

const ActivityStackNavigator = () => {

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
    <Stack.Navigator initialRouteName={"Profile"} screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Profile"
        component={ActivityScreen}
        options={{ headerLeft: null, gestureEnabled: false }}
      >
      </Stack.Screen>
      <Stack.Screen
        name="Edit Profile"
        component={UpdateUser}
      >
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export { ActivityStackNavigator };
