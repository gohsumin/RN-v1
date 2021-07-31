import React from 'react';
import {
    TouchableOpacity,
    Animated,
} from 'react-native';
import FeedItem from './FeedItem';
import AppContext from '../../data/AppContext';
import ThemeContext from "../../data/ThemeContext";
import { useEffect } from 'react/cjs/react.development';
import { useHeaderHeight } from "@react-navigation/stack";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

function PostPopUp({ info }) {

    const {
        item,
        navigate,
        setModal,
        key,
        width
    } = info;

    const theme = React.useContext(AppContext).theme;
    const colors = React.useContext(ThemeContext).colors[theme];

    const headerHeight = useHeaderHeight();
    const tabBarHeight = useBottomTabBarHeight();

    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 250,
                useNativeDriver: false
            }
        ).start();
    }, [fadeAnim]);

    return (
        <Animated.View style={
            {
                flex: 1,
                width: "100%",
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: 0,
                bottom: - tabBarHeight,
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                opacity: fadeAnim
            }

        }>
            <TouchableOpacity
                style={[{
                    flex: 1,
                    width: "100%", height: "100%",
                    position: 'absolute',
                }]}
                onPress={() => {
                    Animated.timing(
                        fadeAnim,
                        {
                            toValue: 0,
                            duration: 250
                        }
                    ).start();
                    setTimeout(() => { setModal(false); }, 250);
                }}
            >
            </TouchableOpacity>

            <Animated.View style={{
                backgroundColor: colors.foreground4,
                position: 'absolute',
                width: width,
                alignContent: 'center',
                justifyContent: 'center',
                borderRadius: 30,
                opacity: fadeAnim
            }}
            >
                <FeedItem
                    item={item}
                    navigate={navigate}
                    width={width}
                    setting={'popup'}
                />
            </Animated.View>
        </Animated.View >
    )
}

export default PostPopUp;