import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Input from './Input';
import { EvilIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import brandFunctions from "./brandFunctions";
import { firebase } from "../data/firebase";
import { LinearGradient } from 'expo-linear-gradient';
const firestore = firebase.firestore();

function TeamTools() {

    const brands = ["UrbanOutfitters"];
    const [ready, setReady] = useState(false);
    const [emailArr, setEmailArr] = useState([]);
    const [collapsibleArr, setCollapsibleArr] = useState();
    const [trigger, setTrigger] = useState(false);
    const [inputArr, setInputArr] = useState({});

    useEffect(() => {
        const db = firestore.collection("Human-Proccessing");
        db.get().then((snapshot) => {
            setReady(false);
            let res = [];
            let ca = {};
            let inputObj = {};
            snapshot.forEach((doc) => {
                let obj = doc.data();
                const temp = readHTML(obj.msgHTML, obj.msgID);
                if (brands.includes(temp.brand)) {
                    console.log("brands.includes(" + temp.brand + ")");
                    const ret = brandFunctions[temp.brand](obj.msgHTML);
                    obj.brandImage = ret.brandImage;
                    obj.items = ret.items;
                }
                obj.imageArr = temp.imageArr;
                obj.urlArr = temp.urlArr;
                obj.brand = temp.brand;
                res.push(obj);
                ca[obj.msgID] = true;
                inputObj[obj.msgID] = {
                    brandName: "",
                    brandLink: "",
                    chosenLogoImg: "",
                    products: [{
                        chosenItemImg: "",
                        itemName: "",
                        itemLink: "",
                    }],
                };
            })
            setEmailArr(res);
            setInputArr(inputObj);
            setCollapsibleArr(ca);
            setReady(true);
        });
    }, []);

    function readHTML(html) {
        let ret = {};

        // regexp for brand (won't be necessary later with email headers)
        const brandRE = new RegExp('From:[^>]*>\s*([A-Za-z0-9 ]*)\s*');
        const brandMatch = html.match(brandRE);
        if (brandMatch !== null) {
            ret.brand = brandMatch[1].trim();
        }
        else {
            ret.brand = null;
        }

        // regexp for image tags
        const imageTagRE = new RegExp('<img([^>]*)>', 'g');
        const imageTagMatches = html.matchAll(imageTagRE);
        let imageArr = [];
        for (const match of imageTagMatches) {
            const src = match[1].match(new RegExp('src\s*=[\"\']((?:(?![\"\']).)*)[\"\']'));
            if (!imageArr.includes(src[1])) {
                imageArr.push(src[1]);
            }
        }
        ret.imageArr = imageArr;

        // regexp for all urls
        const urlRE = new RegExp('(src|href)=\"([^\"]*)\"', 'g');
        const urlMatches = html.matchAll(urlRE);
        let urlArr = [];
        for (const match of urlMatches) {
            const url = match[2];
            if (!urlArr.includes(match)) {
                urlArr.push(url);
            }
        }
        ret.urlArr = urlArr;

        return ret;
    }

    const renderItem = ({ item, index }) => {

        function setData(data) {
            console.log("setData");
            console.log(data);
            let prev = inputArr;
            const key = Object.keys(data)[0];
            const temp = key.split("/");
            console.log(temp);
            if (temp.length === 1) {
                prev[item.msgID][temp[0]] = data[key];
            }
            else {
                prev[item.msgID][temp[0]][parseInt(temp[1], 10)][temp[2]] = data[key];
            }
            setInputArr(prev);
            setTrigger(!trigger);
        }

        function removeItem(itemIndex) {
            console.log("removeItem");
            let temp = inputArr;
            let products = inputArr[item.msgID].products;
            products.splice(itemIndex, 1);
            temp[item.msgID].products = products;
            setInputArr(temp);
            setTrigger(!trigger);
        }

        function addItem(itemIndex) {
            console.log("addItem, itemIndex: " + itemIndex);
            let temp = inputArr;
            let products = inputArr[item.msgID].products;
            products.splice(itemIndex + 1, 0, {
                chosenItemImg: "",
                itemName: "",
                itemLink: "",
            });
            temp[item.msgID].products = products;
            setInputArr(temp);
            setTrigger(!trigger);
        }

        function save(msgID, index) {
            let temp = [];
            let values = inputArr[msgID];
            let i = 0;
            let valid = true;
            while (i < values.products.length && valid) {
                const prod = values.products[i];
                if (prod.itemName && prod.itemLink && prod.chosenItemImg) {
                    temp.push({
                        itemName: prod.itemName,
                        itemLink: prod.itemLink,
                        itemImage: prod.chosenItemImg,
                    });
                    i++;
                }
                else {
                    valid = false;
                }
            }
            if (valid && values.brandLink) {
                let ia = emailArr;
                ia[index]["brandImage"] = values.chosenLogoImg;
                ia[index]["items"] = temp;
                console.log(ia[index]);
                setEmailArr(ia);
                let ca = collapsibleArr;
                ca[msgID] = true;
                setCollapsibleArr[ca];
                setTrigger(!trigger);
            }
            else {
                alert("Please complete all fields before submitting.");
            }
        }

        return (
            <View style={styles.renderItemStyle}>
                <View style={styles.renderItemTop}>
                    <Text style={styles.categoryText}>
                        {"Subject: "}
                        <Text style={styles.valueText}>{item.msgSubject}</Text>
                    </Text>
                    <Text style={styles.categoryText}>
                        {"Brand: "}
                        <Text style={styles.valueText}>{item.brand}</Text>
                    </Text>
                    <Text style={styles.categoryText}>
                        {"Recipient Email: "}
                        <Text style={styles.valueText}>{item.msgFrom}</Text>
                    </Text>
                    <Text style={styles.categoryText}>
                        {"Message ID: "}
                        <Text style={styles.valueText}>{item.msgID}</Text>
                    </Text>
                    <Text style={styles.categoryText}>
                        {"User ID: "}
                        <Text style={styles.valueText}>{item.userID}</Text>
                    </Text>

                    {item.brandImage &&
                        <View style={styles.includedBrandInfo}>

                            <Image source={{ uri: item.brandImage }}
                                style={styles.brandLogo}
                                resizeMode={"contain"} />

                            <View style={styles.verticalSeparator} />

                            <View style={styles.includedBrandRight}>
                                <Text style={styles.autoCategoryText}>
                                    {"Logo URL: "}
                                    <Text style={styles.autoValueText} >
                                        {item.brandImage}
                                    </Text>
                                </Text>

                                <View style={styles.horizontalSeparator} />

                                {item.items.map((product, index) => {
                                    return <View style={[
                                        styles.itemRow,
                                        { marginTop: index === 0 ? 0 : 10 }
                                    ]} >
                                        <Image source={{ uri: product.itemImage }}
                                            style={styles.itemImage}
                                            resizeMode={"contain"} />
                                        <View style={styles.includedBrandRight}>
                                            <Text style={styles.autoCategoryText}>
                                                {"Item Name: "}
                                                <Text style={styles.autoValueText} >
                                                    {product.itemName}
                                                </Text>
                                            </Text>
                                            <Text style={styles.autoCategoryText}
                                                onPress={() => {
                                                    window.open(product.itemImage, '_blank');
                                                }}>
                                                {"Item Image URL: "}
                                                <Text style={styles.autoValueText} >
                                                    {product.itemImage}
                                                </Text>
                                            </Text>
                                            <Text style={styles.autoCategoryText}
                                                onPress={() => {
                                                    window.open(product.itemLink, '_blank');
                                                }}>
                                                {"Item URL: "}
                                                <Text style={styles.autoValueText} >
                                                    {product.itemLink}
                                                </Text>
                                            </Text>
                                        </View>
                                    </View>
                                })}
                            </View>
                        </View>}
                </View>

                <EvilIcons
                    style={{ alignSelf: "center" }}
                    name={collapsibleArr[item.msgID] ? "chevron-down" : "chevron-up"}
                    size={21}
                    color="blue"
                    onPress={() => {
                        let temp = collapsibleArr;
                        temp[item.msgID] = !(collapsibleArr[item.msgID]);
                        setCollapsibleArr(temp);
                        setTrigger(!trigger);
                    }} />

                {!collapsibleArr[item.msgID] &&
                    <View style={{ width: "100%" }} >

                        <View style={{
                            width: "100%",
                            flexDirection: "row",
                            alignItems: "flex-end",
                            alignSelf: "center",
                            justifyContent: "space-between",
                            paddingHorizontal: 20,
                            marginBottom: 13,
                        }}>
                            <Text style={styles.manualEntryHeaderText} >
                                Manual Entry
                            </Text>
                            <Text style={styles.saveButton}
                                onPress={() => { save(item.msgID, index); }}>SAVE</Text>
                        </View>

                        <View style={styles.manualBrandEntrySection} >
                            <Text style={styles.manualSelectionSubHeaderText}>
                                Brand
                            </Text>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={styles.manualSelectionText}>
                                    BRAND NAME:
                                </Text>
                                <Input type="brandName"
                                    initialText={inputArr[item.msgID].brandName}
                                    setData={setData} />
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={styles.manualSelectionText}>
                                    BRAND WEBSITE:
                                </Text>
                                <Input type="brandLink"
                                    initialText={inputArr[item.msgID].brandLink}
                                    setData={setData} />
                            </View>
                            <Text style={styles.manualSelectionText}>
                                BRAND LOGO:
                            </Text>
                            <View style={styles.itemRow} >
                                {item.imageArr.map((img) =>
                                    <TouchableOpacity onPress={() => {
                                        let temp = inputArr;
                                        if (temp[item.msgID].chosenLogoImg === img) {
                                            temp[item.msgID].chosenLogoImg = "";
                                        }
                                        else {
                                            temp[item.msgID].chosenLogoImg = img;
                                        }
                                        setInputArr(temp);
                                        setTrigger(!trigger);
                                    }}
                                        containerStyle={[styles.listedImageWrapper,
                                        inputArr[item.msgID].chosenLogoImg === img ? {
                                            shadowColor: "#55bbdd",
                                            shadowOpacity: 1,
                                            shadowRadius: 7
                                        } : {
                                            shadowColor: "black",
                                        }]}>
                                        <Image source={{ uri: img }}
                                            style={styles.listedImageStyle}
                                            resizeMode={"contain"}
                                            resizeMethod={"scale"} />
                                    </TouchableOpacity>)}
                            </View>
                        </View>

                        {inputArr[item.msgID].products.map((product, prodIndex) => {
                            return (
                                <View style={styles.manualProductEntrySection} >
                                    <Text style={styles.manualSelectionSubHeaderText}>
                                        {"Product"}
                                        {inputArr[item.msgID].products.length > 1 && <Octicons name="diff-removed"
                                            size={16}
                                            color='rgba(150, 100, 100, 0.8)'
                                            style={{ marginLeft: 6 }}
                                            onPress={() => {
                                                setTimeout(() => {
                                                    removeItem(prodIndex);
                                                }, 200);

                                            }} />}
                                        <Octicons name="diff-added"
                                            size={16}
                                            color='rgba(150, 100, 100, 0.8)'
                                            style={{ marginLeft: 6 }}
                                            onPress={() => {
                                                setTimeout(() => {
                                                    addItem(prodIndex);
                                                }, 200);

                                            }} />
                                    </Text>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Text style={styles.manualSelectionText}>
                                            PRODUCT NAME:
                                        </Text>
                                        <Input type={"products/" + prodIndex + "/itemName"}
                                            initialText={product.itemName}
                                            setData={setData} />
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Text style={styles.manualSelectionText}>
                                            PRODUCT LINK:
                                        </Text>
                                        <Input type={"products/" + prodIndex + "/itemLink"}
                                            initialText={product.itemLink}
                                            setData={setData} />
                                    </View>
                                    <Text style={styles.manualSelectionText}>
                                        PRODUCT IMAGE:
                                    </Text>
                                    <View style={styles.itemRow} >
                                        {item.imageArr.map((img) =>
                                            <TouchableOpacity onPress={() => {
                                                let temp = inputArr;
                                                if (temp[item.msgID].products[prodIndex].chosenItemImg === img) {
                                                    temp[item.msgID].products[prodIndex].chosenItemImg = "";
                                                }
                                                else {
                                                    temp[item.msgID].products[prodIndex].chosenItemImg = img;
                                                }
                                                setInputArr(temp);
                                                setTrigger(!trigger);
                                            }}
                                                containerStyle={[styles.listedImageWrapper,
                                                product.chosenItemImg === img ? {
                                                    shadowColor: "#55bbdd",
                                                    shadowOpacity: 1,
                                                    shadowRadius: 7
                                                } : {
                                                    shadowColor: "black",
                                                }]}>
                                                <Image source={{ uri: img }}
                                                    style={styles.listedImageStyle}
                                                    resizeMode={"contain"}
                                                    resizeMethod={"scale"} />
                                            </TouchableOpacity>)}
                                    </View>
                                </View>
                            )
                        })}

                        <View style={styles.collapsibleView} >
                            <div style={{
                                fontSize: 12,
                                color: '#222',
                                backgroundColor: "white",
                                padding: 15,
                                height: '100%',
                                width: '49.5%',
                                overflow: 'scroll',
                            }} dangerouslySetInnerHTML={{ __html: item.msgHTML }} />
                            <Text style={styles.collapsibleHTMLText} >
                                {item.msgHTML}
                            </Text>
                        </View>
                    </View>}
            </View>
        )
    }

    const FlatListHeader = () => {
        return (
            <View style={{ height: 70 }} />
        )
    }

    return (ready ?
        <LinearGradient style={styles.readyContainer}
            locations={[0, 1]}
            colors={["#eeEfEf", "#EDF6F6"]}>
            <FlatList
                data={emailArr}
                extraData={trigger}
                keyExtractor={(item) => item.msgID + trigger}
                renderItem={renderItem}
                fadingEdgeLength={10}
                style={styles.flatListStyle}
                ListHeaderComponent={FlatListHeader}
            />
            <Text style={styles.sectionHeader}>PENDING EMAILS</Text>
        </LinearGradient> :
        <View style={styles.notReadyContainer} >
            <Text style={styles.notReadyText} >Please wait while program loads...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    readyContainer: {
        height: Dimensions.get("window").height,
    },
    notReadyContainer: {
        flex: 1,
        backgroundColor: "#eee",
        alignItems: "center",
        justifyContent: "center",
    },
    notReadyText: {
        fontSize: 16,
        fontWeight: "300",
        color: "#337",
    },
    sectionHeader: {
        position: "absolute",
        padding: 10,
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        top: 0,
        fontSize: 18,
        fontWeight: "400",
        color: "rgba(0, 0, 0, 0.7)",
        shadowRadius: 15,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
    },
    flatListStyle: {
        height: "100%",
        width: "100%",
        padding: 10,
    },
    renderItemStyle: {
        flex: 1,
    },
    renderItemTop: {
        padding: 5,
        backgroundColor: "#ccdddf",
        borderRadius: 10,
    },
    categoryText: {
        fontSize: 14,
        color: "#222",
    },
    valueText: {
        color: "#666"
    },
    autoCategoryText: {
        fontSize: 14,
        color: "black",
    },
    autoValueText: {
        color: "#555",
    },
    verticalSeparator: {
        backgroundColor: "#999",
        height: "100%",
        width: 1,
        marginRight: 10,
    },
    horizontalSeparator: {
        backgroundColor: "#999",
        width: "100%",
        height: 1,
        marginVertical: 10,
    },
    includedBrandInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
        padding: 8,
        backgroundColor: "white",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    brandLogo: {
        width: 80,
        height: 80,
        marginRight: 10,
        backgroundColor: "white"
    },
    includedBrandRight: {
        flex: 1,
    },
    itemRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        overflow: "scroll"
    },
    itemImage: {
        width: 80,
        height: 80,
        margin: 5,
        marginRight: 5,
    },
    collapsibleView: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 500,
        marginHorizontal: 20,
    },
    manualEntryHeaderText: {
        fontSize: 16,
        fontWeight: "700",
        paddingLeft: 2,
        color: 'rgba(150, 100, 100, 0.5)',
    },
    saveButton: {
        color: 'rgba(150, 100, 100, 0.5)',
        fontSize: 13,
        textAlign: "center",
        textAlignVertical: "center",
        paddingHorizontal: 10,
        paddingVertical: 7,
        marginRight: 1,
        borderRadius: 5,
        borderWidth: 0.1,
        borderColor: 'rgba(150, 100, 100, 0.5)',
        backgroundColor: 'rgba(150, 100, 100, 0.1)',
    },
    manualBrandEntrySection: {
        backgroundColor: "#efeeee",
        borderWidth: 0.1,
        borderColor: "#dfdddd",
        marginBottom: 15,
        marginHorizontal: 20,
        paddingBottom: 7,
        borderRadius: 5
    },
    manualProductEntrySection: {
        backgroundColor: "#efecec",
        borderWidth: 0.1,
        borderColor: "#dedcdc",
        marginBottom: 10,
        marginHorizontal: 20,
        paddingBottom: 7,
        borderRadius: 5
    },
    manualSelectionSubHeaderText: {
        fontSize: 14.5,
        padding: 10,
        justifyContent: "center",
        fontWeight: "600",
        color: "#123",
        backgroundColor: 'rgba(150, 100, 100, 0.3)',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    manualSelectionText: {
        fontSize: 12,
        fontWeight: "500",
        color: "#567",
        paddingLeft: 10,
        paddingRight: 4,
        paddingVertical: 6,
    },
    listedImageWrapper: {
        borderRadius: 15,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 5,
        shadowOpacity: 0.2,
        shadowColor: "black",
        overflow: "hidden",
        marginHorizontal: 10,
        marginVertical: 5,
    },
    listedImageStyle: {
        height: 90,
        width: 90,
        overflow: "hidden",
    },
    listedURLStyle: {
        fontSize: 9,
        padding: 5,
        textAlign: "center",
        textAlignVertical: "center",
        backgroundColor: "white",
    },
    collapsibleHTMLText: {
        fontSize: 12,
        padding: 15,
        backgroundColor: "white",
        height: "100%",
        width: "49.5%",
        overflow: "scroll",
    }
})

export default TeamTools;



/* {item.urlArr.map((url) => {
    return (
        <TouchableOpacity onPress={() => {
            let temp = inputArr;
            if (temp[item.msgID].brandLink === url) {
                temp[item.msgID].brandLink = "";
            }
            else {
                temp[item.msgID].brandLink = url;
            }
            setInputArr(temp);
            setTrigger(!trigger);
        }}
            containerStyle={[styles.listedImageWrapper,
            inputArr[item.msgID].brandLink === url ? {
                shadowColor: "#55bbdd",
                shadowOpacity: 1,
                shadowRadius: 7
            } : {
                shadowColor: "black",
            }]}>
            <Text style={styles.listedURLStyle}>{url}</Text>
        </TouchableOpacity>
    )
})} */