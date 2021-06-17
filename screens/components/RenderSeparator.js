import React from 'react';
import { View } from 'react-native';

function RenderSeparator({width}) {

    return (
        <View
            style={{
                height: 0.4,
                width: width,
                backgroundColor: "#808080",
                opacity: 0.5,
                alignSelf: "flex-end",
            }}
        />
    );
}

export default RenderSeparator;