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
    StyleSheet
} from "react-native";
import * as Expo from 'expo';
//import { DangerZone } from "expo";
import { Interactable } from 'react-native-redash';
import PostsContext from "../data/PostsContext";
import AppContext from "../data/AppContext";
import ThemeContext from "../data/ThemeContext";
import SwipeCardsContext from "../data/SwipeCardsContext";
import Icon from "react-native-vector-icons/Ionicons";
import { useHeaderHeight } from '@react-navigation/stack';

function SwipeScreen({ navigation }) {

    const theme = React.useContext(AppContext).theme;
    const colors = React.useContext(ThemeContext).colors[theme];

    const SCREEN_HEIGHT = Dimensions.get('window').height;
    const SCREEN_WIDTH = Dimensions.get('window').width;

    const cardBorderRadius = 10;

    // source: https://snack.expo.io/EDMIVjbyq
    const α = Math.PI / 12;
    const A = SCREEN_WIDTH * Math.cos(α) + SCREEN_HEIGHT * Math.sin(α);

    const snapThreshhold = 20;
    const {
        Value, Extrapolate, concat, interpolate
    } = Animated;

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
        console.log("index: "+index.current);
        isLastCard = remaining.length === 1;
        console.log("swiped right");
        const swipedCard = remaining[index.current];
        console.log("...on " + swipedCard.title);
        // pop the top of the context stack
        popRemaining();
        index.current++;
        // post item as prop to addPost
        const newPost = {
            user: swipedCard.user,
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
            x.setOffset(x._value);
            y.setOffset(y._value);
        },
        onPanResponderMove: (evt, { dx, dy }) => {
            x.setValue(dx);
            y.setValue(dy);
            return true;
        },
        onPanResponderRelease: (evt, { dx }) => {
            x.flattenOffset();
            y.flattenOffset();
            // swiped left
            if (dx < -snapThreshhold) {
                swipedLeft();
            }
            if (dx > snapThreshhold) {
                swipedRight();
            }
            x.setValue(0);
            y.setValue(0);
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
                    position: 'absolute'
                }}>
                <Image
                    style={{
                        resizeMode: "cover",
                        width: "100%",
                        height: "100%",
                    }}
                    source={{ uri: item.imageURL }}
                />
                <View
                    style={{
                        position: 'absolute',
                        height: "100%",
                        width: "100%",
                        justifyContent: 'flex-end',
                        paddingHorizontal: 10,
                        paddingBottom: 15
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

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
            
            {remaining.length > 1 ?
                (<View
                    style={{
                        width: "80%",
                        height: "65%",
                        backgroundColor: 'white',
                        borderRadius: cardBorderRadius,
                        position: 'absolute'
                    }}>
                    <Card item={remaining[1]} />
                </View>) :
                (<View
                    style={{
                        width: "80%",
                        height: "65%",
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
                </View>)}
            {remaining.length > 0 &&
                <Animated.View
                    {...panResponder.current.panHandlers}
                    style={{
                        width: "80%",
                        height: "65%",
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

            <View style={{
                position: 'absolute',
                width: "60%",
                justifyContent: 'space-between',
                alignContent: 'center',
                flexDirection: "row",
                bottom: 10,
                alignSelf: 'center'

            }}>
                <Icon name={"close"} color={colors.antiBackground} size={90}></Icon>
                <Icon name={"checkmark"} color={colors.antiBackground} size={90}></Icon>
            </View>
        </SafeAreaView>
    )
}

export default SwipeScreen;