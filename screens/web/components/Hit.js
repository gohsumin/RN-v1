import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useLinkTo } from '@react-navigation/native';

const Hit = React.memo(props => {

    const [focused, setFocused] = useState("");
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
                console.log("userID: " + uid);
                const link = "/uid/" + uid;
                linkTo(link);
            }}>
            <View style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "flex-start",
                marginVertical: 5,
                padding: 10,
                backgroundColor: focused === props.hit.userName ? "#111" : 'transparent',
                shadowColor: 'black',
                shadowOpacity: focused === props.hit.userName ? 1 : 0,
                shadowOffset: { width: 3, height: 3 },
                shadowRadius: 5,
                borderRadius: 15,
                // borderWidth: 1,
                // borderColor: "green"
            }}>
                <Image
                    source={props.hit.userImageURL}
                    style={{
                        width: 60,
                        height: props.hitHeight,
                        marginRight: 15,
                        borderRadius: 13,
                        shadowColor: 'black',
                        shadowOffset: { width: 3, height: 3 },
                        shadowRadius: 5,
                    }}
                    resizeMode={"contain"}
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
                            <Text style={{
                                fontSize: 15,
                                opacity: 0.7,
                                fontWeight: "normal"
                            }}>
                                {props.hit.userDescription}
                            </Text>
                        </Text>
                    </View>
                    <Text style={{
                        color: "gray",
                        fontSize: 13,
                        fontStyle: 'italic',
                    }}>
                        {"Followers: " + props.hit.followersCount}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
});

export default Hit;