import React, { useContext } from 'react';
import {
    Text,
    View,
} from "react-native";
import AppContext from "../../../data/AppContext";
import ThemeContext from "../../../data/ThemeContext";
import WebStyleContext from '../../../data/WebStyleContext';
import WebBackgroundView from '../../web/WebBackgroundView';
import WebHeaderView from '../../web/WebHeaderView';
import WebNavigationView from '../../web/WebNavigationView';
import Header from './Header';

function UpdateUser({ navigation, route }) {

    const { theme, platform, user } = useContext(AppContext);
    const colors = useContext(ThemeContext).colors[theme];
    const {
        getCenterSectionWidth,
    } = useContext(WebStyleContext);

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.background,
            alignItems: 'center'
        }}>
            {platform === "web" &&
                <View
                    style={{
                        position: 'absolute',
                        width: getCenterSectionWidth(window.width),
                        height: "100%",
                        backgroundColor: "#1e1e1e"
                    }}>
                </View>
            }

            <Text style={{ color: colors.antiBackground }}>
                Edit Profile Here
            </Text>

            {/* header */}
            {platform !== "web" && <Header />}

            {platform === "web" &&
                <WebBackgroundView />}
            {platform === "web" &&
                <WebHeaderView
                    navigation={navigation}
                    route={route} />}
            {platform === "web" &&
                <WebNavigationView
                    navigation={navigation} />}
        </View>
    )
}

export default UpdateUser;