import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, Image, Text } from "react-native";

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
                            setModalInfo(
                                {
                                    item: item,
                                    navigate: navigation.navigate,
                                    setModal: setModal,
                                    key: item.id,
                                    width: width,
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
                                source={{ uri: item.itemImageURL }} />
                        </View>
                    </TouchableOpacity>
                }
                extraData={toggleRender}
                keyExtractor={(item, index) => item.id}
            />
        </View>
    )
}

export default OtherUserPosts;