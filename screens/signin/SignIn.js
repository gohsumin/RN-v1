import React, { useContext, useState, useRef } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
    StatusBar,
    Alert
} from 'react-native';
import AppContext from '../../data/AppContext';
import PostsContext from '../../data/PostsContext';
import * as Google from 'expo-google-app-auth';
import { firebase } from '../../data/firebase';
import "firebase/firestore";
import "firebase/auth";
import { showMessage } from "react-native-flash-message";
import Cookies from 'js-cookie';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function SignIn({ navigation }) {

    const auth = firebase.auth();
    const firestore = firebase.firestore();

    const [signInButtonOpen, setSignInButtonOpen] = useState(false);
    const [signUpButtonOpen, setSignUpButtonOpen] = useState(false);
    const [emailAuthOpen, setEmailAuthOpen] = useState(false);

    const windowHeight = Dimensions.get('window').height - StatusBar.currentHeight;
    const windowWidth = Dimensions.get('window').width;

    const buttonFontSize = 23;
    const buttonHeight = 47;
    const buttonBorderRadius = 15;

    const smallTextHeight = 30;
    const itemHeight = 45;

    const popUpBackground = "#202225";

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [currentTextInput, setCurrentTextInput] = useState();

    const inEmailRef = useRef();
    const inPasswordRef = useRef();
    const upUserNameRef = useRef();
    const upEmailRef = useRef();
    const upPasswordRef = useRef();

    const [selected, setSelected] = useState('Gmail');

    const { setUser, setUID } = useContext(AppContext);

    const labelSources = {
        Gmail: "gmail",
        Yahoo: "yahoo",
        Outlook: "microsoft-outlook"
    }
    const { getTimeline } = useContext(PostsContext);

    function PopupWrapper({ children }) {
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
                        setUserName("");
                        setEmail("");
                        setPassword("");
                    }}
                />
                <View
                    style={{
                        position: 'absolute',
                        alignContent: 'center',
                        width: "85%",
                        backgroundColor: popUpBackground,
                        borderRadius: 30,
                        paddingBottom: 20
                    }}>
                    <Image
                        style={{
                            alignSelf: 'center',
                            marginTop: 10,
                            marginBottom: 15,
                            height: 40,
                            borderWidth: 1,
                        }}
                        resizeMode={'contain'}
                        fadeDuration={0}
                        source={(require("../assets/SoShNavLogo.png"))} />
                    {children}
                </View>
            </View>
        )
    }

    function loginUser() {
        console.log("loginUser");
        console.log("email: ###" + email + "###");
        console.log("password: ###" + password + "###  type: " + (typeof password));
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log("logged in");
                var uid = userCredential.user.uid;
                firestore.collection('User-Profile').doc(uid).get().then((doc) => {
                    if (doc.exists) {
                        setUser(doc.data().userName);
                        setUID(uid);
                        getTimeline();
                        navigation.navigate("Main", { uid: uid });
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

    const renderInInputs = () => {
        return (
            <View
                style={{
                    position: 'absolute',
                    marginTop: 65,
                    alignSelf: 'center',
                    alignContent: 'center',
                    width: "80%",
                }}>
                <TextInput
                    ref={inEmailRef}
                    style={{
                        fontSize: 18,
                        borderBottomColor: 'rgba(255, 255, 255, 0.5)',
                        color: 'white',
                        justifyContent: 'center',
                        paddingHorizontal: 13,
                        height: 40,
                    }}
                    onEndEditing={(e) => {
                        console.log("onEndEditing; ");
                        const txt = e.nativeEvent.text;
                        setEmail(txt);
                        setTimeout(() => {
                            console.log("in setTimeout");
                            inEmailRef.current.setNativeProps({
                                text: txt
                            });
                        }, 10);
                    }}
                    placeholder="Email"
                    placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                    keyboardType="email-address"
                />
                <TextInput
                    ref={inPasswordRef}
                    style={{
                        fontSize: 18,
                        borderBottomColor: 'rgba(255, 255, 255, 0.5)',
                        color: 'white',
                        justifyContent: 'center',
                        paddingHorizontal: 13,
                        height: 40,
                        marginTop: 10,
                    }}
                    secureTextEntry={true}
                    onEndEditing={(e) => {
                        console.log("onEndEditing; ");
                        const txt = e.nativeEvent.text;
                        setPassword(txt);
                        setTimeout(() => {
                            console.log("in setTimeout");
                            inPasswordRef.current.setNativeProps({
                                text: txt
                            });
                        }, 10);
                    }}
                    placeholder="Password"
                    placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                />
            </View>
        )
    }

    function In() {
        return (
            <PopupWrapper>
                <View
                    // email box
                    style={{
                        alignSelf: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 10,
                        width: "80%",
                        height: 40
                    }} />
                <View
                    // password box
                    style={{
                        alignSelf: 'center',
                        marginTop: 10,
                        marginBottom: 15,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 10,
                        width: "80%",
                        height: 40
                    }} />
                {renderInInputs()}
                <TouchableOpacity
                    onPress={() => {
                        setTimeout(() => {
                            loginUser();
                        }, 30);
                    }}
                    style={{
                        marginHorizontal: 30,
                        marginTop: 5,
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
            </PopupWrapper>
        )
    }

    const googleAuth = async () => {
        console.log("googleAuth");
        try {
            const { type, accessToken, refreshToken } = await Google.logInAsync({
                iosClientId: "342162757131-c1p9md1c4eckqg10u0e1c7dfsdbi9qbf.apps.googleusercontent.com",
                androidClientId: "342162757131-smm49dc990qigl9agsg71j3kkk8uqutj.apps.googleusercontent.com",
                scopes: ['https://www.googleapis.com/auth/gmail.readonly']
            });
            if (type === 'success') {
                console.log("success authenticating");
                const data = { gmail_access_token: accessToken, gmail_refresh_token: refreshToken };
                // is the bottom actually working??
                fetch('https://soshwrld.com/access', {
                    method: 'POST',
                    headers: {
                        'Accept': "application/json",
                        'Content-Type': 'application/json',
                        "CSRF-Token": Cookies.get("XSRF-TOKEN")
                    },
                    body: JSON.stringify(data),
                });
                /////

                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        console.log("user created");
                        var data = {
                            userName: userName,
                            email: email,
                            password: password,
                            followersCount: 0,
                            followingCount: 0,
                            timestamp: new Date() / 1000,
                            userDescription: "🌱",
                            userImageURL: "https://pbs.twimg.com/profile_images/634514155261833216/czgYrPLQ_400x400.jpg",
                        }
                        console.log("!!!signed in currently with uid: " + firebase.auth().currentUser.uid + " === " + userCredential.user.uid);
                        firestore.collection("User-Profile").doc(userCredential.user.uid).set(data).then(() => { });
                        setUser(userName);
                        setUID(firebase.auth().currentUser.uid);
                        getTimeline();
                        navigation.navigate("Main", { user: userName });
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
        setSignUpButtonOpen(false);
        setEmailAuthOpen(true);
    }

    const renderUpInputs = () => {
        return (
            <View
                style={{
                    position: 'absolute',
                    marginTop: 65,
                    alignSelf: 'center',
                    alignContent: 'center',
                    width: "80%",
                }}>
                <TextInput
                    ref={upUserNameRef}
                    style={{
                        fontSize: 18,
                        borderBottomColor: 'rgba(255, 255, 255, 0.5)',
                        color: 'white',
                        justifyContent: 'center',
                        paddingHorizontal: 13,
                        height: 40,
                    }}
                    onEndEditing={(e) => {
                        console.log("onEndEditing; ");
                        const txt = e.nativeEvent.text;
                        setUserName(txt);
                        setTimeout(() => {
                            console.log("in setTimeout");
                            upUserNameRef.current.setNativeProps({
                                text: txt
                            });
                        }, 10);
                    }}
                    placeholder="Username"
                    placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                />
                <TextInput
                    ref={upEmailRef}
                    style={{
                        fontSize: 18,
                        borderBottomColor: 'rgba(255, 255, 255, 0.5)',
                        color: 'white',
                        justifyContent: 'center',
                        paddingHorizontal: 13,
                        height: 40,
                        marginTop: 10,
                    }}
                    onEndEditing={(e) => {
                        console.log("onEndEditing; ");
                        const txt = e.nativeEvent.text;
                        setEmail(txt);
                        setTimeout(() => {
                            console.log("in setTimeout");
                            upEmailRef.current.setNativeProps({
                                text: txt
                            });
                        }, 10);
                    }}
                    placeholder="Email"
                    placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                    keyboardType="email-address"
                />
                <TextInput
                    style={{
                        fontSize: 18,
                        borderBottomColor: 'rgba(255, 255, 255, 0.5)',
                        color: 'white',
                        justifyContent: 'center',
                        paddingHorizontal: 13,
                        height: 40,
                        marginTop: 10,
                    }}
                    secureTextEntry={true}
                    onEndEditing={(e) => {
                        console.log("onEndEditing; ");
                        const txt = e.nativeEvent.text;
                        setPassword(txt);
                        setTimeout(() => {
                            console.log("in setTimeout");
                            upPasswordRef.current.setNativeProps({
                                text: txt
                            });
                        }, 10);
                    }}
                    placeholder="Password"
                    placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                />
            </View>
        )
    }

    function Up() {
        return (

            <PopupWrapper>
                <View
                    // user name box
                    style={{
                        alignSelf: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 10,
                        width: "80%",
                        height: 40
                    }} />
                <View
                    // email box
                    style={{
                        alignSelf: 'center',
                        marginTop: 10,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 10,
                        width: "80%",
                        height: 40
                    }} />
                <View
                    // password box
                    style={{
                        alignSelf: 'center',
                        marginTop: 10,
                        marginBottom: 15,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 10,
                        width: "80%",
                        height: 40
                    }} />
                {renderUpInputs()}
                <TouchableOpacity
                    onPress={() => {
                        setTimeout(() => {
                            createUser();
                        }, 10);
                    }}
                    style={{
                        marginHorizontal: 30,
                        marginTop: 5,
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
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </PopupWrapper>
        )
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <View
                style={{
                    width: windowWidth,
                    height: windowHeight,
                    backgroundColor: 'black',
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
                        position: 'absolute',
                        right: 0,
                        bottom: 130
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
                        position: 'absolute',
                        bottom: 60,
                        right: 0
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
