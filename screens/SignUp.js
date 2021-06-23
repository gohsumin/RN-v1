import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    Platform,
    Dimensions
} from 'react-native';
import AppContext from '../data/AppContext';
import { firebase, firebaseConfig } from '../data/firebase';
import "firebase/firestore";
import "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeycodeInput } from 'react-native-keycode';
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import PhoneVerification from './components/PhoneVerification';

function SignUp(props) {

    const [number, setNumber] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [userName, setUserName] = useState();
    const verified = props.isVerified;
    const tabBarheight = useBottomTabBarHeight();
    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
                flex: 1,
                position: 'absolute',
                width: windowWidth,
                height: windowHeight,
                backgroundColor: 'black',
                alignContent: 'center',
                justifyContent: 'center',
                paddingTop: 15,
                paddingHorizontal: 40
            }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>

                    {/* Top Section */}
                    <View style={{ height: "30%" }}>
                        <Image
                            source={(require('../assets/SoShNavLogo.png'))}
                            style={{
                                flex: 1.3,
                                resizeMode: 'contain',
                                width: "50%",
                                alignSelf: 'center',
                            }}
                        />
                    </View>

                    {/* Form Section */}
                    <View style={{ flex: 1.8, justifyContent: 'space-evenly' }}>

                        <Text style={{
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontSize: 27,
                            fontWeight: '400',
                            textAlignVertical: 'top',
                            textAlign: 'center',
                            marginBottom: 5,
                            height: 45
                        }}>
                            Create an Account
                        </Text>

                        <View style={{
                            flex: 1,
                            backgroundColor: 'rgba(165, 200, 255, 0.17)',
                            borderRadius: 35,
                            paddingHorizontal: 15,
                            justifyContent: 'space-evenly'
                        }}>

                            {/* First and Last Name */}
                            <View style={{
                                justifyContent: 'center',
                            }}>
                                <View
                                    style={{
                                        //backgroundColor: 'rgba(165, 200, 255, 0.17)',
                                        borderRadius: 10,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}>
                                    <TextInput
                                        style={{
                                            width: "47%",
                                            fontSize: 18,
                                            borderBottomColor: 'rgba(255, 255, 255, 0.5)',
                                            borderBottomWidth: 0.5,
                                            color: 'white',
                                            marginBottom: 7,
                                            marginTop: 7.2,
                                            height: 28,
                                        }}
                                        onChangeText={setFirstName}
                                        value={firstName}
                                        placeholder="First Name"
                                        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                                    />
                                    <TextInput
                                        style={{
                                            width: "47%",
                                            fontSize: 18,
                                            borderBottomColor: 'rgba(255, 255, 255, 0.5)',
                                            borderBottomWidth: 0.5,
                                            color: 'white',
                                            marginBottom: 7,
                                            marginTop: 7.2,
                                            height: 28,
                                        }}
                                        onChangeText={setLastName}
                                        value={lastName}
                                        placeholder="Last Name"
                                        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                                    />
                                </View>
                            </View>

                            {/* User Name */}
                            <View style={{
                                justifyContent: 'center',
                            }}>
                                <View
                                    style={{
                                        //backgroundColor: 'rgba(165, 200, 255, 0.17)',
                                        borderRadius: 10,
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
                                        }}
                                        onChangeText={setUserName}
                                        value={userName}
                                        placeholder="User Name"
                                        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                                    />
                                </View>
                            </View>

                            {/* Phone number */}
                            <View style={{
                                justifyContent: 'center',
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    //backgroundColor: 'rgba(165, 200, 255, 0.17)',
                                    borderRadius: 10,
                                    justifyContent: 'space-between'
                                }}>
                                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                        <Text
                                            style={{
                                                width: 17,
                                                fontSize: 18,
                                                borderBottomColor: 'rgba(255, 255, 255, 0.5)',
                                                borderBottomWidth: 0.5,
                                                color: 'rgba(255, 255, 255, 0.6)',
                                                marginBottom: 7,
                                                marginTop: 7.2,
                                                height: 28,
                                            }}>
                                            (+
                                        </Text>
                                        <TextInput
                                            style={{
                                                width: 20,
                                                fontSize: 18,
                                                borderBottomColor: 'rgba(255, 255, 255, 0.5)',
                                                borderBottomWidth: 0.5,
                                                color: 'white',
                                                marginBottom: 7,
                                                marginTop: 7.2,
                                                height: 28
                                            }}
                                        />
                                        <Text
                                            style={{
                                                width: 6,
                                                fontSize: 18,
                                                borderBottomColor: 'rgba(255, 255, 255, 0.5)',
                                                borderBottomWidth: 0.5,
                                                color: 'rgba(255, 255, 255, 0.6)',
                                                marginBottom: 7,
                                                marginTop: 7.2,
                                                height: 28,
                                            }}>
                                            )
                                        </Text>
                                    </View>
                                    <TextInput
                                        style={{
                                            fontSize: 18,
                                            borderBottomColor: 'rgba(255, 255, 255, 0.5)',
                                            borderBottomWidth: 0.5,
                                            color: 'white',
                                            marginBottom: 7,
                                            marginTop: 7.2,
                                            height: 28,
                                            width: "77%"
                                        }}
                                        onChangeText={setNumber}
                                        onEndEditing={() => {
                                            console.log(number);
                                            props.setNumber(number);
                                        }}
                                        onPressOut={() => {
                                            props.setNumber(number);
                                        }}
                                        value={number}
                                        placeholder="Phone Number"
                                        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Bottom Section */}
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <TouchableOpacity
                            disabled={false}
                            activeOpacity={1}
                            style={{
                                flex: 1, justifyContent: 'center', height: "100%"
                            }}
                            onPress={(event) => {
                                props.setNumber(number);
                                props.setUserInfo({
                                    id: userName,
                                    firstName: firstName,
                                    lastName: lastName
                                })
                                // triggers captcha & 
                                props.onPhoneNumberSubmit(event);
                            }}
                        >
                            <View
                                style={{
                                    width: "100%",
                                    height: 50,
                                    borderRadius: 30,
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: verified ? '#196DFF' : 'rgba(255, 255, 255, 0.3)',
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

                </View>
            </TouchableWithoutFeedback>

            {/* {verified &&
                <PhoneVerification
                number={number}
                setVerificationId={props.setVerificationId} />} */}

        </KeyboardAvoidingView>
    );
}

export default SignUp;