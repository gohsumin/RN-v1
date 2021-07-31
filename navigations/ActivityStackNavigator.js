import React from "react";
import { View, Text, Dimensions } from 'react-native';
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import ActivityScreen from "../screens/Profile";
import AppContext from "../data/AppContext";
import ThemeContext from "../data/ThemeContext";
import { useEffect } from "react/cjs/react.development";
import UpdateUser from '../screens/components/UpdateUser';
import { LinearGradient } from "expo-linear-gradient";

const Stack = createStackNavigator();

const ProfileStackNavigator = () => {

  const { theme } = React.useContext(AppContext);
  const colors = React.useContext(ThemeContext).colors[theme];

  const screenOptionStyle = {
    headerStyle: {
      backgroundColor: 'transparent',
      height: 83,
      shadowColor: 'transparent',
    },
    cardStyle: {
      backgroundColor: 'transparent'
    },
    headerTitleStyle: { marginTop: 10, fontSize: 18 },
    headerTitleAlign: 'center',
    headerTintColor: colors.antiBackground,
    headerTransparent: true,
    headerBackTitle: "Back",
  };

  return (
    <Stack.Navigator initialRouteName={""} screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Profile"
        component={ActivityScreen}
        options={{
          headerLeft: null,
          gestureEnabled: false,
        }}
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

export { ProfileStackNavigator };
