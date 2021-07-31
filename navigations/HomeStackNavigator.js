import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home";
import ActivityScreen from "../screens/Profile";
import AppContext from "../data/AppContext";
import ThemeContext from "../data/ThemeContext";

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => {

  const theme = React.useContext(AppContext).theme;
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
    headerTitleStyle: {
      marginTop: 10,
      fontSize: 18,
    },
    headerTitleAlign: 'center',
    headerTintColor: colors.antiBackground,
    headerTransparent: true,
    headerBackTitle: "Back",
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <HomeStack.Navigator screenOptions={screenOptionStyle}>
        <HomeStack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerLeft: null, headerShown: false }}
        />
        <HomeStack.Screen name="Profile" component={ActivityScreen} />
      </HomeStack.Navigator>
    </View>
  );
};

export { HomeStackNavigator };
