import React from 'react';
import { View } from 'react-native';

function UserInfoBar() {

    return (
        <View style={{
            width: 200,
            height: 100,
            backgroundColor: "cyan"
        }} />
    )
}

export default UserInfoBar;

// import React, { useEffect, useState, useContext } from 'react';
// import {
//     Text,
//     View,
//     TouchableOpacity,
//     Platform,
// } from "react-native";
// import AppContext from "../../../data/AppContext";
// import ThemeContext from "../../../data/ThemeContext";
// import { firebase } from '../../../data/firebase';
// import { getDatabase, ref, child, get } from "firebase/database";
// import { getFunctions, httpsCallable } from "firebase/functions";
// import { showMessage } from "react-native-flash-message";

// function UserInfoBar({ userData, isUser }) {

//     const { theme, user, uid } = useContext(AppContext);
//     const colors = useContext(ThemeContext).colors[theme];

//     const spacing = 15;
//     const leftHeight = 28;

//     const functions = getFunctions();

//     var followUser = httpsCallable(functions, 'followUser');
//     var unFollowUser = httpsCallable(functions, 'unFollowUser');
//     const [buttonText, setButtonText] = useState("");
//     const [followable, setFollowable] = useState();

//     function follow() {
//         setButtonText("Unfollow");
//         followUser({
//             userID: userData.userID,
//         }).then(() => {
//             //console.log("after following");
//             setFollowable(false);
//         });
//     }

//     function unfollow() {
//         setButtonText("Follow");
//         unFollowUser({
//             userID: userData.userID
//         }).then(() => {
//             //console.log("after unfollowing");
//             setFollowable(true);
//         });
//     }

//     useEffect(() => {
//         if (isUser) {
//             setButtonText("Edit Profile");
//         }
//         else {
//             const dbRef = ref(getDatabase());
//             const path = "/User-Profile/" + uid + "/Following";
//             get(child(dbRef, path)).then(snapshot => {
//                 const res = snapshot.val();
//                 // check if the logged in user is following the profile
//                 if (res !== null && res[userData.userID] !== undefined) {
//                     setFollowable(false);
//                     setButtonText("Unfollow");
//                 }
//                 else {
//                     setFollowable(true);
//                     setButtonText("Follow");
//                 }
//             })
//         }
//     }, []);

//     const VerticalBar = () => {
//         return (
//             <View style={{
//                 height: leftHeight,
//                 width: 0,
//                 borderWidth: 0.28,
//                 borderColor: '#999',
//                 alignSelf: 'center'
//             }} />
//         )
//     }

//     return (
//         <View style={{
//             width: "95%",
//             height: 45,
//             alignContent: 'center',
//             alignSelf: 'center',
//             flexDirection: 'row',
//             justifyContent: 'center',
//             // borderWidth: 1,
//             // borderColor: 'salmon'
//         }}>

//             {/* first */}
//             <TouchableOpacity style={{
//                 marginRight: spacing,
//                 alignItems: 'center',
//                 justifyContent: 'space-evenly',
//                 // borderColor: 'pink',
//                 // borderWidth: 1
//             }}>
//                 <Text style={{
//                     color: colors.antiBackground,
//                     fontWeight: 'bold',
//                     fontSize: 18
//                 }}>
//                     {userData.followingCount}
//                 </Text>
//                 <Text style={{
//                     fontSize: 13,
//                     color: colors.background1,
//                     fontWeight: 'bold',
//                     marginTop: -4,
//                     // borderColor: 'salmon',
//                     // borderWidth: 1
//                 }}>
//                     Following
//                 </Text>
//             </TouchableOpacity>

//             {/* first vertical bar */}
//             <VerticalBar />

//             {/* middle */}
//             <TouchableOpacity style={{
//                 marginHorizontal: spacing,
//                 alignItems: 'center',
//                 justifyContent: 'space-evenly',
//                 // borderColor: 'pink',
//                 // borderWidth: 1
//             }}>
//                 <Text style={{
//                     color: colors.antiBackground,
//                     fontWeight: 'bold',
//                     fontSize: 18
//                 }}>
//                     {userData.followersCount}
//                 </Text>
//                 <Text style={{
//                     fontSize: 13,
//                     color: colors.background1,
//                     fontWeight: 'bold',
//                     marginTop: -4
//                 }}>
//                     Followers
//                 </Text>
//             </TouchableOpacity>

//             {/* second vertical bar */}
//             <VerticalBar />

//             {/* last */}
//             <TouchableOpacity style={{
//                 alignItems: "center",
//                 justifyContent: 'center',
//                 backgroundColor: colors.background3, //colors.blue,
//                 paddingHorizontal: 27,
//                 marginLeft: spacing,
//                 borderRadius: 4,
//                 // borderColor: 'pink',
//                 // borderWidth: 1
//             }}
//                 onPress={() => {
//                     if (Platform.OS === "web") {
//                         showMessage({
//                             message: "Get the iOS app for full experience!",
//                             type: "info",
//                         })
//                     }
//                     else {
//                         const obj = {
//                             "Follow": follow(),
//                             "Unfollow": unfollow(),
//                             "Edit Profile": function() {
                                
//                             }
//                         };
//                         obj[buttonText];
//                     }
//                 }}>
//                 <Text style={{
//                     fontSize: 15,
//                     color: colors.background1,
//                     fontWeight: "bold"
//                 }}>
//                     {buttonText}
//                 </Text>
//             </TouchableOpacity>

//         </View>
//     )
// }

// export default UserInfoBar;