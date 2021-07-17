import React, { useContext } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import AppContext from "../../data/AppContext";
import ThemeContext from "../../data/ThemeContext";
import UsersContext from '../../data/UsersContext';

function UpdateUser() {

    const theme = useContext(AppContext).theme;
    const colors = useContext(ThemeContext).colors[theme];

    return(
        <View style={{
            backgroundColor: colors.background,
        }}>
            <Text style={{color: colors.antiBackground}}>
                Edit Profile Here
            </Text>
        </View>
    )
}

export default UpdateUser;