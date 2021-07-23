import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, Image, Text } from "react-native";

function OtherUserPosts({ navigation, userFeed, width, toggleRender, setModal, setModalInfo }) {

    const renderItem = ({ item }) => {
        return (
            <View style={{
                width: width * 0.5,
                height: width * 0.5,
                padding: 10
            }}>
                <TouchableOpacity style={{
                    borderRadius: 12,
                    overflow: 'hidden',
                    backgroundColor: 'white',
                    width: "100%",
                    height: "100%",
                    alignItems: 'center',
                    justifyContent: 'center'
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
                    <Image
                        fadeDuration={0}
                        style={{
                            width: "84%",
                            height: "84%",
                            resizeMode: 'contain',
                        }}
                        source={{ uri: item.itemImageURL }} />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View>
            <FlatList
                data={userFeed}
                numColumns={2}
                renderItem={renderItem}
                extraData={toggleRender}
                keyExtractor={(item, index) => item.id}
            />
        </View>
    )
}

export default OtherUserPosts;