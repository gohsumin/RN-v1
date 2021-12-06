import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-gesture-handler';
import { firebase, firebaseConfig } from '../../data/firebase';
import "firebase/firestore";
import "firebase/auth";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

function EmailVerification() {

    const tabBarHeight = useBottomTabBarHeight();
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;
    const smallTextHeight = 30;
    const itemHeight = 45;
    const paddingHeight = 10;
    const [selected, setSelected] = useState('Gmail');
    const [email, setEmail] = useState("");
    const [done, setDone] = useState(false);
    const labelSources = {
        Gmail: "gmail",
        Yahoo: "yahoo",
        Outlook: "microsoft-outlook"
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                width: windowWidth,
                height: windowHeight,
                position: 'absolute',
                backgroundColor: 'black',
                alignContent: 'center',
                justifyContent: 'center',
                paddingTop: 15,
                paddingHorizontal: 40,
            }}>


            {/* Top Section */}
            <View style={{ height: "30%" }}>
                <Image
                    source={(require('../../assets/SoShNavLogo.png'))}
                    style={{
                        flex: 1.3,
                        resizeMode: 'contain',
                        width: "50%",
                        alignSelf: 'center',
                    }}
                />
            </View>

            {/* main area */}
            <View style={{
                flex: 1.8,
            }}>
                <Text style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: 27,
                    fontWeight: '400',
                    textAlignVertical: 'top',
                    textAlign: 'center',
                    marginBottom: 5,
                    height: 45
                }}>
                    Verify your Email
                </Text>

                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(165, 200, 255, 0.17)',
                    borderRadius: 35,
                    paddingHorizontal: 15,
                    justifyContent: 'space-evenly'
                }}>

                    <View style={{
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: 16,
                            fontWeight: '400',
                            height: smallTextHeight
                        }}>
                            Email Provider
                        </Text>
                        <View style={{
                            width: "100%",
                            height: itemHeight,
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: 12,
                            justifyContent: 'center',
                            paddingHorizontal: 15
                        }}>
                            <MaterialCommunityIcons name={labelSources[selected]} size={24} color="white" />
                        </View>

                        <Picker
                            selectedValue={selected}
                            placeholder={"Select your email provider"}
                            style={{
                                color: 'white',
                                width: "85%",
                                height: itemHeight,
                                position: 'absolute',
                                top: smallTextHeight,
                                marginLeft: "15%"
                            }}
                            itemStyle={{
                                height: 50
                            }}
                            onValueChange={(itemValue, itemIndex) => setSelected(itemValue)}
                        >
                            <Picker.Item label="Gmail" value="Gmail" />
                            <Picker.Item label="Outlook" value="Outlook" />
                            <Picker.Item label="Yahoo" value="Yahoo" />
                        </Picker>
                    </View>


                    <View style={{
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: 16,
                            fontWeight: '400',
                            height: smallTextHeight
                        }}>
                            Email Address
                        </Text>
                        <View style={{
                            height: itemHeight,
                            width: "100%",
                            padding: 10,
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: 12,
                        }}>
                            <TextInput
                                style={{
                                    borderBottomWidth: 0.4,
                                    borderBottomColor: 'rgba(225, 225, 225, 0.5)',
                                    color: 'white',
                                    fontSize: 15,
                                    fontWeight: '400',
                                }}
                                value={email}
                                onChange={setEmail}
                                onSubmitEditing={() => {
                                    // some action with email
                                    if (selected == "Gmail") {
                                        //ask them to authorize email then >>>>>>>> 
                                        fetch("https://soshworld.com/access", {
                                            method: "POST",
                                            headers: {
                                                Accept: "application/json",
                                                "Content-Type": "application/json",
                                                "CSRF-Token": Cookies.get("XSRF-TOKEN"),
                                            },
                                            body: JSON.stringify({ gmail_access_token: accessToken }),
                                        })
                                        //------------------------------------->
                                    } else if (selected == "Outlook") {



                                    } else if (selected == "Yahoo") {

                                    } else if (selected == "Hotmail") {

                                    }
                                }}
                            />
                        </View>
                    </View>




                </View>








            </View>

            {/* some button here */}
            {/* Bottom Section */}
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <TouchableOpacity
                    disabled={false}
                    activeOpacity={1}
                    style={{
                        flex: 1, justifyContent: 'center', height: "100%"
                    }}
                    onPress={(event) => {
                        // enter app
                    }}
                >
                    <View
                        style={{
                            width: "100%",
                            height: 50,
                            borderRadius: 30,
                            alignSelf: 'center',
                            justifyContent: 'center',
                            backgroundColor: done ? '#196DFF' : 'rgba(255, 255, 255, 0.3)',
                        }}>
                        <Text style={{
                            color: done ? 'white' : 'rgba(255, 255, 255, 0.5)',
                            fontSize: 20, fontWeight: '500',
                            textAlign: 'center',
                            textAlignVertical: 'center'
                        }}>
                            Some Button
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ height: tabBarHeight }} />


        </SafeAreaView>
    )
}

export default EmailVerification;