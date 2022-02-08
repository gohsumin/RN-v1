import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MeScreen from '../screens/profile/MeScreen';
import AppContext from '../data/AppContext';
import ThemeContext from '../data/ThemeContext';

const Stack = createStackNavigator();

function MeStackNavigator({ navigation }) {

    const { theme, user } = React.useContext(AppContext);
    const colors = React.useContext(ThemeContext).colors[theme];

    return (
            <Stack.Navigator headerMode='none'>
                <Stack.Screen
                    name={user}
                    component={MeScreen} />
            </Stack.Navigator>
    )
}

export default MeStackNavigator;