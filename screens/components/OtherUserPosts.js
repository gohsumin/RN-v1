import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, Image, Text } from "react-native";
import PostPopUp from "./PostPopUp";

function OtherUserPosts({ navigation, userFeed, userName, userData, width, height, toggleRender, setModal, setModalInfo }) {

    const renderSeparator = () => {
        return (
            <View
                style={{
                    height: 0.4,
                    width: "100%",
                    backgroundColor: "#808080",
                    opacity: 0.5,
                    alignSelf: "flex-end",
                }}
            />
        );
    };

    return (
        <View>
            <FlatList
                data={userFeed}
                numColumns={3}
                renderItem={({ item }) =>
                    <TouchableOpacity style={{
                        width: width / 3,
                        height: width / 3,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                        onPress={() => {
                            const pfpSource = userData.pfpSource;
                            const firstName = userData.firstName;
                            const lastName = userData.lastName;
                            const title = item.title;
                            const timePosted = item.datePurchased;
                            const imageSource = item.imageSource;
                            const likes = item.likes;
                            const key = item.user + item.datePurchased;
                            setModalInfo(
                                {
                                    pfpSource: pfpSource,
                                    user: userName,
                                    firstName: firstName,
                                    lastName: lastName,
                                    title: title,
                                    timePosted: timePosted,
                                    imageSource: imageSource,
                                    likes: likes,
                                    key: key,
                                }
                            );
                            setModal(true);
                        }}>
                        <View style={{
                            padding: 8,
                            width: 92,
                            height: 92,
                            borderRadius: 28,
                            overflow: 'hidden',
                            backgroundColor: 'white'
                        }}>
                            <Image
                                fadeDuration={0}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    resizeMode: 'contain',
                                }}
                                source={item.imageSource} />
                        </View>
                    </TouchableOpacity>
                }
                extraData={toggleRender}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

export default OtherUserPosts;