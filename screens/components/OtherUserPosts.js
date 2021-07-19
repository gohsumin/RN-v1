import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, Image, Text } from "react-native";

function OtherUserPosts({ navigation, userFeed, width, toggleRender, setModal, setModalInfo }) {

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{
                width: width / 2,
                height: width / 2,
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
                    width: width / 2 - 15,
                    height: width / 2 - 15,
                    borderRadius: 12,
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