import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import TabBar from "../navigations/TabBar";
import SwipeCards from "../screens/SwipeCards";
import AppContext from "../data/AppContext";
import ThemeContext from "../data/ThemeContext";

const RootStack = createStackNavigator();

const RootStackNavigator = () => {

    const theme = React.useContext(AppContext).theme;
    const colors = React.useContext(ThemeContext).colors[theme];

    const screenOptionStyle = {
        headerStyle: {
          backgroundColor: 'transparent',
          height: 100
        },
        
        headerTintColor: colors.antiBackground,
        headerBackTitle: "Back",
        headerTransparent: 'true',
      };

    return (
        <RootStack.Navigator mode="modal" screenOptions={screenOptionStyle}>
           
            <RootStack.Screen
                name="Main"
                component={TabBar}
                options={{ headerShown: false }}
            />
             <RootStack.Screen name="Approve Purchases" component={SwipeCards} />
        </RootStack.Navigator>
    );
};

export default RootStackNavigator;