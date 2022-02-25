import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AppContext from '../../../data/AppContext';
import ThemeContext from '../../../data/ThemeContext';
import Modal from "react-native-modal";
import * as ImagePicker from 'expo-image-picker';
import { getAuth, updateProfile } from "firebase/auth";
import { getDoc, getFirestore, doc, updateDoc } from 'firebase/firestore';
import { firebaseApp } from '../../../data/firebase';
import { update } from 'firebase/database';

function EditProfile({ isVisible, close }) {

    const { theme } = useContext(AppContext);
    const colors = useContext(ThemeContext).colors[theme];

    const [userName, setUserName] = useState("");
    const [bio, setBio] = useState("");
    const [image, setImage] = useState(null);

    const [initialData, setInitialData] = useState(null);
    const [initialBio, setInitialBio] = useState(null);
    
    const auth = getAuth();
    const db = getFirestore(firebaseApp);

    useEffect(() => {
        const user = auth.currentUser;
        const { photoURL, displayName, uid } = user;

        setInitialData({
            uid: uid,
            photoURL: photoURL,
            displayName: displayName,
        });
        setUserName(displayName);
        setImage(photoURL);
    }, []);

    useEffect(() => {
        if (initialData) {
            const profileRef = doc(db, "User-Profile", initialData.uid);
            getDoc(profileRef).then(profileSnapshot => {
                if (profileSnapshot.exists() && profileSnapshot.data()) {
                    setInitialBio(profileSnapshot.data().userDescription);
                    setBio(profileSnapshot.data().userDescription);
                }
            })
        }
    }, [initialData]);

    function revert() {
        setUserName(initialData.displayName);
        setBio(initialBio);
        setImage(initialData.photoURL);
    }

    function saveAndClose() {
        updateProfile(auth.currentUser, {
            displayName: userName,
            photoURL: image,
        }).then(() => {
            update(doc(db, "User-Profile", initialData.uid), {
                userName: userName,
                userImageURL: image,
                userDescription: bio,
            }).then(() => {
                setUser(userName);
                close();
            });
        });
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <Modal
            isVisible={isVisible}
            statusBarTranslucent={true}
            animationIn={"slideInUp"}
            animationOut={"slideInDown"}
            swipeDirection={"down"}
            onModalHide={() => { close(); }}
            onDismiss={() => { close(); }}
            onSwipeComplete={() => { close(); }}
            style={{
                margin: 0,
                alignItems: "center",
                justifyContent: "flex-end",
                // borderWidth: 1, borderColor: "red"
            }}>
            {/* The white line at top (that really should call close on tap...) */}
            <TouchableWithoutFeedback
                containerStyle={{
                    justifyContent: "flex-end",
                    width: Dimensions.get("window").width,
                    height: "5%",
                }}
                onLongPress={() => { close(); }} >
                <View style={{
                    width: 50,
                    height: 4,
                    marginBottom: 10,
                    backgroundColor: "rgba(150, 150, 150, 0.7)",
                    borderRadius: 1.7,
                    alignSelf: "center",
                    shadowOpacity: 1,
                    shadowRadius: 10
                }} />
            </TouchableWithoutFeedback>
            {/* The actual modal element we care about */}
            <View
                style={{
                    width: Dimensions.get("window").width,
                    height: "95%",
                    alignSelf: "center",
                    alignItems: "center",
                    backgroundColor: colors.eyeSafeBackground,
                    borderTopRightRadius: 22,
                    borderTopLeftRadius: 22,
                    borderWidth: 0.5, borderColor: colors.background1,
                    borderBottomWidth: 0,
                    shadowOpacity: 0.6,
                    shadowRadius: 13,
                    shadowOffset: { wifth: 0, height: -5 }
                }} >
                {/* Header */}
                <Text style={{
                    color: colors.text2,
                    width: "100%",
                    paddingVertical: 16,
                    letterSpacing: 0.1,
                    fontWeight: 'bold',
                    fontSize: 17.5,
                    borderTopLeftRadius: 22,
                    borderTopRightRadius: 22,
                    // borderColor: colors.background2, borderWidth: 0.5,
                    // borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0,
                    textAlign: "center",
                }}>
                    Edit Profile
                </Text>
                {/* (Clickable) profile Image */}
                <View style={{
                    width: 140,
                    height: 140,
                    marginTop: 20,
                }}>
                    <Image
                        source={{ uri: image }}
                        style={{
                            width: 140,
                            height: 140,
                            borderRadius: 25
                        }} />
                    <Text style={{
                        color: colors.text1,
                        position: "absolute",
                        bottom: 10,
                        alignSelf: "center"
                    }} onPress={() => {
                        pickImage();
                    }}>
                        Change Image
                    </Text>
                </View>
                {[{ prompt: "Username", value: userName, fun: setUserName },
                { prompt: "Bio/Description", value: bio, fun: setBio }].map(({ prompt, value, fun }, index) => {
                    return (
                        <View key={index}
                            style={{
                                width: "90%",
                            }}>
                            <Text style={{
                                fontSize: 15,
                                color: colors.text1,
                                marginTop: 20,
                                marginBottom: 5,
                                marginHorizontal: 10,
                            }}>
                                {prompt}
                            </Text>
                            <TextInput style={{
                                width: "100%",
                                // borderTopWidth: 0.5,
                                // borderBottomWidth: 0.5,
                                borderColor: colors.background2,
                                backgroundColor: colors.background1,
                                paddingVertical: 7,
                                paddingHorizontal: 10,
                                color: colors.text3,
                                fontSize: 15,
                                // fontWeight: "bold"
                            }}
                                value={value}
                                onChangeText={fun}
                            />
                        </View>
                    )
                })}
                <TouchableOpacity
                    containerStyle={{
                    }}
                    style={{
                        borderRadius: 10,
                        padding: 10,
                        backgroundColor: colors.background1,
                        alignSelf: "flex-end",
                        marginRight: "5%",
                        marginTop: 30,
                    }} onPress={() => {
                        saveAndClose();
                    }}>
                    <Text style={{
                        color: colors.green,
                        fontWeight: "bold",
                        fontSize: 16
                    }}>
                        Update Profile
                    </Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

export default EditProfile;