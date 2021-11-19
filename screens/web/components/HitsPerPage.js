import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import NumberPlease from "react-native-number-please";

const HitsPerPage = React.memo(({ items, currentRefinement, refine, createURL }) => {

    const [hits, setHits] = useState(null);
    const hitRange = [{ id: "hits", label: "", min: 10, max: 50 }];

    useEffect(() => {
        // initialize hits once
        setHits([{ id: "hits", value: 10 }]);
    }, []);

    useEffect(() => {
        if (hits == null) {
            console.log("hits are null");
            setHits([{ id: "hits", value: currentRefinement }]);
        }
        else {
            refine(hits[0]["value"]);
        }
    }, [hits]);

    console.log("HitsPerPage currentRefinement: " + currentRefinement);
    return (
        <View style={{
            flexDirection: "row",
            margin: 7,
            // borderWidth: 1,
            // borderColor: 'salmon',
        }}>
            <Text style={{
                alignSelf: "center",
                color: "#555",
                // borderWidth: 1,
                // borderColor: 'yellow',
            }}>
                Showing
            </Text>

            <View style={{
                overflow: "hidden",
                marginHorizontal: 6,
            }}>
                <NumberPlease
                    pickerStyle={{
                        color: "#555",
                        backgroundColor: "transparent",
                        // borderWidth: 1,
                        // borderColor: 'yellow',
                    }}
                    digits={hitRange}
                    values={hits}
                    onChange={(values) => {
                        console.log("values[0][value]: " + values[0]["value"]);
                        setHits(values);
                    }} />
            </View>

            <Text style={{
                alignSelf: "center",
                color: "#555",
                // borderWidth: 1,
                // borderColor: 'yellow',
            }}>
                Results.
            </Text>
        </View>
    )
}, areEqual);

function areEqual(prevProps, newProps) {
    if (prevProps.currentRefinement === newProps.currentRefinement) {
        return true;
    }
    return false;
}

export default HitsPerPage;