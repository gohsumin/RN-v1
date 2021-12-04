import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import NumberPlease from "react-native-number-please";

const HitsPerPage = React.memo(({ currentRefinement, refine, hitsPerPageHeight }) => {

    const [hits, setHits] = useState(null);
    const [hitsChanged, setHitsChanged] = useState(false);
    const hitRange = [{ id: "hits", label: "", min: 1, max: 50 }];
    const defaultHits = 4;

    useEffect(() => {
        // initialize hits once
        setHits([{ id: "hits", value: defaultHits }]);
    }, []);

    useEffect(() => {
        if (hits == null) {
            // if the hits state changed back to null, set it to the previous refinement
           //console.log("hits are null");
            setHits([{ id: "hits", value: currentRefinement }]);
        }
        else {
            // if the hits state were updated manually, refine search again
            if (hitsChanged) {
               //console.log("hitsChanged");
                refine(hits[0]["value"]);
                setHitsChanged(false);
            }
        }
    }, [hits]);

   //console.log("HitsPerPage currentRefinement: " + currentRefinement);
    return (
        <View style={{
            flexDirection: "row",
            height: hitsPerPageHeight,
            paddingHorizontal: 10,
            // borderWidth: 1,
            // borderColor: 'salmon',
        }}>
            <Text style={{
                alignSelf: "center",
                color: "#555",
                fontSize: 14,
                // borderWidth: 1,
                // borderColor: 'yellow',
            }}>
                Showing
            </Text>

            <View style={{
                overflow: "hidden",
                marginHorizontal: 6,
                alignSelf: "center"
            }}>
                <NumberPlease
                    pickerStyle={{
                        color: "#555",
                        backgroundColor: "transparent",
                        fontSize: 14,
                        // borderWidth: 1,
                        // borderColor: 'yellow',
                    }}
                    digits={hitRange}
                    values={hits}
                    onChange={(values) => {
                       //console.log("picker value changed");
                        setHitsChanged(true);
                        setHits(values);
                    }} />
            </View>

            <Text style={{
                alignSelf: "center",
                color: "#555",
                fontSize: 14,
                // borderWidth: 1,
                // borderColor: 'yellow',
            }}>
                {currentRefinement === 1 ? "result." : "results."}
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