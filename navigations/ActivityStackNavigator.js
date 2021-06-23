import React from "react";
import { View, Text } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import ActivityScreen from "../screens/Activity";
import SignInScreen from "../screens/SignIn";
import AppContext from "../data/AppContext";
import ThemeContext from "../data/ThemeContext";
import { useEffect } from "react/cjs/react.development";

const Stack = createStackNavigator();

const ActivityStackNavigator = () => {

  const { theme, user } = React.useContext(AppContext);
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

  const temp = () => {
    return (
      <View style={{ flex: 1, backgroundColor: 'yellow' }} >
        <Text>
          Hello
        </Text>
      </View>
    )
  }

  return (
    <Stack.Navigator initialRouteName={user !== "" ? "Profile" : "Sign In"} screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Sign In"
        component={SignInScreen}
        options={{ headerShown: false }}
      >
      </Stack.Screen>
      <Stack.Screen
        name="Profile"
        //component={ActivityScreen}
        component={
          temp
        }
        //initialParams={{ user: "lex" }}
        options={{ headerLeft: null, gestureEnabled: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export { ActivityStackNavigator };
