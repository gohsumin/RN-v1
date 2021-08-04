import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, Image, Dimensions } from "react-native";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import AppContext from "../../../data/AppContext";
import ThemeContext from "../../../data/ThemeContext";

function OtherUserPosts({ navigation, userFeed, setModal, setModalInfo }) {

    const tabBarHeight = useBottomTabBarHeight();
    const WINDOW_WIDTH = Dimensions.get('window').width;
    const { theme } = React.useContext(AppContext);
    const colors = React.useContext(ThemeContext).colors[theme];

    const renderItem = ({ item }) => {

        return (
            <View style={{
                width: "50%",
                aspectRatio: 1,
                padding: 10,
            }}>
                <TouchableOpacity style={{
                    borderRadius: 12,
                    borderWidth: 0.4,
                    borderColor: colors.foreground2,
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
                                width: WINDOW_WIDTH,
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
        <FlatList
            data={userFeed}
            numColumns={2}
            renderItem={renderItem}
            //extraData={toggleRender}
            keyExtractor={(item, index) => item.id}
            ListFooterComponent={<View style={{ height: tabBarHeight }} />}
        />
    )
}

export default OtherUserPosts;