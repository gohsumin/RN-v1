import React, { useEffect, useState } from 'react';
import { View, ScrollView, useWindowDimensions, Image, Text } from 'react-native';
import { useLinkTo } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

function Landing({ navigation }) {

    const linkTo = useLinkTo();
    const window = useWindowDimensions();
    const [outerStyles, setOuterStyles] = useState({});

    useEffect(() => {
        navigation.setOptions({ title: "SOSH WORLD" });
    }, []);

    function getOuterStyles() {
        let style = {
            marginVertical: 40,
            width: "92%",
            alignSelf: "center",
            alignItems: "center",
        };
        if (window.width > 700) {
            style.marginVertical = 50,
                style.flexDirection = "row";
            style.justifyContent = "space-evenly";
        }
        return style;
    }

    function getFontSize(size) {
        if (window.width > 1200) {
            return size * 1.2;
        }
        if (window.width > 900) {
            return size * 1.15;
        }
        if (window.width > 750) {
            return size * 1.1;
        }
        if (window.width > 650) {
            return size;
        }
        return size * 0.95;
    }

    useEffect(() => {
        setOuterStyles(getOuterStyles());
    }, [window.width]);

    function enter() {
        linkTo("/Home");
    }

    return (
        <ScrollView style={{ backgroundColor: "#060606" }}>
            <View style={window.width > 700 ?
                { marginHorizontal: "10%" } :
                { alignSelf: "center" }}>
                <Image source={require("../../../../assets/SoShNavLogo.png")}
                    style={[{
                        width: 140,
                        height: 70,
                        marginTop: 60
                    }]}
                    resizeMode='contain' />
            </View>

            <View style={outerStyles}>
                <View style={{
                    alignItems: "center",
                    marginBottom: window.width <= 700 && 40
                }}>
                    <Text style={{
                        fontFamily: "Arial-BoldMT",
                        fontWeight: "800",
                        color: "white",
                        lineHeight: getFontSize(55) - 3,
                        fontSize: getFontSize(55),
                        textAlign: "center",
                        flexWrap: "wrap"
                    }}>
                        <Text style={{ color: "rgb(155, 240, 11)" }}>Follow</Text>
                        {" what\nyour favorite\n"}
                        <Text style={{ color: "rgb(155, 240, 11)" }}>Influencers</Text>
                        {"\nare "}
                        <Text style={{ color: "rgb(155, 240, 11)" }}>Buying.</Text>
                    </Text>
                    <Text style={{
                        paddingVertical: 22,
                        paddingHorizontal: 70,
                        fontSize: 17,
                        fontWeight: "700",
                        marginTop: 40,
                        borderRadius: 15,
                        backgroundColor: "#9bf00b",
                    }} onMouseEnter={event => {
                        event.target.style.backgroundColor = "#9bff20";
                    }} onMouseLeave={event => {
                        event.target.style.backgroundColor = "#9bf00b";
                    }} onPress={enter}>
                        ENTER SOSH
                    </Text>
                </View>

                <Image source={{ uri: "https://i.ibb.co/pZ089Wh/Saturday-13-Nov-2021-23-15-10.png" }}
                    resizeMode="contain"
                    style={[{
                        width: 300,
                        height: 600,
                    }, window.width <= 700 &&
                    { width: 350, height: 700 }]} />
            </View>

            <View style={outerStyles}>
                <Image source={{ uri: "https://i.ibb.co/7yzyZfQ/Saturday-13-Nov-2021-23-18-01.png" }}
                    resizeMode="contain"
                    style={[{
                        width: 300,
                        height: 600,
                        marginBottom: window.width <= 700 && 40
                    }, window.width <= 700 &&
                    { width: 350, height: 700 }]} />

                <Text style={{
                    fontFamily: "Arial-BoldMT",
                    fontWeight: "800",
                    color: "rgb(155, 240, 11)",
                    fontSize: getFontSize(47),
                    textAlign: "center",
                    flexWrap: "wrap"
                }}>
                    {"100% Verified✓\nReal Purchases\n"}
                    <Text style={{ color: "white" }}>Never Ads.</Text>
                </Text>
            </View>

            <View style={outerStyles}>
                <Text style={{
                    fontFamily: "Arial-BoldMT",
                    fontWeight: "800",
                    color: "white",
                    fontSize: getFontSize(60),
                    textAlign: "center",
                    flexWrap: "wrap"
                }}>
                    {"Become an \n"}
                    <Text style={{ color: "rgb(155, 240, 11)" }}>Influencer</Text>
                    {" on "}
                    <Text style={{ color: "rgb(155, 240, 11)" }}>SOSH WORLD</Text>
                </Text>
            </View>

            <View style={outerStyles}>
                <View style={{
                    alignItems: "center",
                    borderWidth: 1,
                    marginBottom: window.width <= 700 && 40
                }}>
                    <Text style={{
                        fontFamily: "Arial-BoldMT",
                        fontWeight: "800",
                        color: "white",
                        fontSize: getFontSize(58),
                        textAlign: "center",
                        flexWrap: "wrap"
                    }}>
                        <Text style={{ color: "rgb(155, 240, 11)" }}>Get Paid</Text>
                        {" to\nBe Yourself."}
                    </Text>
                    <Text style={{
                        fontFamily: "Arial-BoldMT",
                        fontWeight: "600",
                        textAlign: "center",
                        flexWrap: "wrap",
                        color: "#888",
                        marginTop: 10,
                        fontSize: getFontSize(20),
                    }}>
                        {"Get paid everytime a follower\nbuys what you bought."}
                    </Text>
                </View>

                <Image source={{ uri: "https://i.ibb.co/CMwBYh4/Saturday-13-Nov-2021-23-20-56.png" }}
                    resizeMode="contain"
                    style={[{
                        width: 300,
                        height: 600,
                        borderWidth: 1,
                    }, window.width <= 700 &&
                    { width: 350, height: 700 }]} />
            </View>

            <View style={outerStyles}>
                <Text style={{
                    fontFamily: "Arial-BoldMT",
                    fontWeight: "800",
                    color: "white",
                    fontSize: getFontSize(30),
                    textAlign: "center",
                    flexWrap: "wrap",
                    marginVertical: 20
                }}>
                    <Text style={{ color: "rgb(155, 240, 11)" }}>
                        SOSH Partners
                    </Text>
                    {" with 6,500+ shops\nto get "}
                    <Text style={{ color: "rgb(155, 240, 11)" }}>
                        users paid
                    </Text>
                    {" when\ntheir followers buy what they buy."}
                </Text>
            </View>

            <View style={outerStyles}>
                <Text style={{
                    fontFamily: "Arial-BoldMT",
                    fontWeight: "800",
                    color: "rgb(155, 240, 11)",
                    fontSize: getFontSize(60),
                    textAlign: "center",
                    flexWrap: "wrap",
                    marginVertical: 50
                }}>
                    Own Your Influence
                </Text>
            </View>

            <View style={[{
                width: "96%",
                alignItems: "center",
                alignSelf: "center",
                marginBottom: 30
            }, window.width > 800 && {
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-between"
            }]}>
                <View style={[
                    window.width <= 800 && { alignItems: "center" },
                    {
                        // width: 350,
                        // borderWidth: 1, borderColor: 'pink'
                    }
                ]}>
                    <Image source={require("../../../../assets/SoShNavLogo.png")}
                        style={{
                            width: 150,
                            height: 50,
                            // borderWidth: 1, borderColor: 'pink'
                        }}
                        resizeMode='contain' />
                    <Text style={{
                        color: "white",
                        fontSize: 14,
                        fontFamily: "Arial-BoldMT",
                        fontWeight: "800",
                        marginTop: 15,
                    }}>
                        All Rights Reserved © 2021 • SOSH WRLD INC.
                    </Text>
                </View>

                <Text style={[
                    {
                        color: "white",
                        fontSize: 18,
                        fontFamily: "Arial-BoldMT",
                        fontWeight: "800",
                        marginVertical: 10,
                    },
                    window.width > 800 && {
                        position: "absolute",
                        width: "100%",
                        textAlign: "center",
                        marginVertical: 30,
                    }
                ]}
                    onMouseEnter={event => {
                        event.target.style.color = "rgb(155, 240, 11)";
                    }} onMouseLeave={event => {
                        event.target.style.color = "white";
                    }}>
                    HA@SOSHAPPS.COM
                </Text>

                <View style={[
                    { alignItems: "flex-end" },
                    window.width <= 800 && { alignItems: "center" },
                    {
                        // width: 350,
                        // borderWidth: 1, borderColor: 'pink'
                    }
                ]}>
                    <View style={{
                        flexDirection: "row",
                        width: 95,
                        justifyContent: "space-between",
                    }}>
                        <AntDesign name="instagram" size={24} color="white" />
                        <AntDesign name="twitter" size={24} color="white" />
                        <AntDesign name="youtube" size={24} color="white" />
                    </View>

                    <View style={{
                        flexDirection: "row",
                        marginTop: 15
                    }}>
                        <Text style={{
                            color: "white",
                            fontSize: 14,
                            fontFamily: "Arial-BoldMT",
                            fontWeight: "800",
                            borderBottomColor: "black",
                            borderBottomWidth: 0.5,
                            lineHeight: 19
                        }} onMouseEnter={event => {
                            event.target.style.color = "rgb(155, 240, 11)";
                            event.target.style.borderBottomColor = "rgb(155, 240, 11)";
                        }} onMouseLeave={event => {
                            event.target.style.color = "white";
                            event.target.style.borderBottomColor = "black";
                        }} onPress={() => { linkTo("/terms"); }}>
                            {"Terms & Conditions"}
                        </Text>
                        <Text style={{
                            color: "white",
                            fontSize: 14,
                            fontFamily: "Arial-BoldMT",
                            fontWeight: "800",
                            marginLeft: 15,
                            borderBottomColor: "black",
                            borderBottomWidth: 0.5,
                            lineHeight: 19
                        }} onMouseEnter={event => {
                            event.target.style.color = "rgb(155, 240, 11)";
                            event.target.style.borderBottomColor = "rgb(155, 240, 11)";
                        }} onMouseLeave={event => {
                            event.target.style.color = "white";
                            event.target.style.borderBottomColor = "black";
                        }} onPress={() => { linkTo("/privacy"); }}>
                            {"Privacy"}
                        </Text>
                    </View>
                </View>
            </View>

        </ScrollView>
    )
}

export default Landing;