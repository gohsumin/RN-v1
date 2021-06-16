import React from 'react';
import { createStackNavigator  } from '@react-navigation/stack';
import { ActivityStackNavigator } from './ActivityStackNavigator';
import FeedItem from '../screens/components/FeedItem';
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
          <ActivityModalStack.Navigator mode='modal' screenOptions={screenOptionStyle}>
              <ActivityModalStack.Screen
                name="Main"
                component={ActivityStackNavigator}
                options={{ headerShown: false}}
              />
              <ActivityModalStack.Screen
                name="Feed Item"
                component={FeedItem}
              />
          </ActivityModalStack.Navigator>
      )
}

export default ActivityModalNavigator;