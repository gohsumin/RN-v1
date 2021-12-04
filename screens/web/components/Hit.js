import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useLinkTo } from '@react-navigation/native';

const Hit = React.memo(props => {

    const [focused, setFocused] = useState("");
    const [loaded, setLoaded] = useState(false);
    const linkTo = useLinkTo();

    return (
        <TouchableOpacity
            onMouseEnter={() => {
                setFocused(props.hit.userName);
            }}
            onMouseLeave={() => {
                setFocused("");
            }}
            onPress={() => {
                const uid = props.hit.objectID;
               //console.log("userID: " + uid);
                const link = "/uid/" + uid;
                linkTo(link);
            }}>
            <View style={{
                flex: 1,
                width: "100%",
                opacity: loaded ? 1 : 0,
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "flex-start",
                marginVertical: 8,
                padding: 6,
                backgroundColor: focused === props.hit.userName ? "#252525" : '#0e0e0e',
                shadowColor: 'black',
                shadowOpacity: focused === props.hit.userName ? 1 : 0.5,
                shadowOffset: { width: 1, height: 1 },
                shadowRadius: 15,
                borderRadius: 15,
                borderWidth: 1,
            }}>
                <Image
                    onLoad={() => {
                        setLoaded(true);
                    }}
                    source={props.hit.userImageURL}
                    style={{
                        width: props.hitHeight,
                        height: props.hitHeight,
                        marginRight: 15,
                        borderRadius: 13,
                        shadowColor: 'black',
                        shadowOffset: { width: 3, height: 3 },
                        shadowRadius: 5,
                    }}
                />
                <View>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "flex-start",
                    }}>
                        <Text style={{
                            fontSize: 17,
                            color: "white",
                            fontWeight: "bold"
                        }}>
                            {props.hit.userName + "  "}
                            {/* <Text style={{
                                fontSize: 15,
                                opacity: 0.7,
                                fontWeight: "normal"
                            }}>
                                {props.hit.userDescription}
                            </Text> */}
                        </Text>
                    </View>
                    <Text style={{
                        color: "gray",
                        fontSize: 14,
                        lineHeight: 16,
                    }}>
                        {"Followers: " + props.hit.followersCount}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
});

export default Hit;