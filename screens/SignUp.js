import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';
import AppContext from '../data/AppContext';
import { firebase, firebaseConfig } from '../data/firebase';
import "firebase/firestore";
import "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeycodeInput } from 'react-native-keycode';
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

function SignUp(props) {

    const [number, setNumber] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [userName, setUserName] = useState();
    const [verified, setVerified] = useState(false);
    const tabBarheight = useBottomTabBarHeight();

    return (

        <KeyboardAvoidingView
            behavior={'padding'}
            style={{
                flex: 1,
                position: 'absolute',
                width: "100%",
                height: "100%",
                backgroundColor: 'black',
                alignContent: 'center',
                justifyContent: 'center',
                paddingTop: 15,
                paddingHorizontal: 30
            }}>
            <View style={{ flex: 1.5 }}>
                <View style={{ flex: 0.5 }} />
                <Image
                    source={(require('../assets/SoShNavLogo.png'))}
                    style={{
                        flex: 1.3,
                        resizeMode: 'contain',
                        width: "45%",
                        alignSelf: 'center',
                    }}
                />
                <Text style={{
                    flex: 1,
                    color: 'white',
                    fontSize: 27,
                    fontWeight: '700',
                    textAlignVertical: 'top',
                    textAlign: 'center'
                }}>
                    Create an Account
                </Text>
            </View>

            <View style={{ flex: 2.3 }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: 16,
                        fontWeight: '400',
                        marginLeft: 10,
                        marginBottom: 3
                    }}>
                        Name
                    </Text>
                    <View
                        style={{
                            backgroundColor: 'rgba(165, 200, 255, 0.17)',
                            borderRadius: 15,
                            flexDirection: 'row'
                        }}>
                        <TextInput
                            style={{
                                flex: 1,
                                fontSize: 18,
                                borderBottomColor: 'rgba(255, 255, 255, 0.5)',
                                borderBottomWidth: 0.5,
                                color: 'white',
                                marginBottom: 7,
                                marginTop: 7.2,
                                height: 28,
                                marginLeft: 20,
                            }}
                            onChangeText={setName}
                            value={name}
                            placeholder="First"
                            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                        />
                        <View
                            style={{
                                width: 0,
                                borderWidth: 0.5,
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                                marginBottom: 7,
                                marginTop: 7.2,
                                marginHorizontal: 10
                            }} />
                        <TextInput
                            style={{
                                flex: 1,
                                fontSize: 18,
                                borderBottomColor: 'rgba(255, 255, 255, 0.5)',
                                borderBottomWidth: 0.5,
                                color: 'white',
                                marginBottom: 7,
                                marginTop: 7.2,
                                height: 28,
                                marginRight: 20,
                            }}
                            onChangeText={setName}
                            value={name}
                            placeholder="Last"
                            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                        />
                    </View>
                </View>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: 16,
                        fontWeight: '400',
                        marginLeft: 10,
                        marginBottom: 3
                    }}>
                        User Name
                    </Text>
                    <View
                        style={{
                            backgroundColor: 'rgba(165, 200, 255, 0.17)',
                            borderRadius: 15,
                        }}>
                        <TextInput
                            style={{
                                fontSize: 18,
                                borderBottomColor: 'rgba(255, 255, 255, 0.5)',
                                borderBottomWidth: 0.5,
                                color: 'white',
                                marginBottom: 7,
                                marginTop: 7.2,
                                height: 28,
                                marginHorizontal: 20,
                            }}
                            onChangeText={setUserName}
                            value={userName}
                            placeholder="example.username"
                            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                        />
                    </View>
                </View>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: 16,
                        fontWeight: '400',
                        marginLeft: 10,
                        marginBottom: 3
                    }}>
                        Phone Number
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: 'rgba(165, 200, 255, 0.17)',
                        borderRadius: 15,
                    }}>
                        <TextInput
                            style={{
                                flex: 3.2,
                                fontSize: 18,
                                borderBottomColor: 'rgba(255, 255, 255, 0.5)',
                                borderBottomWidth: 0.5,
                                color: 'white',
                                marginBottom: 7,
                                marginTop: 7.2,
                                height: 28,
                                marginLeft: 20,
                            }}
                            onChangeText={setNumber}
                            value={number}
                            placeholder="+1 999 999 9999"
                            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                        />
                        <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={(event) => {
                                props.onPhoneNumberSubmit(event);
                            }}
                        >
                            <Text style={{
                                color: '#59a4ff',
                                textAlign: 'right',
                                fontWeight: '500',
                                marginBottom: 7,
                                marginTop: 7.2,
                                marginLeft: 5,
                                marginRight: 15,
                            }}>
                                VERIFY
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: 16,
                        fontWeight: '400',
                        marginLeft: 10,
                        marginBottom: 3
                    }}>
                        Email
                    </Text>
                    <View
                        style={{
                            backgroundColor: 'rgba(165, 200, 255, 0.17)',
                            borderRadius: 15,
                        }}>
                        <TextInput
                            style={{
                                fontSize: 18,
                                borderBottomColor: 'rgba(255, 255, 255, 0.5)',
                                borderBottomWidth: 0.5,
                                color: 'white',
                                marginBottom: 7,
                                marginTop: 7.2,
                                height: 28,
                                marginHorizontal: 20,
                            }}
                            onChangeText={setEmail}
                            value={email}
                            placeholder="exampleEmail@gmail.com"
                            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                        />
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <TouchableOpacity
                    disabled={verified}
                    activeOpacity={1}
                    style={{
                        flex: 1, justifyContent: 'center', height: "100%"
                    }}
                >
                    <View
                        style={{
                            width: "100%",
                            height: 50,
                            borderRadius: 30,
                            alignSelf: 'center',
                            justifyContent: 'center',
                            backgroundColor: verified ? '#196DFF' : '#0D2060',
                        }}>
                        <Text style={{
                            color: verified ? 'white' : 'rgba(255, 255, 255, 0.5)',
                            fontSize: 20, fontWeight: '500',
                            textAlign: 'center',
                            textAlignVertical: 'center'
                        }}>
                            Create Account
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ height: tabBarheight }} />
        </KeyboardAvoidingView>
    );
}

export default SignUp;