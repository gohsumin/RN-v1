import React, { useContext, useState, useRef } from 'react';
import {
    Text,
    View,
    TextInput,
    Animated,
    TouchableOpacity,
    TouchableWithoutFeedback,
    SafeAreaView,
    KeyboardAvoidingView,
    StyleSheet,
    Keyboard,
    Button,
    Image,
    ScrollView,
    Dimensions,
    Alert
} from 'react-native';
import AppContext from '../data/AppContext';
import * as Google from 'expo-google-app-auth';
//import firebase from "firebase/app";
import { firebase, firebaseConfig } from '../data/firebase';
import "firebase/firestore";
import "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import SignUp from './SignUp';
import PhoneVerification from './components/PhoneVerification';
import EmailVerification from './components/EmailVerification';
import { showMessage, hideMessage } from "react-native-flash-message";
import Cookies from 'js-cookie';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

function SignIn({ navigation }) {

    const auth = firebase.auth();
    const firestore = firebase.firestore();

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
   
    const { setUser } = useContext(AppContext);
    const labelSources = {
        Gmail: "gmail",
        Yahoo: "yahoo",
        Outlook: "microsoft-outlook"
    }

    function PopupWrapper({children}) {
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
        console.log("email: ###"+email+"###");
        console.log("password: ###"+password+"###  type: "+(typeof password));
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log("logged in");
                //console.log(userCredential);
                // Signed in
                var uid = userCredential.user.uid;
                firestore.collection('UserBase').doc(uid).get().then((doc) => {
                    if(doc.exists) {
                        console.log("Document data:", doc.data());
                        const userName = doc.data().userName;
                        console.log(userName);
                        console.log(userName);
                        setUser(userName);
                        console.log("signed in");
                        navigation.navigate("Profile", {user: userName});
                    }
                    else {
                        // doc.data() will be undefined in this case
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
                            onPress: () => {}
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
                        onPress: () => {}
                    }])
            });
    }

    function In() {
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
                        }}/>
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
                                            //borderBottomWidth: 0.5,
                                            color: 'white',
                                            marginBottom: 7,
                                            marginTop: 7.2,
                                            marginHorizontal: 10,
                                            height: 28,
                                        }}
                                        onFocus={() => {setCurrentTextInput("inEmail")}}
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
                                            //borderBottomWidth: 0.5,
                                            color: 'white',
                                            marginBottom: 7,
                                            marginTop: 7.2,
                                            marginHorizontal: 10,
                                            height: 28,
                                        }}
                                        onFocus={() => {setCurrentTextInput("inPassword")}}
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
            const { type, accessToken, user, refreshToken, idToken } = await Google.logInAsync({
                iosClientId: "342162757131-c1p9md1c4eckqg10u0e1c7dfsdbi9qbf.apps.googleusercontent.com",
                androidClientId: "342162757131-smm49dc990qigl9agsg71j3kkk8uqutj.apps.googleusercontent.com",
                scopes: ['https://www.googleapis.com/auth/gmail.readonly']
            });
            if (type === 'success') {
                const data = {gmail_access_token: accessToken, gmail_refresh_token: refreshToken};

                const user = firebase.auth().currentUser;
                // console.log("!!!about to save data to user with uid: "+user.uid);
                // user.updateProfile(data).then(() => {});

                fetch('https://soshwrld.com/access', {
                    method: 'POST',
                    headers: {
                        'Accept': "application/json",
                        'Content-Type': 'application/json',
                        "CSRF-Token": Cookies.get("XSRF-TOKEN")
                    },
                    body: JSON.stringify(data),
                  });
                
                  navigation.navigate('Profile', {user: user.userName});
            }
        } catch (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            Alert.alert(
                "Please try again:",
                errorMessage,
                [{
                    text: "Okay",
                    onPress: () => {}
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
                        if(selected === "Gmail") {
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
                var data = {
                    name: name,
                    userName: userName,
                    email: email,
                    password: password,
                    uid: userCredential.user.uid
                }
                console.log("!!!signed in currently with uid: "+firebase.auth().currentUser.uid);
                firestore.collection("UserBase").doc(userCredential.user.uid).set(data).then(() => {});
                setSignInButtonOpen(false);
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
                        onPress: () => {}
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
                        }}/>
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
                                            //borderBottomWidth: 0.5,
                                            color: 'white',
                                            marginBottom: 7,
                                            marginTop: 7.2,
                                            marginHorizontal: 10,
                                            height: 28,
                                        }}
                                        onFocus={() => {setCurrentTextInput("onName")}}
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
                                            //borderBottomWidth: 0.5,
                                            color: 'white',
                                            marginBottom: 7,
                                            marginTop: 7.2,
                                            marginHorizontal: 10,
                                            height: 28,
                                        }}
                                        onFocus={() => {setCurrentTextInput("onUserName")}}
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
                                            //borderBottomWidth: 0.5,
                                            color: 'white',
                                            marginBottom: 7,
                                            marginTop: 7.2,
                                            marginHorizontal: 10,
                                            height: 28,
                                        }}
                                        onFocus={() => {setCurrentTextInput("onEmail")}}
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
                                            //borderBottomWidth: 0.5,
                                            color: 'white',
                                            marginBottom: 7,
                                            marginTop: 7.2,
                                            marginHorizontal: 10,
                                            height: 28,
                                        }}
                                        onFocus={() => {setCurrentTextInput("onPassword")}}
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
        <ScrollView style={{flex: 1 }}>
            <View
                style={{
                    width: windowWidth,
                    height: windowHeight,
                    backgroundColor: 'black'
                }}
            >
                <Image
                    source={require('../assets/logo.png')}
                    style={{
                        height: "45%",
                        resizeMode: 'contain',
                        alignSelf: 'center',
                        marginTop: 60,
                    }}
                />
                <TouchableOpacity
                    style={{
                       marginTop: 70
                    }}
                    onPress={() => {
                        setSignInButtonOpen(true);
                        showMessage({
                            message: "Press anywhere to exit",
                            type: "info",
                          });
                    }}>
                        <View
                            style={{
                                paddingHorizontal: 25,
                                paddingVertical: 15,
                                borderRadius: buttonBorderRadius,
                                backgroundColor: "#56626f",
                                marginRight: 15,
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
                        </View>
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={{
                       marginTop: 15
                    }}
                    onPress={() => {
                        setSignUpButtonOpen(true);
                        showMessage({
                            message: "Press anywhere to exit",
                            type: "info",
                          });
                    }}>
                        <View
                            style={{
                                paddingHorizontal: 32,
                                paddingVertical: 15,
                                borderRadius: buttonBorderRadius,
                                backgroundColor: "#83F52C",
                                marginRight: 15,
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
                        </View>
                </TouchableOpacity>
            
            </View>
            
            {signInButtonOpen && In()}

            {signUpButtonOpen && Up()}

            {emailAuthOpen && EmailAuth()}
            
        </ScrollView>
    )
}

function SignInOld({ navigation }) {

    const auth = firebase.auth();
    const firestore = firebase.firestore();

    var provider = new firebase.auth.PhoneAuthProvider();

    firebase.auth().settings.appVerificationDisabledForTesting = true;

    const { user, setUser, theme } = useContext(AppContext);
    const [number, setNumber] = useState();

    var phoneNumber = "+16501235555";
    var testVerificationCode = "123456";

    /* const captcha = '<div id="sign-in-button" />'; */

    const recaptchaVerifier = React.useRef(null);
    const [verificationId, setVerificationId] = React.useState();
    const [verificationCode, setVerificationCode] = React.useState();
    const [isVerified, setIsVerified] = React.useState(false);
    const [verificationNeeded, setVerificationNeeded] = React.useState(false);
    const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
    const [message, setMessage] = React.useState(
        !firebaseConfig || Platform.OS === 'web'
            ? {
                text:
                    'To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.',
            }
            : undefined
    );
    const attemptInvisibleVerification = true;
    const [signInButtonOpen, setSignInButtonOpen] = useState(false);
    const [signUpButtonOpen, setSignUpButtonOpen] = useState(false);
    const [credential, setCredential] = useState();
    const marginHorizontal = 85;
    const buttonFontSize = 20;
    const buttonHeight = 47;
    const buttonBorderRadius = buttonHeight/2;
    const phoneInputHeight = useRef(new Animated.Value(buttonHeight)).current;
    const inputOpacity = useRef(new Animated.Value(0)).current;
    const [inOrUp, setInOrUp] = useState();
    const [userInfo, setUserInfo] = useState();

    /* verifies phone number and allows sign in with number */
    async function onPhoneNumberSubmit(event) {
        console.log("phone #: "+ number);
        try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            //setVerificationId("123456");
            await phoneProvider.verifyPhoneNumber(
                phoneNumber,
                recaptchaVerifier.current
            ).then((vId) => {
                console.log("verificationId:"+vId);
                setVerificationId(vId);
            });
            setMessage({ text: 'Verification code has been sent to your phone.' });
            // show a pop up for entering the verification code
        } catch (err) {
            setMessage({ text: `Error: ${err.message}`, color: 'red' });
            console.log("error: "+err);
        }
    }

    function setUserAndNavigate(userId) {
        console.log("before setting user");
        setUser(userId);
        console.log("before navigating to "+userId+"'s profile");
        navigation.navigate("Profile", { user: userId });
    }

    const signInAsync = async () => {
        try {
            const { type, accessToken, user, refreshToken, idToken } = await Google.logInAsync({
                iosClientId: "342162757131-c1p9md1c4eckqg10u0e1c7dfsdbi9qbf.apps.googleusercontent.com",
                androidClientId: "342162757131-ltcjavnkgijv5f96e7jbhqbtd0m1jg2g.apps.googleusercontent.com",
                scopes: ['https://www.googleapis.com/auth/gmail.readonly']
            });
            if (type === 'success') {
                console.log("access token for user with " + user.email + ": " + accessToken);
                console.log("refreshToken: " + refreshToken);
                console.log("idToken: " + idToken);
                data = {gmail_access_token: accessToken, gmail_refresh_token: refreshToken};
                fetch('https://soshwrld.com/access', {
                    method: 'POST',
                    headers: {
                        'Accept': "application/json",
                        'Content-Type': 'application/json',
                        "CSRF-Token": Cookies.get("XSRF-TOKEN")
                    },
                    body: JSON.stringify(data),
                  })
            }
        } catch (error) {
            console.log("LoginScreen.js 19 | ---", error);
        }
    };

    const DismissKeyboardHOC = (Comp) => {
        return ({ children, ...props }) => (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Comp {...props}>
              {children}
            </Comp>
          </TouchableWithoutFeedback>
        );
      };
      const DismissKeyboardView = DismissKeyboardHOC(View)

    return (
        <KeyboardAvoidingView
            behavior={'padding'}
            style={{
                flex: 1,
                width: "100%",
                backgroundColor: 'black'
        }}>

            <View style={{
                flex: 1.5,
                justifyContent: 'flex-end'
            }}>
                <Image
                    source={require('../assets/logo.png')}
                    style={{
                        height: "45%",
                        resizeMode: 'contain',
                        alignSelf: 'center',
                        marginBottom: 35
                    }}
                />
                <Text
                    // fancy text...
                    style={{
                        color: 'gray', //#f7d0da',
                        fontSize: 24,
                        fontWeight: '200',
                        marginHorizontal: marginHorizontal,
                        textAlignVertical: 'bottom',
                        textAlign: "center",
                        letterSpacing: 0.3,
                        lineHeight: 27
                    }}>
                    Real purchases
                    approved by
                    _____________ .
                </Text>
            </View>


            <View // buttons
                style={{
                    marginTop: 58,
                    marginHorizontal: marginHorizontal,
                    justifyContent: 'flex-start',
                    flex: 1
                }}>

                <Animated.View // sign up button + phone # input
                    style={{
                        //flex: 1
                    }}>

                    <Animated.View // box that holds !!text input for sign in!!
                        style={{
                            opacity: inputOpacity,
                            width: "100%",
                            height: phoneInputHeight,
                            borderRadius: buttonBorderRadius,
                            backgroundColor: 'rgba(255,255,255,0.8)',
                        }}>

                        <Animated.View // text input for sign in
                        style={{
                            opacity: inputOpacity,
                            height: 30,
                            bottom: 0,
                            position: 'absolute',
                            width: "76%",
                            alignSelf: 'center',
                            padding: 5
                        }}>
                            <TextInput
                                style={{
                                    borderBottomWidth: 0.2,
                                    borderBottomColor: 'rgba(0,0,0,0.5)',
                                    fontSize: 14,
                                    paddingBottom: 5
                                }}
                                // figure out how to show the submit button!
                                onSubmitEditing={(event) => {
                                    setInOrUp("in");
                                    onPhoneNumberSubmit(event);
                                }}
                                // pls check that the state name stayed the same..
                                onChangeText={setNumber}
                                value={number}
                                placeholder="e.g. +1 999 999 9999"
                                // maybe do something here to show submit button
                                // and enable hiding the keyboard
                                autoCompleteType="tel"
                                keyboardType="phone-pad"
                                textContentType="telephoneNumber"
                                returnKeyType="done"
                            />
                        </Animated.View>

                    </Animated.View>

                    <TouchableOpacity // button for phone sign in!!!
                        style={{
                            position: 'absolute',
                            width: "100%",
                        }}
                        onPress={(event) => {
                            // trigger the text input to come down
                            Animated.timing(
                                phoneInputHeight,
                                {
                                    toValue: signInButtonOpen ? buttonHeight : 82,
                                    duration: 300,
                                    useNativeDriver: false
                                }).start();
                            Animated.timing(inputOpacity,
                                {
                                    toValue: signInButtonOpen ? 0 : 1,
                                    duration: 300,
                                    useNativeDriver: false
                                }).start();
                            setSignInButtonOpen(!signInButtonOpen);
                            setInOrUp("in");
                        }}>
                        <View style={{
                            width: "100%",
                            height: buttonHeight,
                            borderRadius: buttonBorderRadius,
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            shadowOpacity: 0.3,
                            shadowColor: 'black',
                            shadowOffset: { width: 0, height: 1 },
                            shadowRadius: 4,
                            elevation: 3
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                color: 'black',
                                fontSize: buttonFontSize,
                                fontWeight: '300',
                            }}>
                                Sign In
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <FirebaseRecaptchaVerifierModal
                        ref={recaptchaVerifier}
                        firebaseConfig={firebaseConfig}
                        attemptInvisibleVerification={attemptInvisibleVerification}
                    />
                </Animated.View>


                <View
                    // button for SIGN UP
                >
                    <TouchableOpacity
                        // with more user input for user info
                        onPress={() => {
                            // trigger sign up page to open
                            setSignUpButtonOpen(!signUpButtonOpen);
                            setInOrUp("up");
                        }}>
                        <View style={{
                            marginTop: 17,
                            width: "100%",
                            height: buttonHeight,
                            borderRadius: buttonBorderRadius,
                            justifyContent: 'center',
                            backgroundColor: '#196DFF',
                            shadowOpacity: 0.3,
                            shadowColor: 'black',
                            shadowOffset: { width: 0, height: 1 },
                            shadowRadius: 4,
                            elevation: 3
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                color: 'white',
                                fontSize: buttonFontSize, fontWeight: '300'
                            }}>
                                Sign Up
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
            
            {signUpButtonOpen &&
                <SignUp
                    // setVerificationId={(vid) => {setVerificationId(vid)}}
                    setVerificationCode={(vco) => {setVerificationCode(vco)}}
                    setNumber={(number) => {setNumber(number)}}
                    onPhoneNumberSubmit={(event) => {onPhoneNumberSubmit(event)}}
                    setVerificationId={(event) => {setVerificationId(event)}}
                    isVerified={isVerified}
                    verificationNeeded={verificationNeeded}
                    setVerificationNeeded={setVerificationNeeded}
                    setUserInfo={setUserInfo}
                />
                }

             
                {(verificationId && !isVerified) &&
                // pop up for entering verification id sent to text
                // triggered when onPhoneNumberSubmitted is called
                // and verificationId is set to something other than null
                <PhoneVerification
                number={number}
                setCredential={setCredential}
                verificationId={verificationId}
                setVerificationId={setVerificationId}
                verificationCode={verificationCode}
                action={inOrUp}
                setIsVerified={setIsVerified}
                setUserAndNavigate={(user) => {setUserAndNavigate(user);}}
                userInfo={userInfo}
                />}

                {isVerified &&
                <EmailVerification/>}

        </KeyboardAvoidingView>
    )
}


export default SignIn;




    /*     return (
            <View style={{ padding: 20, marginTop: 50 }}>
                <FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}
                    firebaseConfig={firebaseConfig}
                    attemptInvisibleVerification={attemptInvisibleVerification}
                />
                <Text style={{ marginTop: 20 }}>Enter phone number</Text>
                <TextInput
                    style={{ marginVertical: 10, fontSize: 17 }}
                    placeholder="+1 999 999 9999"
                    autoFocus
                    autoCompleteType="tel"
                    keyboardType="phone-pad"
                    textContentType="telephoneNumber"
                    onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
                />
                <Button
                    title="Send Verification Code"
                    disabled={!phoneNumber}
                    onPress={async () => {
                        // The FirebaseRecaptchaVerifierModal ref implements the
                        // FirebaseAuthApplicationVerifier interface and can be
                        // passed directly to `verifyPhoneNumber`.
                        try {
                            const phoneProvider = new firebase.auth.PhoneAuthProvider();
                            const verificationId = await phoneProvider.verifyPhoneNumber(
                                phoneNumber,
                                recaptchaVerifier.current
                            ).then((vId) => {
                                setVerificationId(vId);
    
                            });
                            setMessage({ text: 'Verification code has been sent to your phone.' });
                        } catch (err) {
                            setMessage({ text: `Error: ${err.message}`, color: 'red' });
                        }
                    }}
                />
                <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
                <TextInput
                    style={{ marginVertical: 10, fontSize: 17 }}
                    editable={!!verificationId}
                    placeholder="123456"
                    onChangeText={setVerificationCode}
                />
                <Button
                    title="Confirm Verification Code"
                    disabled={!verificationId}
                    onPress={async () => {
                        try {
                            const credential = firebase.auth.PhoneAuthProvider.credential(
                                verificationId,
                                verificationCode
                            );
                            await firebase.auth().signInWithCredential(credential).then((user) => {
                                console.log(user);
                            });
                            const user = firebase.auth().currentUser;
                            if (user !== null) {
                                const uid = user.uid;
                                firestore.collection('UserBase').doc(uid).set({ access_token: "", full_name: "", username: "" })
    
                            }
                            setMessage({ text: 'Phone authentication successful 👍' });
                        } catch (err) {
                            setMessage({ text: `Error: ${err.message}`, color: 'red' });
                        }
                    }}
                />
                {message ? (
                    <TouchableOpacity
                        style={[
                            StyleSheet.absoluteFill,
                            { backgroundColor: 0xffffffee, justifyContent: 'center' },
                        ]}
                        onPress={() => setMessage(undefined)}>
                        <Text
                            style={{
                                color: message.color || 'blue',
                                fontSize: 17,
                                textAlign: 'center',
                                margin: 20,
                            }}>
                            {message.text}
                        </Text>
                    </TouchableOpacity>
                ) : (
                    undefined
                )}
                {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
            </View>
        ) */