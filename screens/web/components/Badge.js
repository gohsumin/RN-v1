import React from 'react';
import { View, Image, Text, useWindowDimensions, Linking } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

function Badge() {

    const window = useWindowDimensions();

    function getFontSize(windowHeight) {
        return windowHeight < 700 ?
            15 : 18.5;
    }

    function getFontWeight(windowHeight) {
        return windowHeight < 700 ?
            "600" : "700";
    }

    function getLineHeight(windowHeight) {
        return windowHeight < 700 ?
            14.7 : 17;
    }

    function getImageSide(windowHeight) {
        return windowHeight < 700 ?
            100 : 120;
    }

    function getMarginLeft(windowHeight) {
        return windowHeight < 700 ?
            6 : 8;
    }

    return (
        <TouchableOpacity style={{
            flexDirection: "row",
            alignItems: "center",
            // borderWidth: 1, borderColor: "salmon"
        }}
            onPress={() => {
                Linking.canOpenURL("https://apps.apple.com/us/app/sosh-world/id1589909476").then(supported => {
                    if (supported) {
                        Linking.openURL("https://apps.apple.com/us/app/sosh-world/id1589909476");
                        // incrementViews(item.id);
                    } else {
                       //console.log("Can't open URL: " + "https://apps.apple.com/us/app/sosh-world/id1589909476");
                    }
                });
            }} >
            <Text style={{
                fontSize: getFontSize(window.height),
                fontWeight: getFontWeight(window.height),
                lineHeight: getLineHeight(window.height),
                color: "white",
                textAlign: "right",
                // textShadowRadius: 20,
                // textShadowColor: "black",
                // shadowOpacity: 1
            }} >
                {"For full\nexperience"}
            </Text>
            <Image
                source={require("../../../assets/appStoreBadge.png")}
                style={{
                    width: getImageSide(window.height),
                    height: getImageSide(window.height) / 2.99,
                    alignSelf: "flex-end",
                    marginLeft: getMarginLeft(window.height),
                    // shadowRadius: 15,
                    // shadowColor: "black",
                    // shadowOpacity: 1,
                    // shadowOffset: { width: 5, height: 0 },
                    // overflow: "visible"
                }}
                resizeMode={"contain"}
            />
        </TouchableOpacity>
    )
}

export default Badge;