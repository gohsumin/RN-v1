import React from "react";
import { View, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AppHome from "../screens/feed/AppHome";
import AppContext from "../data/AppContext";
import ThemeContext from "../data/ThemeContext";
import ProfileScreen from "../screens/profile/ProfileScreen";

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => {

  const theme = React.useContext(AppContext).theme;
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
    headerTitleStyle: {
      // marginTop: 10,
      fontSize: 18,
    },
    headerTitleAlign: 'center',
    headerTintColor: colors.antiBackground,
    headerTransparent: true,
    headerBackTitle: "Back",
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <HomeStack.Navigator screenOptions={screenOptionStyle}
        initialRouteName="Home">
        <HomeStack.Screen
          name="Home"
          component={AppHome}
          options={{ headerLeft: null, headerShown: false }}
        />
        <HomeStack.Screen
          name="Profile"
          component={ProfileScreen}
        />
      </HomeStack.Navigator>
    </View>
  );
};

export { HomeStackNavigator };
