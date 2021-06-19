import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityStackNavigator } from './ActivityStackNavigator';
import PostPopUp from "../screens/components/PostPopUp";
import ThemeContext from "../data/ThemeContext";
import AppContext from '../data/AppContext';
import RootStackNavigator from './RootStackNavigator';

const ActivityModalStack = createStackNavigator();

const ActivityModalNavigator = () => {
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
    <ActivityModalStack.Navigator mode="modal" screenOptions={screenOptionStyle}>
      <ActivityModalStack.Screen
        name="Main"
        component={ActivityStackNavigator}
        options={{ headerShown: false }}
      />
      <ActivityModalStack.Screen
        mode='modal'
        name="Post Pop-Up"
        component={PostPopUp}
        options={{ headerShown: false }}
      />
    </ActivityModalStack.Navigator>
  )
}

export default ActivityModalNavigator;