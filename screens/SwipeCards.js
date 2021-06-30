import React, { useState, useContext, useEffect, useRef } from "react";
import {
    View,
    Image,
    Dimensions,
    Animated,
    TouchableWithoutFeedback,
    PanResponder,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import * as Expo from 'expo';
//import { DangerZone } from "expo";
import { Interactable } from 'react-native-redash';
import PostsContext from "../data/PostsContext";
import ThemeContext from "../data/ThemeContext";
import SwipeCardsContext from "../data/SwipeCardsContext";
import Icon from "react-native-vector-icons/Ionicons";
import { useHeaderHeight } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import AppContext from '../data/AppContext';

function SwipeScreen({ navigation }) {

    const theme = React.useContext(AppContext).theme;
    const colors = React.useContext(ThemeContext).colors[theme];

    const SCREEN_HEIGHT = Dimensions.get('window').height;
    const SCREEN_WIDTH = Dimensions.get('window').width;

    const cardHeight = "75%";
    const cardWidth = "80%";

    const cardBorderRadius = 10;

    // source: https://snack.expo.io/EDMIVjbyq
    const α = Math.PI / 12;

    const snapThreshhold = 220;
    const { Value } = Animated;

    // user object for the current user
    const user = useContext(AppContext).user;

    // function that adds a new post to the posts context
    const { addPost } = React.useContext(PostsContext);

    // pops the first item off the remaining array context
    const { popRemaining } = useContext(SwipeCardsContext);

    // remaining cards context
    const remaining = useContext(SwipeCardsContext).remaining;

    //const [index, setIndex] = useState(0);
    const index = useRef(0);

    useEffect(() => {
        if (remaining.length === 0) {
            navigation.goBack();
        }
    }, [remaining, popRemaining]);

    // local array of remaining cards
    /* const [remaining, setRemaining] = useState(remainingContextArray); */

    const animating = useRef(false);

    const x = useRef(new Value(0)).current;
    const y = useRef(new Value(0)).current;
    const rotateZ = x.interpolate({
        inputRange: [-SCREEN_WIDTH, SCREEN_WIDTH],
        outputRange: [(-α + 'rad'), (α + 'rad')],
        extrapolate: 'clamp'
    });

    const swipedLeft = () => {
        console.log("swiped left");
        // pop the top of the context stack
        popRemaining();
        index.current++;
        if (index === remaining.length) {
            navigation.goBack();
        }
    }

    const swipedRight = () => {
        console.log("index: " + index.current);
        console.log("swiped right");
        const swipedCard = remaining[index.current];
        console.log("...on " + swipedCard.title);
        // pop the top of the context stack
        popRemaining();
        index.current++;
        // post item as prop to addPost
        const newPost = {
            user: user,
            datePurchased: swipedCard.datePurchased,
            datePosted: (new Date().getTime() / 1000).toString(),
            likes: 0,
            title: swipedCard.title,
            imageSource: { uri: swipedCard.imageURL }
        }
        // update the feed context
        addPost(newPost);
        if (index === remaining.length) {
            console.log("it is the last card");
            navigation.goBack();
        }
    }

    const panResponder = React.useRef(PanResponder.create({
        onResponderTerminationRequest: () => false,
        onMoveShouldSetPanResponder: () => true,
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderGrant: (e, gestureState) => {
            if (!animating.current) {
                x.setOffset(x._value);
                y.setOffset(y._value);
            }
        },
        onPanResponderMove: (evt, { dx, dy }) => {
            if (!animating.current) {
                x.setValue(dx);
                y.setValue(dy);
            }
            return true;
        },
        onPanResponderRelease: (evt, { dx }) => {
            x.flattenOffset();
            y.flattenOffset();
            if (dx < -snapThreshhold) {
                x.setValue(0);
                y.setValue(0);
                swipedLeft();
            }
            if (dx > snapThreshhold) {
                x.setValue(0);
                y.setValue(0);
                swipedRight();
            }
            else {
                animating.current = true;
                Animated.parallel([
                    Animated.spring(x, {
                        toValue: 0,
                        velocity: 1,
                        restDisplacementThreshold: 0.1,
                        restSpeedThreshold: 0.1,
                        useNativeDriver: true
                    }),
                    Animated.spring(y, {
                        toValue: 0,
                        velocity: 1,
                        restDisplacementThreshold: 0.1,
                        restSpeedThreshold: 0.1,
                        useNativeDriver: true
                    })
                ]).start(() => {
                    x.setValue(0);
                    y.setValue(0);
                    animating.current = false;
                });
            }
            return true;
        }
    }));

    function Card({ item }) {
        return (
            <View
                style={{
                    flex: 1,
                    alignContent: 'center',
                    borderRadius: cardBorderRadius,
                    overflow: 'hidden',
                    width: "100%",
                    height: "100%",
                    position: 'absolute',
                }}>
                <Image
                    fadeDuration={0}
                    style={{
                        resizeMode: "contain",
                        width: "100%",
                        height: "95%",
                        alignContent: 'flex-start'
                    }}
                    source={{ uri: item.imageURL }}
                />
                <LinearGradient
                    style={{
                        position: 'absolute',
                        height: "100%",
                        width: "100%",
                    }}
                    locations={[0.7, 1]}
                    colors={['transparent', 'rgba(0, 0, 0, 0.4)']}
                />
                <View
                    style={{
                        position: 'absolute',
                        height: "100%",
                        width: "100%",
                        justifyContent: 'flex-end',
                        paddingHorizontal: 10,
                        paddingBottom: 12
                    }}>
                    <Text
                        style={{
                            fontSize: 27,
                            //fontWeight: 'bold',
                            color: 'white',
                            textShadowColor: 'gray',
                            textShadowOffset: { width: 0.7, height: 0.7 },
                            textShadowRadius: 4,
                            marginBottom: 5
                        }}>
                        {item.title}
                    </Text>
                    <Text
                        style={{
                            fontSize: 21,
                            color: 'rgba(255, 255, 255, 0.8)',
                            textShadowColor: 'gray',
                            textShadowOffset: { width: 0.7, height: 0.7 },
                            textShadowRadius: 2,
                        }}>
                        Brand Name
                    </Text>
                </View>
            </View>
        )
    }

    function Stack() {
        return (
            <View style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                //justifyContent: 'center'
            }}>
                {(remaining.length > 1) &&
                    <View
                        style={{
                            width: cardWidth,
                            height: cardHeight,
                            backgroundColor: 'white',
                            borderRadius: cardBorderRadius,
                            position: 'absolute'
                        }}>
                        <Card item={remaining[1]} />
                    </View>}
                {remaining.length > 0 &&
                    <Animated.View
                        {...panResponder.current.panHandlers}
                        style={{
                            width: cardWidth,
                            height: cardHeight,
                            backgroundColor: 'white',
                            borderRadius: cardBorderRadius,
                            transform: [
                                { rotateZ },
                                { translateX: x },
                                { translateY: y },
                            ]
                        }}>
                        <Card item={remaining[0]} />
                    </Animated.View>}
            </View>
        )
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: 'center',
                marginTop: 40,
                //justifyContent: 'center',
                backgroundColor: colors.background
            }}>
            <View
                style={{
                    width: cardWidth,
                    height: cardHeight,
                    borderColor: 'white',
                    borderWidth: 0.7,
                    borderRadius: cardBorderRadius,
                    position: 'absolute',
                    alignContent: 'center',
                    justifyContent: 'center'
                }}>
                <Text style={{
                    fontSize: 18,
                    color: colors.antiBackground
                }}>
                    That's all we got!
                </Text>
            </View>
            <Stack />
            <View style={{
                position: 'absolute',
                width: "75%",
                justifyContent: 'space-between',
                alignContent: 'center',
                flexDirection: "row",
                bottom: 30,
                alignSelf: 'center'

            }}>
                <TouchableOpacity
                    onPress={swipedLeft}>
                    <Image source={require('../assets/pass.png')} resizeMode='contain' style={{
                        width: 80, height: 80
                    }} />
                </TouchableOpacity>
                <Image source={require('../assets/checkall.png')} resizeMode='contain' style={{
                    width: 80, height: 80
                }} />
                <TouchableOpacity
                    onPress={swipedRight}>
                    <Image source={require('../assets/check.png')} resizeMode='contain' style={{
                        width: 80, height: 80
                    }} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default SwipeScreen;