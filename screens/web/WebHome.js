import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Image,
    Text,
    useWindowDimensions,
    FlatList,
    RefreshControl
} from 'react-native';
import AppContext from '../../data/AppContext';
import ThemeContext from '../../data/ThemeContext';
import logo_big from "../../assets/SoShNavLogo.png";
import WebSign from './components/WebSign';
import WebStory from './components/WebStory';
import WebDropCircle from "./components/WebDropCircle";
import { Helmet } from "react-helmet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseApp } from "../../data/firebase";
import { getFirestore, doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";

function WebHome({ navigation }) {

    const [ready, setReady] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [countDownTransitioning, setCountDownTransitioning] = useState(false);
    const [storyOpen, setStoryOpen] = useState(null);

    const [feed, setFeed] = useState({});
    const [feedOrder, setFeedOrder] = useState([]);
    const [dates, setDates] = useState();
    const [trigger, setTrigger] = useState(false);

    const db = getFirestore(firebaseApp);

    const { theme, uid } = useContext(AppContext);
    const colors = useContext(ThemeContext).colors[theme];
    const window = useWindowDimensions();
    const numColumns = 3;

    useEffect(() => {
        AsyncStorage.clear();
        getTimeAttributes().then((dates) => {
            setDates(dates);
            getFeedOutline(dates).then(({ feedArr, feedObj }) => {
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
            getFeedOutline(dates).then(({ feedArr, feedObj }) => {
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

    async function getActivityData() {
        try {
            const data = await AsyncStorage.getItem('@activity_data');
            return data != null ? JSON.parse(data) : null;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }

    async function getFeedOutline(dates) {
        const activityData = await getActivityData();
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
            <WebDropCircle
                data={data}
                index={index}
                setStoryOpen={() => {
                    setStoryOpen(item.userID);
                }}
            />
        )
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.background
        }}>
            <Helmet>
                <meta property='og:title' content='SOSH WORLD' />
                <meta property='og:image' content='https://www.soshworld.com/static/media/SoShNavLogo.4e45a847.png' />
                <meta property='og:description' content='Follow what your favorite influencers are buying.' />
                <meta property='og:url' content='https://www.soshworld.com/' />
            </Helmet>
            {ready && <View style={{
                flex: 1,
                alignItems: "center",
                width: "100%",
                height: "100%",
                // borderWidth: 1, borderColor: "salmon"
            }}>
                <WebSign
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
                        width: 350,
                        alignSelf: "center",
                        paddingTop: 20,
                        paddingHorizontal: 10,
                    }}
                />
                <WebStory
                    startTime={dates.prevPrevDrop}
                    endTime={dates.prevDrop}
                    data={(storyOpen != null) ? feed[storyOpen] : null}
                    closeStory={closeStory}
                    navigation={navigation}
                    countDownTransitioning={countDownTransitioning}
                />
            </View>}
        </View>)
}

export default WebHome;