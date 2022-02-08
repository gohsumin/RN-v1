import React from 'react';
import { View } from 'react-native';

function OtherUserPosts() {

    return (
        <View style={{
            width: 200,
            height: 100,
            backgroundColor: "yellow"
        }} />
    )
}

export default OtherUserPosts;

// import React, { useState, useContext, useCallback, useRef } from "react";
// import { View, Text, useWindowDimensions } from "react-native";
// import { FlatList } from "react-native-gesture-handler";
// import FeedItem from "../../feed/components/FeedItem";
// import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
// import AppContext from "../../../data/AppContext";
// import Badge from "../../web/components/Badge";
// import ProfileTop from "./ProfileTop";
// import { firebase } from '../../../data/firebase';
// const firestore = firebase.firestore();

// function OtherUserPosts({
//     updateToggle,
//     userFeed,
//     width,
//     topHeight,
//     setTopHeight,
//     isUser,
//     userData,
//     setUserData,
//     navigate,
//     height,
//     setStickyHeaderOpacity,
//     setIsStickyHeaderExpanded,
//     onEndReached,
//     loadRequested
// }) {

//     const { platform } = useContext(AppContext);
//     const window = useWindowDimensions();
//     const tabBarHeight = platform === "web" ? 0 : useBottomTabBarHeight();
//     const viewedList = useRef([]);
//     const [postHeight, setPostHeight] = useState(0);

//     const renderSeparator = () => {
//         return (
//             <View
//                 style={{
//                     height: 0.4,
//                     width: width * 0.92,
//                     marginVertical: 10,
//                     backgroundColor: "#808080",
//                     opacity: 0,
//                     alignSelf: "center",
//                 }}
//             />
//         );
//     };

//     const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
//         const paddingToBottom = 20;
//         return layoutMeasurement.height + contentOffset.y >=
//             contentSize.height - paddingToBottom;
//     };

//     const distanceToStickyHeader = ({ contentOffset }) => {
//         // positive: distance remaining from top; negative: distance remaining from bottom
//         const currentOffset = contentOffset.y - topHeight;
//         return currentOffset;
//     };

//     function incrementViews(postID) {
//         const db = firestore.collection("Posts").doc(postID);
//        //console.log("id (post ID): " + postID);
//         db.get().then((doc) => {
//             const d = doc.data();
//             if ("numViews" in d) {
//                 db.update({ numViews: d.numViews + 1 }).then(() => {
//                    //console.log("Updated views to " + (d.numViews + 1));
//                 }).catch((error) => { console.log(error); });
//             }
//             else {
//                 db.update({ numViews: 1 }).then(() => {
//                    //console.log("Set views to  " + 1);
//                 }).catch((error) => { console.log(error); });
//             }
//         }).catch((error) => { console.log(error) });
//     }

//     const onViewableItemsChangedx = useCallback(({ changed }) => {
//        //console.log("onViewableItemsChangedx");
//         changed.forEach(({ item, isViewable }) => {
//             if (isViewable && !viewedList.current.includes(item.id)) {
//                 viewedList.current = [...viewedList.current, item.id];
//                 incrementViews(item.id);
//             }
//         })
//     }, []);

//     const onViewableItemsChanged = useRef(({ changed }) => {
//        //console.log("onViewableItemsChanged");
//         changed.forEach(({ item, isViewable }) => {
//             if (isViewable && !viewedList.current.includes(item.id)) {
//                 viewedList.current = [...viewedList.current, item.id];
//                 incrementViews(item.id);
//             }
//         })
//     })

//     return (
//         <View
//             style={{
//                 width: window.width,
//                 height: window.height,
//                 alignSelf: "center",
//                 // borderWidth: 1,
//                 // borderColor: "blue"
//             }}>
//             {userFeed.length === 0 ?
//                 <View style={{
//                     width: "100%",
//                     alignItems: "center"
//                 }} >
//                     <ProfileTop
//                         topHeight={topHeight}
//                         setTopHeight={setTopHeight}
//                         userData={userData}
//                         isUser={isUser}
//                         setUserData={setUserData}
//                         navigate={navigate} />
//                     <View style={{
//                         height: height,
//                         alignItems: "center",
//                         justifyContent: "center",
//                     }} >
//                         <Text style={{
//                             color: "#777",
//                             fontSize: 15,
//                         }}>
//                             No posts yet :(
//                         </Text>
//                     </View>
//                     <View style={{
//                         position: "absolute",
//                         width: width,
//                         bottom: (width < 685 ? 5 : 15) + tabBarHeight,
//                         alignItems: "flex-end"
//                     }} >
//                         <Badge />
//                     </View>
//                 </View> :
//                 <FlatList
//                     onScroll={({ nativeEvent }) => {
//                         if (!loadRequested && isCloseToBottom(nativeEvent)) {
//                             onEndReached();
//                         }
//                         const threshhold = 80;
//                         const d = distanceToStickyHeader(nativeEvent);
//                         if (d < -threshhold) {
//                             setStickyHeaderOpacity(0);
//                         }
//                         else if (d < 0) {
//                             setIsStickyHeaderExpanded(false);
//                             setStickyHeaderOpacity((threshhold + d) / threshhold);
//                         }
//                         else {
//                             setStickyHeaderOpacity(1);
//                         }
//                     }}
//                     scrollEventThrottle={5}
//                     onViewableItemsChanged={onViewableItemsChanged.current}
//                     viewabilityConfig={{
//                         itemVisiblePercentThreshold: 80,
//                         minimumViewTime: 800,
//                     }}
//                     getItemLayout={(data, index) => (
//                         { length: postHeight, offset: postHeight * index, index }
//                     )}
//                     data={userFeed}
//                     extraData={updateToggle}
//                     numColumns={1}
//                     renderItem={({ item }) =>
//                         <View style={{
//                             // borderWidth: 1, borderColor: "cyan",
//                             alignItems: "center"
//                         }}
//                             onLayout={(event) => {
//                                 setPostHeight(event.nativeEvent.layout.height);
//                             }} >
//                             <FeedItem
//                                 item={item}
//                                 navigateToProfile={() => { }}
//                                 setting={'other'}
//                                 width={width}
//                             />
//                         </View>
//                     }
//                     keyExtractor={(item) => item.id.toString()}
//                     ItemSeparatorComponent={renderSeparator}
//                     ListHeaderComponent={
//                         <ProfileTop
//                             topHeight={topHeight}
//                             setTopHeight={setTopHeight}
//                             userData={userData}
//                             isUser={isUser}
//                             setUserData={setUserData}
//                             navigate={navigate} />
//                     }
//                     ListFooterComponent={
//                         <View style={{
//                             width: width,
//                             marginTop: 35,
//                             marginBottom: 15 + tabBarHeight,
//                             alignItems: "flex-end",
//                             alignSelf: "center",
//                             // borderWidth: 1,
//                             // borderColor: "blue"
//                         }} >
//                             <Badge />
//                         </View>}
//                 />}
//         </View>
//     )
// }

// function areEqual(prevProps, newProps) {
//     return prevProps.updateToggle === newProps.updateToggle &&
//         prevProps.height === newProps.height &&
//         prevProps.width === newProps.width;
// }

// export default React.memo(OtherUserPosts, areEqual);