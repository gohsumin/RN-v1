import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import Modal from "react-native-modal";
import AppContext from '../../../data/AppContext';
import { firebaseApp } from '../../../data/firebase';
import { arrayUnion, collection, doc, getDocs, getFirestore, increment, orderBy, query, setDoc, Timestamp, updateDoc, where } from "firebase/firestore";
import ThemeContext from '../../../data/ThemeContext';
import { getElapsedTime } from "../../../helpers/postsHelpers";
import { AntDesign } from '@expo/vector-icons';
import { Link } from 'react-router-native';

function Story({ startTime, endTime, data, closeStory, navigation, countDownTransitioning }) {

    const [tapX, setTapX] = useState();

    const isOpen = (data != null);
    const [ready, setReady] = useState(false);
    const [noPosts, setNoPosts] = useState(false);
    const [stories, setStories] = useState(null);
    const [index, setIndex] = useState(null);
    const [barLength, setBarLength] = useState();

    const { theme } = useContext(AppContext);
    const logger = useContext(AppContext).uid;
    const colors = useContext(ThemeContext).colors[theme];
    const imageSideLength = Dimensions.get("window").width * 0.9;
    const padding = 10;
    const popUpWidth = Dimensions.get("window").width * 0.9;

    const db = getFirestore(firebaseApp);

    useEffect(() => {
        if (isOpen) {
            getStories().then(stories => {
                if (stories && (stories.length > 0)) {
                    setStories(stories);
                    setIndex(0);
                    const numSpaces = stories.length - 1;
                    const spaceWidth = 1.7;
                    const bl = (Dimensions.get("window").width * .9 - numSpaces * spaceWidth) / stories.length;
                    setBarLength(bl);
                    setReady(true);
                    backendUpdatesAfterOpening().then(() => { });
                }
                else {
                    setNoPosts(true);
                    backendUpdatesAfterOpening().then(() => { });
                }
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
            if (tapX - popUpWidth / 2 > 0) {
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
                dataToSet.followersTapped = arrayUnion(logger);
                updateDoc(postRef, dataToSet).then(() => { });
            }
        })
    }

    async function backendUpdatesAfterOpening() {
        const activityRef = doc(collection(doc(collection(db, "User-Activity"), logger), "Activity"), "Home");
        let dataToSet = {};
        dataToSet[data.uid] = {
            lastTapped: Timestamp.now(),
            numTapped: increment(1)
        }
        await setDoc(activityRef, dataToSet, { merge: true });
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
                top: 35,
                right: "5%",
                flexDirection: "row",
                alignItems: "center"
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
                top: 20,
                height: 3,
                width: "90%",
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                {[...new Array(stories.length)].map((item, i) => {
                    return (
                        <View key={i}
                            style={{
                                width: barLength,
                                height: "100%",
                                borderRadius: 1.5,
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
                justifyContent: "flex-end",
                alignItems: "center",
                // borderWidth: 1, borderColor: "white"
            }}
            onSwipeComplete={onExitRequested}>
            {noPosts && <NoPosts />}

            {/* background you can tap to exit */}
            {ready &&
                <TouchableOpacity style={{
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    borderTopLeftRadius: 22,
                    borderTopRightRadius: 22,
                    backgroundColor: "rgba(0, 0, 0, 1)",
                    // borderWidth: 1, borderColor: "red"
                }} activeOpacity={1}
                    onPress={() => { onExitRequested(); }}>

                    {/* Wrapper around story to listen for tap location */}
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={(event) => {
                            setTapX(event.nativeEvent.locationX);
                        }}>

                        {/* Story itself with the rounded border */}
                        <View style={{
                            width: popUpWidth,
                            borderRadius: 16,
                            backgroundColor: colors.background,
                            borderWidth: 0.5,
                            borderColor: colors.background3,
                            paddingBottom: padding,
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
                                <View style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}>
                                    <TouchableOpacity style={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: 28,
                                    }} activeOpacity={1}
                                    // onPress={() => {
                                    // onExitRequested();
                                    // navigation.navigate("Profile", { uid: data.uid });
                                    // }}
                                    >
                                        <Image source={{ uri: data.userImageURL }}
                                            style={{
                                                width: 56,
                                                height: 56,
                                                borderRadius: 28,
                                            }} />
                                    </TouchableOpacity>
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
                                {/* <Octicons name="kebab-horizontal" size={20} color={colors.text1} /> */}
                            </View>

                            {/* Item image */}
                            <View style={{
                                width: imageSideLength,
                                height: imageSideLength,
                                // borderRadius: 15,
                                backgroundColor: "white",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Image style={{
                                    width: imageSideLength - 35,
                                    height: imageSideLength - 35,
                                }}
                                    source={{ uri: stories[index].itemImageURL }}
                                    resizeMode='contain' />
                            </View>

                            {/* Bottom row */}
                            <View style={{
                                flexDirection: "row",
                                width: "90%",
                                alignSelf: "center",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                marginHorizontal: padding,
                                marginTop: padding,
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
                    </TouchableOpacity>
                </TouchableOpacity>}

            {(ready && (stories.length > 0)) && <TopBar index={index} />}
            {(ready || noPosts) && <Exit />}

            {((ready || noPosts) && countDownTransitioning) &&
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
        </Modal>
    )
}

export default Story