import React, { useContext, useState } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
    Alert
} from 'react-native';
import AppContext from '../data/AppContext';
import * as Google from 'expo-google-app-auth';
import { firebase } from '../data/firebase';
import "firebase/firestore";
import "firebase/auth";
import { showMessage } from "react-native-flash-message";
import Cookies from 'js-cookie';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function SignIn({ navigation }) {

    const auth = firebase.auth();
    const firestore = firebase.firestore();

    const stream = require('getstream');

    const [signInButtonOpen, setSignInButtonOpen] = useState(false);
    const [signUpButtonOpen, setSignUpButtonOpen] = useState(false);
    const [emailAuthOpen, setEmailAuthOpen] = useState(false);

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;

    const buttonFontSize = 23;
    const buttonHeight = 47;
    const buttonBorderRadius = 15;

    const smallTextHeight = 30;
    const itemHeight = 45;

    const popUpBackground = "#202f35";

    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [currentTextInput, setCurrentTextInput] = useState();

    const [selected, setSelected] = useState('Gmail');

    const { setUser, setUserToken, setUID } = useContext(AppContext);
    const labelSources = {
        Gmail: "gmail",
        Yahoo: "yahoo",
        Outlook: "microsoft-outlook"
    }

    function PopupWrapper({ children }) {
        return (
            <View
                //behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{
                    flex: 1,
                    position: 'absolute',
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        width: "100%",
                        height: "100%",
                    }}
                    onPress={() => {
                        setSignInButtonOpen(false);
                        setSignUpButtonOpen(false);
                        setEmailAuthOpen(false);
                        setName("");
                        setUserName("");
                        setEmail("");
                        setPassword("");
                    }}
                />
                <View
                    style={{
                        alignContent: 'center',
                        justifyContent: 'center',
                        width: "85%",
                        backgroundColor: popUpBackground,
                        borderRadius: 30
                    }}>
                    {children}
                </View>
            </View>
        )
    }

    function loginUser() {
        console.log("email: ###" + email + "###");
        console.log("password: ###" + password + "###  type: " + (typeof password));
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log("logged in");
                var uid = userCredential.user.uid;
                firestore.collection('UserBase').doc(uid).get().then((doc) => {
                    if (doc.exists) {
                        setUser(doc.data().userName);
                        //setUserToken(doc.data().userToken);
                        setUID(uid);
                        navigation.navigate("Profile", { user: userName });
                    }
                    else {
                        console.log("No such document!");
                    }
                }).catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    Alert.alert(
                        "Please try again:",
                        errorMessage,
                        [{
                            text: "Okay",
                            onPress: () => { }
                        }])
                });
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                Alert.alert(
                    "Please try again:",
                    errorMessage,
                    [{
                        text: "Okay",
                        onPress: () => { }
                    }])
            });
    }

    function In() {
        return (
            <View
                style={{
                    flex: 1,
                    position: 'absolute',
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        width: "100%",
                        height: "100%",
                    }}
                    onPress={() => {
                        setSignInButtonOpen(false);
                        setEmail("");
                        setPassword("");
                    }} />
                <View
                    style={{
                        alignContent: 'center',
                        justifyContent: 'center',
                        width: "85%",
                        backgroundColor: popUpBackground,
                        borderRadius: 30
                    }}>
                    <Text
                        style={{
                            fontSize: 25,
                            color: 'white',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginTop: 15,
                            marginBottom: 10
                        }}>
                        SoSh WRLD
                    </Text>
                    <View
                        // email box
                        style={{
                            marginHorizontal: 30,
                            marginVertical: 5,
                            backgroundColor: 'rgba(255, 255, 255, 0.22)',
                            borderRadius: 10
                        }}>
                        <TextInput
                            style={{
                                fontSize: 18,
                                borderBottomColor: 'rgba(255, 255, 255, 0.5)',
                                color: 'white',
                                marginBottom: 7,
                                marginTop: 7.2,
                                marginHorizontal: 10,
                                height: 28,
                            }}
                            onFocus={() => { setCurrentTextInput("inEmail") }}
                            autoFocus={currentTextInput === "inEmail"}
                            onChangeText={setEmail}
                            value={email}
                            placeholder="Your Email"
                            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                        />
                    </View>
                    <View
                        style={{
                            marginHorizontal: 30,
                            marginTop: 5,
                            marginBottom: 15,
                            backgroundColor: 'rgba(255, 255, 255, 0.22)',
                            borderRadius: 10
                        }}>
                        <TextInput
                            style={{
                                fontSize: 18,
                                borderBottomColor: 'rgba(255, 255, 255, 0.5)',
                                color: 'white',
                                marginBottom: 7,
                                marginTop: 7.2,
                                marginHorizontal: 10,
                                height: 28,
                            }}
                            secureTextEntry={true}
                            onFocus={() => { setCurrentTextInput("inPassword") }}
                            autoFocus={currentTextInput === "inPassword"}
                            onChangeText={setPassword}
                            value={password}
                            placeholder="Password"
                            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={loginUser}
                        style={{
                            marginHorizontal: 30,
                            marginTop: 5,
                            marginBottom: 15,
                            backgroundColor: "#83F52C",
                            borderRadius: 10
                        }}>
                        <Text
                            style={{
                                fontSize: 20,
                                textAlign: 'center',
                                fontWeight: 'bold',
                                marginVertical: 10
                            }}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const googleAuth = async () => {
        try {
            const { type, accessToken, refreshToken } = await Google.logInAsync({
                iosClientId: "342162757131-c1p9md1c4eckqg10u0e1c7dfsdbi9qbf.apps.googleusercontent.com",
                androidClientId: "342162757131-smm49dc990qigl9agsg71j3kkk8uqutj.apps.googleusercontent.com",
                scopes: ['https://www.googleapis.com/auth/gmail.readonly']
            });
            if (type === 'success') {
                console.log("success authenticating");
                const data = { gmail_access_token: accessToken, gmail_refresh_token: refreshToken };
                fetch('https://soshwrld.com/access', {
                    method: 'POST',
                    headers: {
                        'Accept': "application/json",
                        'Content-Type': 'application/json',
                        "CSRF-Token": Cookies.get("XSRF-TOKEN")
                    },
                    body: JSON.stringify(data),
                });
                firestore.collection('UserBase').doc(firebase.auth().currentUser.uid).get().then((doc) => {
                    if (doc.exists) {

                        // user ID
                        const userName = doc.data().userName;

                        // userToken for Stream
                        //const userToken = doc.data().userToken;

                        // FINALLY logging in after sign-up
                        setUser(userName);
                        //setUserToken(userToken);
                        navigation.navigate("Profile", { user: userName });
                    }
                    else {
                        console.log("No such document!");
                    }
                }).catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    Alert.alert(
                        "Please try again:",
                        errorMessage,
                        [{
                            text: "Okay",
                            onPress: () => { }
                        }])
                });
            }
        } catch (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            Alert.alert(
                "Please try again:",
                errorMessage,
                [{
                    text: "Okay",
                    onPress: () => { }
                }])
        }
    };

    function EmailAuth() {
        return (
            <PopupWrapper>
                <Text
                    style={{
                        fontSize: 25,
                        color: 'white',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginTop: 15,
                        marginBottom: 10
                    }}>
                    SoSh WRLD
                </Text>
                <Text
                    style={{
                        fontSize: 19,
                        color: 'white',
                        textAlign: 'center',
                        marginBottom: 25
                    }}>
                    Last Step: Email Verification
                </Text>
                <View style={{
                    justifyContent: 'center',
                    marginHorizontal: 30
                }}
                >
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
                            top: 0,
                            marginLeft: "15%",
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
                <TouchableOpacity
                    onPress={() => {
                        if (selected === "Gmail") {
                            googleAuth();
                        }
                    }}
                    style={{
                        marginHorizontal: 30,
                        marginTop: 16,
                        marginBottom: 15,
                        backgroundColor: "#83F52C",
                        borderRadius: 10
                    }}>
                    <Text
                        style={{
                            fontSize: 20,
                            textAlign: 'center',
                            fontWeight: 'bold',
                            marginVertical: 10
                        }}>
                        Authenticate
                    </Text>
                </TouchableOpacity>
            </PopupWrapper>
        )
    }

    function createUser() {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log("user created");

                // STREAM (wait can I do this from my end?)
                //const userToken = client.createUserToken(userName);
                //const userToken = "getUserTokenSomehow";
                var data = {
                    name: name,
                    userName: userName,
                    email: email,
                    password: password,
                    uid: userCredential.user.uid,
                    // each user's feed can be retrieved using userToken
                    //userToken: userToken
                }
                console.log("!!!signed in currently with uid: " + firebase.auth().currentUser.uid);
                firestore.collection("UserBase").doc(userCredential.user.uid).set(data).then(() => { });
                setSignUpButtonOpen(false);
                setEmailAuthOpen(true);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                Alert.alert(
                    "Please try again:",
                    errorMessage,
                    [{
                        text: "Okay",
                        onPress: () => { }
                    }])
            });
    }

    function Up() {
        return (
            <View
                style={{
                    flex: 1,
                    position: 'absolute',
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        width: "100%",
                        height: "100%",
                    }}
                    onPress={() => {
                        setSignUpButtonOpen(false);
                        setName("");
                        setUserName("");
                        setEmail("");
                        setPassword("");
                    }} />
                <View
                    style={{
                        width: "85%",
                        backgroundColor: popUpBackground,
                        borderRadius: 30
                    }}>
                    <Text
                        style={{
                            fontSize: 25,
                            color: 'white',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginTop: 15,
                            marginBottom: 10
                        }}>
                        SoSh WRLD
                    </Text>
                    <View
                        style={{
                            marginHorizontal: 30,
                            marginVertical: 5,
                            backgroundColor: 'rgba(255, 255, 255, 0.22)',
                            borderRadius: 10
                        }}>
                        <TextInput
                            style={{
                                fontSize: 18,
                                borderBottomColor: 'rgba(255, 255, 255, 0.5)',
                                color: 'white',
                                marginBottom: 7,
                                marginTop: 7.2,
                                marginHorizontal: 10,
                                height: 28,
                            }}
                            onFocus={() => { setCurrentTextInput("onName") }}
                            autoFocus={currentTextInput === "onName"}
                            onChangeText={setName}
                            defaultValue={name}
                            placeholder="Your Name"
                            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                        />
                    </View>
                    <View
                        style={{
                            marginHorizontal: 30,
                            marginVertical: 5,
                            backgroundColor: 'rgba(255, 255, 255, 0.22)',
                            borderRadius: 10
                        }}>
                        <TextInput
                            style={{
                                fontSize: 18,
                                borderBottomColor: 'rgba(255, 255, 255, 0.5)',
                                color: 'white',
                                marginBottom: 7,
                                marginTop: 7.2,
                                marginHorizontal: 10,
                                height: 28,
                            }}
                            onFocus={() => { setCurrentTextInput("onUserName") }}
                            autoFocus={currentTextInput === "onUserName"}
                            onChangeText={setUserName}
                            defaultValue={userName}
                            placeholder="Username"
                            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                        />
                    </View>
                    <View
                        style={{
                            marginHorizontal: 30,
                            marginVertical: 5,
                            backgroundColor: 'rgba(255, 255, 255, 0.22)',
                            borderRadius: 10
                        }}>
                        <TextInput
                            style={{
                                fontSize: 18,
                                borderBottomColor: 'rgba(255, 255, 255, 0.5)',
                                color: 'white',
                                marginBottom: 7,
                                marginTop: 7.2,
                                marginHorizontal: 10,
                                height: 28,
                            }}
                            onFocus={() => { setCurrentTextInput("onEmail") }}
                            autoFocus={currentTextInput === "onEmail"}
                            onChangeText={setEmail}
                            value={email}
                            placeholder="Your Email"
                            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                        />
                    </View>
                    <View
                        style={{
                            marginHorizontal: 30,
                            marginTop: 5,
                            marginBottom: 15,
                            backgroundColor: 'rgba(255, 255, 255, 0.22)',
                            borderRadius: 10
                        }}>
                        <TextInput
                            style={{
                                fontSize: 18,
                                borderBottomColor: 'rgba(255, 255, 255, 0.5)',
                                color: 'white',
                                marginBottom: 7,
                                marginTop: 7.2,
                                marginHorizontal: 10,
                                height: 28,
                            }}
                            secureTextEntry={true}
                            onFocus={() => { setCurrentTextInput("onPassword") }}
                            autoFocus={currentTextInput === "onPassword"}
                            onChangeText={setPassword}
                            value={password}
                            placeholder="Password"
                            placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={createUser}
                        style={{
                            marginHorizontal: 30,
                            marginTop: 5,
                            marginBottom: 15,
                            backgroundColor: "#83F52C",
                            borderRadius: 10
                        }}>
                        <Text
                            style={{
                                fontSize: 20,
                                textAlign: 'center',
                                fontWeight: 'bold',
                                marginVertical: 10
                            }}>
                            Sign Up!
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <View
                style={{
                    width: windowWidth,
                    height: windowHeight,
                    backgroundColor: 'black'
                }}
            >
                <Image
                    source={require('../assets/SoShNavLogo.png')}
                    style={{
                        width: "60%",
                        height: "52%",
                        resizeMode: 'contain',
                        alignSelf: 'center',
                        marginTop: 60,
                    }}
                />
                <View
                    style={{
                        marginTop: 55,
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            setSignInButtonOpen(true);
                            showMessage({
                                message: "Press anywhere to exit",
                                type: "info",
                            });
                        }}
                        style={{
                            paddingHorizontal: 25,
                            paddingVertical: 15,
                            borderRadius: buttonBorderRadius,
                            backgroundColor: "#56626f",
                            marginRight: 30,
                            justifyContent: 'center',
                            alignSelf: 'flex-end'
                        }}>
                        <Text style={{
                            textAlign: 'center',
                            color: '#fffbfb',
                            fontSize: buttonFontSize, fontWeight: 'bold'
                        }}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        marginTop: 15
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            setSignUpButtonOpen(true);
                            showMessage({
                                message: "Press anywhere to exit",
                                type: "info",
                            });
                        }}
                        style={{
                            paddingHorizontal: 32,
                            paddingVertical: 15,
                            borderRadius: buttonBorderRadius,
                            backgroundColor: "#83F52C",
                            marginRight: 30,
                            justifyContent: 'center',
                            alignSelf: 'flex-end'
                        }}>
                        <Text style={{
                            textAlign: 'center',
                            color: 'black',
                            fontSize: buttonFontSize,
                            fontWeight: 'bold'
                        }}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>

            {signInButtonOpen && In()}

            {signUpButtonOpen && Up()}

            {emailAuthOpen && EmailAuth()}

        </ScrollView>
    )
}

export default SignIn;
