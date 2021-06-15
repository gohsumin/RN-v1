import React, { useState, useContext, useEffect, useRef } from "react";
import {
    AppRegistry,
    View,
    Image,
    Dimensions,
    Animated,
    TouchableWithoutFeedback,
    PanResponder
} from "react-native";
import UsersContext from "../data/UsersContext";
import PostsContext from "../data/PostsContext";
import AppContext from "../data/AppContext";
import ThemeContext from "../data/ThemeContext";
import SwipeCardsContext from "../data/SwipeCardsContext";
import FeedItem from "./components/FeedItem";
import { BlurView } from "expo-blur";
import SwipeCardsContextProvider from "../data/SwipeCardsContextProvider";
import Icon from "react-native-vector-icons/Ionicons";
import { useHeaderHeight } from '@react-navigation/stack';

const SwipeScreen = ({ navigation }) => {
    const user = useContext(AppContext).user;
    const { remaining, setremaining } = useContext(SwipeCardsContext);
    //const [flatListWidth, setFlatListWidth] = useState(0);
    const theme = React.useContext(AppContext).theme;
    const colors = React.useContext(ThemeContext).colors[theme];
    const SCREEN_HEIGHT = Dimensions.get('window').height;
    const SCREEN_WIDTH = Dimensions.get('window').width;

    const [position, setPosition] = useState(new Animated.ValueXY());

    let [translateX, translateY] = [position.x, position.y];

    const headerHeight = useHeaderHeight();

    const panResponder = React.useRef(PanResponder.create({
        onResponderTerminationRequest: () => false,
        onMoveShouldSetPanResponder: () => true,
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderGrant: (e, gestureState) => {
            position.setOffset({ x: position.x, y: position.y });
            position.setValue({ x: 0, y: 0 });
        },
        onPanResponderMove: (evt, { dx, dy }) => {
            const absdx = dx > 0 ? dx : - dx;
            position.setValue({
                x: dx, y: (-2) * absdx ** (0.6)
            });
            return true;
        },
        onPanResponderRelease: (evt, gestureState) => {
            position.flattenOffset();
            position.setValue({ x: 0, y: 0 });

            return true;
        }
    }));

    const [isTransitioning, setIsTransitioning] = useState(true);

    useEffect(() => {
        if (remaining.length > 0) {
            setIsTransitioning(false);
            // maybe do stuff with posting to backend
        }
        else {
            navigation.goBack();
        }
    });

    function Card() {
        return <Animated.View
            {...panResponder.current.panHandlers}
            key={remaining[0].id}
            style={[
                { transform: [{ translateX }, { translateY }] /* position.getTranslateTransform() */ },
                {
                    height: SCREEN_HEIGHT * .6,
                    width: SCREEN_WIDTH * 0.85,
                    backgroundColor: "white",
                    borderRadius: 15,
                    marginTop: 150,
                    alignSelf: 'center',
                    position: 'absolute',
                }
            ]}
        >
            <TouchableWithoutFeedback onPress={() => { }}>
                <Image
                    style={{
                        flex: 1,
                        height: null,
                        width: null,
                        resizeMode: "cover",
                        borderRadius: 10,

                    }}
                    source={{ uri: remaining[0].imageURL }}
                />
            </TouchableWithoutFeedback>
        </Animated.View>
    }

    return (
        <View style={{ flex: 1 }}>
            {!isTransitioning &&
                <View style={{ flex: 1, backgroundColor: colors.background }}>
                    <View
                        style={{
                            height: headerHeight,
                            width: "100%",
                            position: "absolute",
                            backgroundColor: colors.background,
                            borderBottomColor: colors.antiBackground,
                            borderBottomWidth: 0.4
                        }}
                    />
                    <View style={{ flex: 7 }}>
                        <Card />
                    </View>
                    <View style={{
                        width: "60%",
                        height: 250,
                        justifyContent: 'space-between',
                        alignContent: 'center',
                        flexDirection: "row",
                        marginTop: 70,
                        flex: 2,
                        alignSelf: 'center'

                    }}>
                        <Icon name={"close"} color={colors.antiBackground} size={90}></Icon>
                        <Icon name={"checkmark"} color={colors.antiBackground} size={90}></Icon>
                    </View>
                </View>
            }
        </View>
    )
}

export default SwipeScreen;