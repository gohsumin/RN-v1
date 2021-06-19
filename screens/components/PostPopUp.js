import React from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Animated,
    Easing,
    LogBox
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import FeedItem from './FeedItem';
import AppContext from "../../data/AppContext";
import ThemeContext from "../../data/ThemeContext";
import { BlurView } from "expo-blur";
import { useEffect } from 'react/cjs/react.development';

function PostPopUp({ info }) {

    const {
        pfpSource,
        user,
        firstName,
        lastName,
        title,
        timePosted,
        imageSource,
        likes,
        navigate,
        setModal,
        key,
        width
    } = info;

    const theme = React.useContext(AppContext).theme;
    const colors = React.useContext(ThemeContext).colors[theme];

    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        LogBox.ignoreAllLogs();
    }, []);

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
                height: "100%",
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
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
                    pfpSource={pfpSource}
                    user={user}
                    firstName={firstName}
                    lastName={lastName}
                    title={title}
                    timePosted={timePosted}
                    imageSource={imageSource}
                    likes={likes}
                    navigate={navigate}
                    key={key}
                    width={width}
                />
            </Animated.View>
        </Animated.View >
    )
}

export default PostPopUp;