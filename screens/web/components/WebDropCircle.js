import React, { useState, useContext } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import AppContext from '../../../data/AppContext';
import ThemeContext from '../../../data/ThemeContext';

function WebDropCircle({ data, index, setStoryOpen }) {

    const padding = 2;
    const imageSideLength = 77;
    const totalSideLength = imageSideLength + 2 * padding;

    if (data === "filler") {
        return (
            <View style={{
                width: totalSideLength
            }} />
        )
    }

    const { userName, userImageURL, clearedThisWeek } = data;
    const { theme } = useContext(AppContext);
    const colors = useContext(ThemeContext).colors[theme];



    return (
        <View style={{
            paddingVertical: 5,
            alignItems: "center"
        }}>
            <TouchableOpacity style={{
                padding: padding,
                borderRadius: totalSideLength / 2,
                backgroundColor: clearedThisWeek ? colors.background3 : colors.signGreen
            }}
                onPress={() => {
                    setStoryOpen(index);
                }}>
                <Image source={{ uri: userImageURL }}
                    style={{
                        width: imageSideLength,
                        height: imageSideLength,
                        borderRadius: imageSideLength / 2,
                        borderWidth: clearedThisWeek ? 4 : 3,
                        borderColor: "black",
                        overflow: "hidden",
                    }}
                    resizeMode={"cover"} />
            </TouchableOpacity>
            <Text style={{
                color: colors.antiBackground,
                fontSize: 14,
                width: totalSideLength,
                marginTop: 6,
                textAlign: "center",
            }}
                numberOfLines={1}>
                {userName}
            </Text>


            {/* <Text style={{
                color: "white",
                width: 100
            }}>
                {data.uid + "\n" + data.clearedThisWeek}
            </Text> */}
        </View>
    )
}

function areEqual(prevProps, newProps) {
    return prevProps.data.clearedThisWeek === newProps.data.clearedThisWeek;
}

export default React.memo(WebDropCircle, areEqual);