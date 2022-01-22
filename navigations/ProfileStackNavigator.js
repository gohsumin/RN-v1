import React from "react";
import { View, Text, Dimensions, Platform } from 'react-native';
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import ProfileScreen from "../screens/profile/Profile";
import AppContext from "../data/AppContext";
import ThemeContext from "./../data/ThemeContext";
import { useEffect } from "react/cjs/react.development";
import UpdateUser from './../screens/profile/components/UpdateUser';
import { LinearGradient } from "expo-linear-gradient";

const Stack = createStackNavigator();

const ProfileStackNavigator = () => {

  const { theme } = React.useContext(AppContext);
  const colors = React.useContext(ThemeContext).colors[theme];

  const screenOptionStyle = {
    headerStyle: {
      backgroundColor: 'transparent',
      height: Platform.OS === "android" ? 83 : 110,
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
    <View style={{ flex: 1, backgroundColor: colors.background }} >
      <Stack.Navigator initialRouteName={""} screenOptions={screenOptionStyle}>
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
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
    </View>
  );
};

export { ProfileStackNavigator };
