import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Image, Linking, Text, TouchableOpacity, View, Share, useWindowDimensions } from 'react-native';
import Modal from "react-native-modal";
import AppContext from '../../../data/AppContext';
import { firebaseApp } from '../../../data/firebase';
import { arrayUnion, collection, doc, getDocs, getFirestore, increment, orderBy, query, setDoc, Timestamp, updateDoc, where } from "firebase/firestore";
import ThemeContext from '../../../data/ThemeContext';
import { getElapsedTime } from "../../../helpers/postsHelpers";
import { AntDesign, Octicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

function WebStory({ startTime, endTime, data, closeStory, navigation, countDownTransitioning }) {

    const [tapX, setTapX] = useState();

    const isOpen = (data != null);
    const [ready, setReady] = useState(false);
    const [noPosts, setNoPosts] = useState(false);
    const [stories, setStories] = useState(null);
    const [index, setIndex] = useState(null);
    const [styles, setStyles] = useState(null);
    const [barLength, setBarLength] = useState(null);
    const { theme } = useContext(AppContext);
    const logger = useContext(AppContext).uid;
    const colors = useContext(ThemeContext).colors[theme];

    const db = getFirestore(firebaseApp);

    useEffect(() => {
        if (isOpen) {
            getStories().then(stories => {
                if (stories && (stories.length > 0)) {
                    setStories(stories);
                    setIndex(0);
                    setStyles(getStyles(Dimensions.get("window").width));
                    const numSpaces = stories.length - 1;
                    const spaceWidth = 5;
                    const bl = (Dimensions.get("window").width - numSpaces * spaceWidth) / stories.length;
                    setBarLength(bl);
                    setReady(true);
                }
                else {
                    setStyles(getStyles(Dimensions.get("window").width));
                    setNoPosts(true);
                }
                backendUpdatesAfterOpening().then(() => { });
            })
        }
        else {
            setReady(false);
        }
    }, [data]);

    useEffect(() => {
        if (ready) {
            // note: index is the previous index
            // tapped on right
            if (tapX > styles.imageSideLength) {
                if (index + 2 < stories.length) {
                    setIndex(index + 1);
                }
                // tapped beyond the last post => close!
                else if (index + 1 === stories.length) {
                    onExitRequested();
                }
                // got to the last index
                else {
                    setIndex(index + 1);
                }
            }
            // tapped on left
            else {
                if (index > 0) {
                    setIndex(index - 1);
                }
            }
        }
    }, [tapX]);

    useEffect(() => {
        if (ready) {
            postViewed().then(() => { });
        }
    }, [index]);

    useEffect(() => {
        const updateStyles = () => {
            setStyles(getStyles(Dimensions.get("window").width));
        }
        window.addEventListener('resize', updateStyles);
        return () => window.removeEventListener("resize", updateStyles);
    }, []);

    const getStyles = (width) => {
        let stylesObj = {};

        stylesObj.padding = 10;

        switch (true) {
            case width > 1100:
                stylesObj.imageSideLength = width * 0.4;
                stylesObj.popUpWidth = width * 0.4;
                break;
            case width > 1000:
                stylesObj.imageSideLength = width * 0.5;
                stylesObj.popUpWidth = width * 0.5;
                break;
            case width > 800:
                stylesObj.imageSideLength = width * 0.5;
                stylesObj.popUpWidth = width * 0.5;
                break;
            case width > 500:
                stylesObj.imageSideLength = width * 0.5;
                stylesObj.popUpWidth = width * 0.5;
                break;
            case width > 400:
                stylesObj.imageSideLength = width * 0.7;
                stylesObj.popUpWidth = width * 0.7;
                break;
            case width > 350:
                stylesObj.imageSideLength = width * 0.8;
                stylesObj.popUpWidth = width * 0.8;
                break;
            default:
                stylesObj.imageSideLength = width * 0.9;
                stylesObj.popUpWidth = width * 0.9;
                break;
        }
        return stylesObj;
    }

    async function postViewed() {
        const story = stories[index];
        const postRef = doc(db, "Posts", story.postID);
        await updateDoc(postRef, { numViews: increment(1) });
    }

    function buyButtonPressed() {
        const story = stories[index];
        Linking.canOpenURL(story.itemURL).then(supported => {
            if (supported) {
                Linking.openURL(story.itemURL);
                const postRef = doc(db, "Posts", story.postID);
                let dataToSet = {};
                dataToSet.numBought = increment(1);
                updateDoc(postRef, dataToSet).then(() => { });
            }
        })
    }

    async function backendUpdatesAfterOpening() {
        let dataToSet = await getActivityData();
        dataToSet[data.uid] = {
            lastTapped: Timestamp.now(),
            numTapped: (dataToSet[data.uid] && dataToSet[data.uid].numTapped) ?
                dataToSet[data.uid].numTapped + 1 :
                1
        }
        await AsyncStorage.setItem('@activity_data', JSON.stringify(dataToSet));
    }

    async function getStories() {
        const storiesSnapshot = await getDocs(
            query
                (collection(db, "Posts"),
                    where("userID", "==", data.uid),
                    where("dateApproved", ">=", startTime),
                    orderBy("dateApproved", "desc")));
        let storyArr = [];
        storiesSnapshot.forEach((story) => {
            let obj = story.data();
            obj.postID = story.id;
            storyArr.push(obj);
        })
        return storyArr;
    }

    function onExitRequested() {
        setReady(false);
        setNoPosts(false);
        closeStory();
    }

    async function getActivityData() {
        try {
            const data = await AsyncStorage.getItem('@activity_data');
            return data != null ? JSON.parse(data) : {};
        }
        catch (e) {
            console.log(e);
            return {};
        }
    }

    const onShare = async (userName) => {
        try {
            const result = await Share.share({
                message:
                    'SOSH  |  Shop like ' + userName,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    function NoPosts() {
        return (
            <View style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.background
            }}>
                <TouchableOpacity style={{
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    marginBottom: 10
                }} activeOpacity={1}
                // onPress={() => {
                //     onExitRequested();
                //     navigation.navigate("Profile", { uid: data.uid });
                // }}
                >
                    <Image source={{ uri: data.userImageURL }}
                        style={{
                            width: 56,
                            height: 56,
                            borderRadius: 28,
                        }} />
                </TouchableOpacity>
                <Text style={{
                    color: colors.text2,
                    fontSize: 15
                }} >
                    {data.userName} didn't post this week.
                </Text>
            </View>
        )
    }

    function Exit() {
        return (
            <View style={{
                position: "absolute",
                top: 15,
                width: styles.popUpWidth,
                flexDirection: "row",
                justifyContent: "flex-end"
            }}>
                <Text style={{
                    color: "#454545",
                    marginRight: 9,
                    textAlign: "right",
                    fontSize: 13,
                    fontWeight: "bold",
                }}>
                    {"Authentic Purchase ✓\nverified by sosh©"}
                </Text>
                <TouchableOpacity
                    onPress={onExitRequested}>
                    <AntDesign name="closecircleo" size={23} color={"#454545"} />
                </TouchableOpacity>
            </View>
        )
    }

    function TopBar({ index }) {
        return (
            <View style={{
                position: "absolute",
                top: 0,
                left: 0, right: 0,
                height: 5,
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
            }}>
                {[...new Array(stories.length)].map((item, i) => {
                    return (
                        <View key={i}
                            style={{
                                width: barLength,
                                height: "100%",
                                backgroundColor: (i <= index) ? colors.green : colors.text1,
                            }} />
                    )
                })}
            </View>
        )
    }

    return (
        <Modal
            isVisible={isOpen}
            statusBarTranslucent={true}
            animationIn={"slideInUp"}
            animationOut={"slideOutDown"}
            swipeDirection={"down"}
            style={{
                margin: 0,
                width: "100%",
                borderColor: "yellow", borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
            }}
            onSwipeComplete={onExitRequested}>

            {/* background you can tap to exit */}
            <TouchableOpacity style={{
                margin: 0,
                width: "100%",
                height: "100%",
                borderWidth: 1, borderColor: "green",
                justifyContent: "center",
                alignItems: "center",
            }} activeOpacity={1}
                onPress={onExitRequested}>

                {(noPosts && styles) &&
                    /* this TouchableOpacity blocks the outer TouchableOpacity */
                    <TouchableOpacity activeOpacity={1} onPress={() => { }}
                        style={{
                            width: styles.popUpWidth,
                            height: "80%",
                            borderRadius: 20,
                            overflow: "hidden",
                            borderWidth: 1, borderColor: "white"
                        }}>
                        <NoPosts />
                    </TouchableOpacity>}

                {(ready && styles) &&
                    /* wrapper around story to listen for tap location;
                       it also blocks the outer TouchableOpacity */
                    <TouchableOpacity
                        style={{
                            width: styles.popUpWidth,
                            borderRadius: 20,
                            overflow: "hidden",
                            borderWidth: 1, borderColor: "white"
                        }}>

                        {/* Story itself with the rounded border */}
                        <View style={{
                            width: "100%",
                            backgroundColor: colors.background,
                            paddingBottom: styles.padding,
                            alignItems: "center"
                        }}>

                            {/* Header row */}
                            <View style={{
                                flexDirection: "row",
                                width: "96%",
                                marginRight: 4,
                                alignSelf: "center",
                                justifyContent: "space-between",
                                // alignItems: "center",
                                paddingHorizontal: 12,
                                paddingVertical: 12,
                                // borderWidth: 1,borderColor:"salmon"
                            }}>
                                <Text style={{
                                    color: "cyan"
                                }}>
                                    {tapX}
                                </Text>
                                <View style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}>
                                    <View style={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: 28,
                                    }} activeOpacity={1}
                                    >
                                        <Image source={{ uri: data.userImageURL }}
                                            style={{
                                                width: 56,
                                                height: 56,
                                                borderRadius: 28,
                                            }} />
                                    </View>
                                    <View style={{
                                        flex: 1,
                                        justifyContent: "space-between",
                                        marginLeft: 10,
                                        marginRight: 5,
                                        // borderWidth:1,borderColor:"salmon"
                                    }}>
                                        <Text style={{
                                            color: colors.mainText,
                                            fontWeight: "bold",
                                            fontSize: 17,
                                            marginBottom: 1
                                        }}>
                                            {data.userName + " bought:"}
                                        </Text>
                                        <Text style={{
                                            color: colors.text4,
                                            fontSize: 14,
                                        }}
                                            numberOfLines={1}>
                                            {stories[index].itemName}
                                        </Text>
                                        <Text style={{
                                            color: colors.text4,
                                            fontSize: 14,
                                            textAlignVertical: 'center',
                                        }}>
                                            {getElapsedTime(stories[index].dateApproved.seconds)}
                                            <Text style={{ fontSize: 12 }}>{" • "}</Text>
                                            {"from " + stories[index].storeName}
                                        </Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={{
                                        width: 30,
                                        height: 20,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        // borderWidth: 1, borderColor: "white"
                                    }}
                                    onPress={() => {
                                        onShare(data.userName);
                                    }}>
                                    <Octicons name="kebab-horizontal" size={20} color={colors.text1} />
                                </TouchableOpacity>
                            </View>

                            {/* Item image */}
                            <TouchableOpacity style={{
                                width: styles.imageSideLength,
                                height: styles.imageSideLength,
                                // borderRadius: 15,
                                backgroundColor: "white",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                            activeOpacity={1.0}
                            onPress={(event) => {
                                setTapX(event.nativeEvent.locationX);
                            }}>
                                <Image style={{
                                    width: styles.imageSideLength - 30,
                                    height: styles.imageSideLength - 30,
                                }}
                                    source={{ uri: stories[index].itemImageURL }}
                                    resizeMode='contain' />
                            </TouchableOpacity>

                            {/* Bottom row */}
                            <View style={{
                                flexDirection: "row",
                                width: "90%",
                                alignSelf: "center",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                marginHorizontal: styles.padding,
                                marginTop: styles.padding,
                                // borderWidth: 1, borderColor: "green"
                            }}>
                                <Text style={{
                                    flex: 1,
                                    fontSize: 14,
                                    // fontWeight: "bold",
                                    color: colors.text4,
                                    textAlign: "right",
                                    marginRight: 8,
                                    marginVertical: 3
                                }}>
                                    {stories[index].numBought + " follower" + (stories[index].numBought === 1 ? "" : "s") + "\nwent to buy"}
                                </Text>
                                <TouchableOpacity style={{
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    borderRadius: 12,
                                    backgroundColor: colors.green
                                }} onPress={buyButtonPressed}>
                                    <Text style={{
                                        color: "black",
                                        fontWeight: "bold",
                                        fontSize: 18,
                                        marginBottom: 1
                                    }}>
                                        Buy
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </TouchableOpacity>}

                {((ready || noPosts) && styles) && <Exit />}

                {((ready || noPosts) && countDownTransitioning && styles) &&
                    <View style={{
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: colors.background
                    }}>
                        <Text style={{
                            fontSize: 30,
                            color: colors.signGreen,
                            fontWeight: "bold"
                        }}>
                            New posts just dropped!
                        </Text>
                    </View>}

            </TouchableOpacity>

            {(ready && (stories.length > 0) && styles) && <TopBar index={index} />}

        </Modal>
    )
}

export default WebStory;