import React, { useEffect } from 'react';
import {
    TouchableOpacity,
    Animated,
    useWindowDimensions
} from 'react-native';
import FeedItem from '../../feed/components/FeedItem';
import AppContext from '../../../data/AppContext';
import ThemeContext from "../../../data/ThemeContext";
import WebStyleContext from '../../../data/WebStyleContext';
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

function PostPopUp({ info }) {

    const {
        item,
        navigate,
        setModal,
    } = info;

    const { platform, theme } = React.useContext(AppContext);
    const colors = React.useContext(ThemeContext).colors[theme];

    const { getCenterSectionWidth } = React.useContext(WebStyleContext);

    const window = useWindowDimensions();
    const tabBarHeight = platform === "web" ? 0 : useBottomTabBarHeight();

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
                backgroundColor: colors.background4,
                position: 'absolute',
                width: platform === "web" ? getCenterSectionWidth(window.width) : "94%",
                height: platform === "web" ? getCenterSectionWidth(window.width) * 0.87 : 400,
                alignContent: 'center',
                justifyContent: 'center',
                borderRadius: 30,
                opacity: fadeAnim
            }}
            >
                <FeedItem
                    item={item}
                    navigateToProfile={navigate}
                    setting={'popup'}
                    width={platform === "web" ? getCenterSectionWidth(window.width) : window.width * 0.94}
                />
            </Animated.View>

            {/* <Animated.View style={{
                backgroundColor: 'transparent',
                position: 'absolute',
                flex: 1,
                alignContent: 'center',
                justifyContent: 'center',
                opacity: fadeAnim
            }}
            >
                <FeedItem
                    item={item}
                    navigateToProfile={navigate}
                    setting={'popup'}
                    width={getCenterSectionWidth(window.width)}
                />
            </Animated.View> */}

        </Animated.View >
    )
}

export default PostPopUp;