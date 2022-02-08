import React, { useState, useEffect, useRef } from "react";
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    useWindowDimensions,
    RefreshControl
} from "react-native";
import AppContext from "../../data/AppContext";
import ThemeContext from "../../data/ThemeContext";
import { firebaseApp } from '../../data/firebase';
import { getFirestore, doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import DropCircle from "./components/DropCircle";
import { FlatList } from "react-native-gesture-handler";
import Story from "./components/Story";
import Sign from "./components/Sign";

const AppHome = ({ navigation, route }) => {

    const [message, setMessage] = useState("initial message");

    const [ready, setReady] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [countDownTransitioning, setCountDownTransitioning] = useState(false);
    const [storyOpen, setStoryOpen] = useState(null);

    const [feed, setFeed] = useState({});
    const [feedOrder, setFeedOrder] = useState([]);
    const [dates, setDates] = useState();
    const [trigger, setTrigger] = useState(false);

    const db = getFirestore(firebaseApp);

    const { theme, uid } = React.useContext(AppContext);
    const colors = React.useContext(ThemeContext).colors[theme];
    const window = useWindowDimensions();
    const numColumns = 3;

    useEffect(() => {
        getTimeAttributes().then((dates) => {
            setDates(dates);
            getFeedOutline(dates).then(({feedArr, feedObj}) => {
                [...Array(feedArr.length % numColumns)].forEach(() => {
                    feedArr.push("filler");
                })
                setFeedOrder(feedArr);
                setFeed(feedObj);
                setReady(true);
            });
        });
    }, []);

    function refreshDataWithTime() {
        getTimeAttributes().then((dates) => {
            setDates(dates);
            getFeedOutline(dates).then(({feedArr, feedObj}) => {
                [...Array(feedArr.length % numColumns)].forEach(() => {
                    feedArr.push("filler");
                })
                setFeedOrder(feedArr);
                setFeed(feedObj);
                setTrigger(!trigger);
            });
        });
    }

    function countDownTransition() {
        setCountDownTransitioning(true);
        refreshDataWithTime();
        setTimeout(() => {
            setCountDownTransitioning(false);
        }, 1300);
    }

    async function getFeedOutline(dates) {
        let activityData = null;
        const activityRef = doc(collection(doc(collection(db, "User-Activity"), uid), "Activity"), "Home");
        const activitySnapshot = await getDoc(activityRef);
        if (activitySnapshot.exists) {
            activityData = activitySnapshot.data();
        }
        var feedObj = {};
        var unclearedIdArr = [];
        var clearedIdArr = [];
        const profilesQuery = query(collection(db, "User-Profile"), where("isSpecial", "==", true));
        const profileSnapshot = await getDocs(profilesQuery);
        profileSnapshot.forEach(profileDoc => {
            const data = {
                uid: profileDoc.id,
                userName: profileDoc.data().userName,
                userImageURL: profileDoc.data().userImageURL,
            };
            if (activityData != null && Object.keys(activityData).includes(profileDoc.id)) {
                const lastTapped = new Date(activityData[profileDoc.id].lastTapped.seconds * 1000);
                if (lastTapped >= dates.prevDrop) {
                    clearedIdArr.push({ userID: profileDoc.id, numTapped: activityData[profileDoc.id].numTapped });
                    feedObj[profileDoc.id] = { ...data, clearedThisWeek: true };
                }
                else {
                    unclearedIdArr.push({ userID: profileDoc.id, numTapped: activityData[profileDoc.id].numTapped });
                    feedObj[profileDoc.id] = { ...data, clearedThisWeek: false };
                }
            }
            else {
                unclearedIdArr.push({ userID: profileDoc.id, numTapped: 1 });
                feedObj[profileDoc.id] = { ...data, clearedThisWeek: false };
            }
        });
        unclearedIdArr.sort((a, b) => b.numTapped - a.numTapped);
        clearedIdArr.sort((a, b) => b.numTapped - a.numTapped);
        const feedArr = unclearedIdArr.concat(clearedIdArr);
        return { feedArr: feedArr, feedObj: feedObj };
    }

    async function getTimeAttributes() {
        const HQRef = doc(collection(db, "SOSH"), "HQ");
        const snapshot = await getDoc(HQRef);
        let dropDateFromFirestore = snapshot.data().dropDate.seconds;
        const today = new Date().getTime() / 1000;
        // get dropDateFromFireStore + numberOfSecondsInAWeek * n so that it is just greater than today
        while (dropDateFromFirestore < today) {
            dropDateFromFirestore += 604800;
        }
        const dates = {
            nextDrop: new Date(1000 * dropDateFromFirestore),
            prevDrop: new Date(1000 * (dropDateFromFirestore - 604800)),
            prevPrevDrop: new Date(1000 * (dropDateFromFirestore - 2 * 604800)),
        }
        return dates;
    }

    function closeStory() {
        setStoryOpen(null);
        refreshDataWithTime();
    }

    function renderItem({ item, index }) {

        const data = (item === "filler") ? "filler" : feed[item.userID];
        return (
            <DropCircle
                data={data}
                index={index}
                setStoryOpen={() => {
                    setStoryOpen(item.userID);
                }}
            />
        )
    }

    return (
        <View style={{ flex: 1 }}>
            {/* <Text style={{ color: "red", width: "100%"}}>{message}</Text> */}
            {ready &&
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Sign
                        nextDrop={dates.nextDrop}
                        dateReached={countDownTransition} />
                    <FlatList
                        data={feedOrder}
                        extraData={trigger}
                        numColumns={numColumns}
                        renderItem={renderItem}
                        columnWrapperStyle={{
                            justifyContent: "space-between",
                            marginVertical: 10
                        }}
                        keyExtractor={(item, index) => item.userID}
                        refreshControl={
                            <RefreshControl
                                colors={['black', 'white']}
                                tintColor={'white'}
                                refreshing={refreshing}
                                onRefresh={refreshDataWithTime}
                            />
                        }
                        style={{
                            flex: 1,
                            width: "90%",
                            paddingTop: 20,
                            paddingHorizontal: 10,
                        }} />
                </View>}
            {ready && <Story
                startTime={dates.prevPrevDrop}
                endTime={dates.prevDrop}
                data={(storyOpen != null) ? feed[storyOpen] : null}
                closeStory={closeStory}
                navigation={navigation}
                countDownTransitioning={countDownTransitioning}
            />}
        </View>
    );
};

export default AppHome;
