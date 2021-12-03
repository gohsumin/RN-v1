import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { firebase } from "../../../data/firebase";
const firestore = firebase.firestore();
import { EvilIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useLinkTo } from '@react-navigation/native';

function Featured({ height, width, footerHeight, marginTop }) {

    const [data, setData] = useState([]);
    const linkTo = useLinkTo();

    const textHeight = 50;
    const paddingTop = 50;
    const marginBottom = footerHeight;
    const totalHeight = height - marginTop - marginBottom;
    const spacing = width > 388 ? 18 : 10;
    const paddingBottom = 25;
    const scrollViewHeight = totalHeight - paddingTop - paddingBottom;
    const borderRadius = 24;
    const profileImageHeight = scrollViewHeight - 80;
    const profileMargin = 0;
    const cardWidth = profileImageHeight + profileMargin * 2;
    const blurTint = "dark";

    useEffect(() => {
        const db = firestore.collection("Explore").orderBy("rank", "asc");
        db.get().then((snapshot) => {
            let arr = [];
            snapshot.forEach((doc) => {
                const d = doc.data();
                arr.push(d);
            });
            setData(arr);
        });
    }, []);

    function FeaturedProfile({ key, profile }) {
        return (
            <TouchableOpacity
                key={key}
                onPress={() => {
                    const uid = profile.userID;
                    console.log("uid: " + uid);
                    const link = "/uid/" + uid;
                    linkTo(link);
                }} >
                <View
                    style={{
                        width: cardWidth,
                        height: scrollViewHeight,
                        borderRadius: borderRadius,
                        marginLeft: spacing,
                        marginRight: 5,
                        justifyContent: "center"
                    }}>

                    <Image
                        source={{ uri: profile.itemImageURL }}
                        resizeMode={"cover"}
                        style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            width: cardWidth,
                            height: scrollViewHeight,
                            borderRadius: borderRadius,
                        }} />

                    <BlurView style={{
                        position: "absolute",
                        left: -0.5,
                        top: -0.5,
                        width: profileImageHeight + profileMargin * 2 + 1,
                        height: scrollViewHeight + 1,
                        borderRadius: borderRadius,
                        shadowOpacity: 0.5,
                        shadowRadius: 25,
                        shadowColor: "black"
                    }}
                        tint={blurTint}
                        intensity={100}
                    />

                    <View style={{
                        width: profileImageHeight,
                        height: scrollViewHeight,
                        marginLeft: profileMargin,
                        alignSelf: "flex-start",
                        justifyContent: "space-between",
                        // borderWidth: 1,
                        // borderColor: "beige"
                    }}>

                        <View style={{
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            marginTop: 17,
                            marginLeft: 13,
                            // borderColor: 'blue',
                            // borderWidth: 1
                        }}>
                            <Text style={{
                                color: blurTint === "dark" ?
                                    "rgba(255, 255, 255, 1)" :
                                    "rgba(0, 0, 0, 0.7)",
                                fontSize: 27.5,
                                fontWeight: "500",
                                lineHeight: 24,
                                textAlign: 'left',
                                textAlignVertical: "center",
                                // borderColor: 'blue',
                                // borderWidth: 1
                            }}>
                                {profile.userName}
                                {"\n"}
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    color: blurTint === "dark" ?
                                        "rgba(255, 255, 255, 0.4)" :
                                        "rgba(0, 0, 0, 0.4)",
                                }}>
                                    {profile.userDescription}
                                </Text>
                            </Text>

                            {/* <EvilIcons
                            name="arrow-right"
                            size={43}
                            color="#00aa55"
                            style={{
                                marginLeft: 4,
                            }} /> */}
                        </View>

                        <View style={{
                            marginBottom: profileMargin,
                            borderBottomLeftRadius: borderRadius,
                            borderBottomRightRadius: borderRadius,
                            overflow: "hidden"
                        }}>
                            <Image
                                source={{ uri: profile.userImageURL }}
                                style={{
                                    width: profileImageHeight,
                                    height: profileImageHeight,
                                }} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        (data === undefined) ?
            <View style={{
                height: height
            }} />
            : <View style={{
                // height: height,
                width: width,
                height: totalHeight,
                paddingHorizontal: 2,
                marginBottom: marginBottom,
                marginTop: marginTop,
                overflow: "hidden",
                backgroundColor: "black",
                // borderTopLeftRadius: borderRadius,
                // borderTopRightRadius: borderRadius,
                borderRadius: 25,
                shadowRadius: 20,
                //shadowColor: '#111',
                borderWidth: 0.3,
                borderColor: '#444'
            }}>

                <LinearGradient
                    style={{
                        position: 'absolute',
                        width: width,
                        height: totalHeight,
                        top: 0,
                        left: 0,
                    }}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0.2 }}
                    locations={[0, 0.3, 0.7, 1]}
                    colors={['rgba(30, 18, 6, 0.6)',
                        'rgba(25, 25, 10, 0.6)',
                        'rgba(15, 24, 19, 0.6)',
                        'rgba(21, 20, 27, 0.6)',]} />

                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 2,
                    height: textHeight,
                    justifyContent: "center",
                    paddingLeft: spacing,
                }} >
                    <Text style={{
                        color: "#6d6d6d",
                        fontSize: 16.2,
                        fontWeight: "300",
                        // borderWidth: 0.1,
                        // borderColor: 'purple'
                    }}>
                        Featured
                    </Text>
                </View>

                <ScrollView
                    horizontal={true}
                    style={{
                        width: width,
                        height: totalHeight,
                        paddingTop: paddingTop,
                        paddingBottom: paddingBottom,
                        paddingRight: spacing,
                        overflow: "hidden",
                        // borderColor: 'blue',
                        // borderWidth: 1
                    }} >
                    {data.map((profile) =>
                        <View key={profile.userID}><FeaturedProfile profile={profile} /></View>
                    )}
                </ScrollView>
            </View>
    )
}

export default Featured;