import React, { useContext, useEffect, useRef } from "react";
import {
    View,
    Image,
    Dimensions,
    Animated,
    PanResponder,
    Text,
    SafeAreaView,
    TouchableOpacity
} from "react-native";
import ThemeContext from "../../data/ThemeContext";
import SwipeCardsContext from "../../data/SwipeCardsContext";
import { LinearGradient } from 'expo-linear-gradient';
import AppContext from '../../data/AppContext';
import { useHeaderHeight } from '@react-navigation/stack';
import { firebase } from '../../data/firebase';
import "firebase/firestore";

function SwipeScreen({ navigation }) {

    const theme = React.useContext(AppContext).theme;
    const colors = React.useContext(ThemeContext).colors[theme];

    const SCREEN_HEIGHT = Dimensions.get('window').height;
    const SCREEN_WIDTH = Dimensions.get('window').width;
    const headerHeight = useHeaderHeight();

    const margin = 15;

    const iconWidth = (SCREEN_WIDTH - margin * 4) / 3;
    const iconHeight = 60;

    const cardHeight = SCREEN_HEIGHT - headerHeight - 3 * margin - iconHeight;
    const cardWidth = SCREEN_WIDTH - margin * 2;
    const cardBorderRadius = 10;

    // source: https://snack.expo.io/EDMIVjbyq
    const α = Math.PI / 12;

    const snapThreshold = 220;
    const { Value } = Animated;

    // user object for the current user
    const user = useContext(AppContext).user;

    // pops the first item off the remaining array context
    const popRemaining = useContext(SwipeCardsContext).popRemaining;

    // remaining cards context
    const remaining = useContext(SwipeCardsContext).remaining;

    //const [index, setIndex] = useState(0);
    const index = useRef(0);

    useEffect(() => {
        if (Object.keys(remaining).length === 0) {
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
        const key = Object.keys(remaining)[index.current];
        const swipedCard = remaining[key];
        // pop the top of the context stack
        popRemaining(key);
        firestore.collection('Posts').doc(swipedCard.id).update({
            type: 2
        })
        index.current++;
        if (index === Object.keys(remaining).length) {
            navigation.goBack();
        }
    }

    const swipedRight = () => {
        const key = Object.keys(remaining)[index.current];
        const swipedCard = remaining[key];
        // pop the top of the context stack
        popRemaining(key);
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
        //addPost(newPost);
        firestore.collection('Posts').doc(swipedCard.id).update({
            type: 1
        })
        if (index === Object.keys(remaining).length) {
           //console.log("it is the last card");
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
            if (dx < -snapThreshold) {
                x.setValue(0);
                y.setValue(0);
                swipedLeft();
            }
            if (dx > snapThreshold) {
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
                        height: "90%",
                        alignContent: 'flex-start'
                    }}
                    source={{ uri: item.itemImageURL }}
                />
                <LinearGradient
                    style={{
                        position: 'absolute',
                        height: "100%",
                        width: "100%",
                    }}
                    locations={[0.7, 1]}
                    colors={['transparent', 'rgba(15, 0, 0, 0.5)']}
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
                            fontSize: 28,
                            //fontWeight: 'bold',
                            color: 'white',
                            textShadowColor: 'gray',
                            textShadowOffset: { width: 0.7, height: 0.7 },
                            textShadowRadius: 4,
                            marginBottom: 4
                        }}>
                        {item.itemName}
                    </Text>
                    <Text
                        style={{
                            fontSize: 21,
                            color: 'rgba(255, 255, 255, 0.8)',
                            textShadowColor: 'gray',
                            textShadowOffset: { width: 0.7, height: 0.7 },
                            textShadowRadius: 2,
                        }}>
                        {item.storeName}
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
                {Object.keys(remaining).slice(0).reverse().map((key, index) => {
                    return (<Animated.View
                        {...panResponder.current.panHandlers}
                        style={{
                            position: 'absolute',
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
                        <Card item={remaining[key]} />
                    </Animated.View>)
                })}
            </View>
        )
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: 'center',
                marginTop: margin,
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
            </View>
            <Stack />
            <View style={{
                position: 'absolute',
                width: SCREEN_WIDTH - margin * 2,
                justifyContent: 'space-between',
                alignContent: 'center',
                flexDirection: "row",
                bottom: margin,
                alignSelf: 'center',

            }}>
                <TouchableOpacity
                    onPress={swipedLeft}>
                    <Image source={require('../../assets/pass.png')} resizeMode='contain' style={{
                        width: iconWidth, height: iconHeight,
                    }} />
                </TouchableOpacity>
                <Image source={require('../../assets/checkall.png')} resizeMode='contain' style={{
                    width: iconWidth, height: iconHeight,
                }} />
                <TouchableOpacity
                    onPress={swipedRight}>
                    <Image source={require('../../assets/check.png')} resizeMode='contain' style={{
                        width: iconWidth, height: iconHeight,
                    }} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default SwipeScreen;