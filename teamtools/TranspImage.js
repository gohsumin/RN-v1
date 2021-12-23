import React, { useState } from 'react';
import { View, Image } from 'react-native';

function TranspImage(props) {
    const { source, style, resizeMode, resizeMethod, aspectRatio } = props;

    const squareSize = 10;

    return (
        <View >
            <View style={{
                position: "absolute",
                width: style.width,
                height: style.height,
                alignContent: "center",
                justifyContent: "center",
                overflow: "hidden"
            }} >
                {
                    [...new Array(Math.ceil(style.height / squareSize))].map((row, rowIndex) => {
                        return (
                            <View style={{ flexDirection: "row" }} >
                                {[...new Array(Math.ceil(style.width / squareSize))].map((col, colIndex) => {
                                    return (

                                        <View style={{
                                            width: squareSize,
                                            height: squareSize,
                                            backgroundColor: (rowIndex + colIndex) % 2 === 0 ?
                                                "#eee" : "#f5f5f5",
                                        }} />

                                    )
                                })}
                            </View>
                        )
                    })}
            </View>
            <Image
                source={source}
                style={style}
                resizeMethod={resizeMethod && resizeMethod}
                resizeMode={resizeMode && resizeMode}
                aspectRatio={aspectRatio && aspectRatio} />

        </View>
    )
}

export default React.memo(TranspImage, (prevProps, newProps) => {
    return true;
});