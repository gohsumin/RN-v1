import React, { useContext, useState, useEffect, useRef } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    Image,
    ActivityIndicator
} from "react-native";
import { TextInput } from 'react-native-gesture-handler';
import AppContext from "../../../data/AppContext";
import ThemeContext from "../../../data/ThemeContext";
import WebStyleContext from '../../../data/WebStyleContext';
import { useHeaderHeight } from '@react-navigation/stack';
import TopGradient from '../../web/TopGradient';
import WebNavigationContext from '../../../data/WebNavigationContext';
import Header from './Header';
import * as ImagePicker from 'expo-image-picker';
import { firebase, storageRef } from '../../../data/firebase';
import WebNavigationItem from '../../web/components/WebNavigationItem';
const firestore = firebase.firestore();

function UpdateUser({ navigation, route }) {

    const { theme, platform, user, uid } = useContext(AppContext);
    const colors = useContext(ThemeContext).colors[theme];
    const {
        getCenterSectionWidth,
        getProfileWidth,
    } = useContext(WebStyleContext);
    const {
        setCurrentRoute
    } = useContext(WebNavigationContext);

    const [userData, setUserData] = useState({});

    const [userName, setUserName] = useState("");
    const [bio, setBio] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const image = useRef(null);

    const [loading, setLoading] = useState(false);
    const [transferred, setTransferred] = useState(0);

    const headerHeight = platform === "web" ? 0 : useHeaderHeight();

    const textInputBackground = 'rgba(255, 255, 255, 0.2)';
    const textInputHeight = 45;
    const submitButtonHeight = 50;
    const spacing = 17;

    function getUserData(uid, callback) {
       //console.log("getUserData for user " + uid);

        // the user data collection
        const userProfileDB = firestore.collection('User-Profile').doc(uid);

        userProfileDB.get().then((doc) => {
            let ret = doc.data();
            callback(ret);
        }).catch((error) => { console.log(error) });
    }

    const uploadImage = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        var metadata = {
            contentType: 'image/jpeg',
        };
        var ref = storageRef.child("User-Profile-Images/" + uid + ".jpg");
        return ref.put(blob, metadata);
    }

    useEffect(() => {
        getUserData(uid, (userData) => {
            setUserData(userData);
            setImagePreview(userData.userImageURL);
            setUserName(userData.userName);
            setBio(userData.userDescription);
        });
        (async () => {
            if (platform === "web") {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.cancelled) {
            image.current = result.uri;
        }
    };

    const submit = () => {
        uploadImage(image.current).then(() => {
            storageRef.child("User-Profile-Images/" + uid + ".jpg")
                .getDownloadURL().then((url) => {
                    const profileDB = firestore.collection('User-Profile').doc(uid);
                    profileDB.set({
                        userImageURL: url,
                        userName: userName,
                        userDescription: bio
                    }, { merge: true }).then(() => {
                        if (platform === "web") {
                            setCurrentRoute({ routeName: "My Profile", userName: userName });
                        }
                        navigation.navigate("Profile");
                    });
                })
        });
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.eyeSafeBackground,
            alignItems: 'center',
        }}>
            {platform === "web" &&
                <View
                    style={{
                        position: 'absolute',
                        width: getCenterSectionWidth(window.width),
                        height: "100%",
                        backgroundColor: "#1e1e1e"
                    }}>
                </View>
            }

            <View
                style={{
                    width: platform === "web" ? getProfileWidth(window.width) : "100%",
                    alignSelf: 'center',
                    paddingHorizontal: platform === "web" ? 0 : 15,
                    paddingTop: platform === "web" ? 120 : headerHeight + 40,
                    // borderWidth: 1,
                    // borderColor: 'pink'
                }}>
                <TouchableOpacity
                    style={{
                        alignSelf: 'center',
                        marginBottom: 10
                    }}
                    onPress={() => {
                        pickImage().then(() => {
                            setImagePreview(image.current);
                        })
                    }}>
                    <Image
                        fadeDuration={0}
                        source={{ uri: imagePreview }}
                        style={{
                            width: 140,
                            height: 140,
                            borderRadius: 12,
                            shadowColor: 'black',
                            shadowOpacity: 0.3,
                            shadowRadius: 10,
                            justifyContent: 'flex-end'
                        }}
                    />
                    <View
                        style={{
                            position: 'absolute',
                            alignSelf: 'center',
                            justifyContent: 'center',
                            width: 140,
                            height: 23,
                            borderRadius: 20,
                            bottom: 10,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        }}>
                        <Text
                            style={{
                                alignSelf: 'center',
                                textAlignVertical: 'center',
                                paddingHorizontal: 10,
                                fontWeight: '500',
                                fontSize: 12,
                                color: 'rgba(255, 255, 255, 0.7)'
                            }}>
                            Click to Change
                        </Text>
                    </View>
                </TouchableOpacity>
                <Text
                    style={{
                        color: colors.antiBackground,
                        marginTop: spacing,
                        marginBottom: 7,
                        marginLeft: 10,
                        fontSize: 16
                    }}>
                    Username
                </Text>
                <TextInput
                    style={{
                        fontSize: 18,
                        borderBottomColor: 'rgba(255, 255, 255, 0.5)',
                        color: 'white',
                        justifyContent: 'center',
                        paddingHorizontal: 13,
                        height: textInputHeight,
                        borderRadius: 10,
                        backgroundColor: textInputBackground
                    }}
                    defaultValue={user}
                    onChangeText={setUserName}
                    placeholder="Letters, numbers, underscores"
                    placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                    keyboardType="default" />
                <Text
                    style={{
                        color: colors.antiBackground,
                        marginTop: spacing,
                        marginBottom: 7,
                        marginLeft: 10,
                        fontSize: 16
                    }}>
                    Bio
                </Text>
                <TextInput
                    style={{
                        fontSize: 18,
                        borderBottomColor: 'rgba(255, 255, 255, 0.5)',
                        color: 'white',
                        justifyContent: 'center',
                        paddingHorizontal: 13,
                        height: textInputHeight,
                        borderRadius: 10,
                        backgroundColor: textInputBackground
                    }}
                    //multiline={true}
                    //maxLength={5}
                    defaultValue={userData.userDescription}
                    onChangeText={setBio}
                    placeholder="Brief description about you"
                    placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                    keyboardType="default" />
                <TouchableOpacity
                    onPress={submit}
                    style={{
                        marginTop: spacing + 13,
                        borderRadius: 10,
                        height: submitButtonHeight,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors.green
                    }}>
                    <Text
                        style={{
                            fontSize: 20,
                            textAlign: 'center',
                            fontWeight: 'bold',
                            marginVertical: 10
                        }}>
                            Save
                    </Text>
                </TouchableOpacity>
            </View>

            {/* header */}
            {platform !== "web" && <Header />}

            {platform === "web" &&
                <TopGradient />}

            {loading &&
                <ActivityIndicator size="large" />}

        </View>
    )
}

export default UpdateUser;