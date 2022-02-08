import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, RefreshControl, Dimensions } from 'react-native';
import Modal from "react-native-modal";
import AppBio from './components/AppBio';
import EditProfile from './components/EditProfile';
import { Ionicons } from '@expo/vector-icons';
import AppContext from '../../data/AppContext';
import ThemeContext from '../../data/ThemeContext';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { firebaseApp } from '../../data/firebase';
import { getAuth, signOut } from 'firebase/auth';

function MeScreen({ navigation }) {

    const theme = useContext(AppContext).theme;
    const colors = useContext(ThemeContext).colors[theme];
    const [ready, setReady] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [isSpecial, setIsSpecial] = useState();
    const [settingOpen, setSettingOpen] = useState(false);
    const db = getFirestore(firebaseApp);
    const auth = getAuth();

    useEffect(() => {
        loadView();
    }, []);

    function loadView() {
        checkUserSpecialStatus().then(isSpecial => {
            setIsSpecial(isSpecial);
            setReady(true);
        })
    }

    function onRefresh() {
        setReady(false);
        loadView();
        setReady(true);
    }

    async function checkUserSpecialStatus() {
        const profileRef = doc(db, "User-Profile", auth.currentUser.uid);
        const profileSnapshot = await getDoc(profileRef);
        if (profileSnapshot.exists() && profileSnapshot.data()) {
            return profileSnapshot.data().isSpecial;
        }
    }

    function logOut() {
        signOut(auth).then(() => {
            navigation.navigate("SignIn");
        })
    }

    function accessButtonPressed() {
        const profileRef = doc(db, "User-Profile", auth.currentUser.uid);
        updateDoc(profileRef, { isSpecial: false }).then(() => {
            onRefresh();
        });
    }

    function openSetting() {
        setSettingOpen(true);
    }

    const Sign = React.memo(function Sign() {
        return (
            <View style={{
                width: 280,
                height: 120,
                padding: 5,
                borderRadius: 15,
                backgroundColor: colors.signGreen
            }}>
                <View style={{
                    width: "100%",
                    height: "100%",
                    paddingHorizontal: 15,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: 10,
                    borderWidth: 5,
                    backgroundColor: colors.signGreen
                }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: "bold",
                    }} >
                        {"SOSH Beta 2.1\nEarly Access to\nSelect Creators"}
                    </Text>
                    <Image style={{
                        width: 62,
                        height: 62,
                        marginTop: 3,
                        // borderWidth:1,borderColor:"blue"
                    }} resizeMode="contain"
                        source={require("../../assets/rightDown.png")}
                        fadeDuration={0} />
                </View>
            </View>
        )
    }, () => { return true; });

    return (
        <ScrollView
            style={{
                backgroundColor: colors.background,
            }}
            contentContainerStyle={{
                width: "100%",
                height: "100%",
                marginTop: 20,
                justifyContent: "center",
                alignItems: "center",
            }}
            refreshControl={
                <RefreshControl
                    colors={['black', 'white']}
                    tintColor={'white'}
                    refreshing={refreshing}
                    onRefresh={onRefresh} />
            }>
            <Ionicons name="settings-outline" size={21} color={colors.blue} style={{
                position: "absolute",
                top: 35,
                right: 15
            }} onPress={openSetting} />
            {isSpecial && <Text style={{
                fontSize: 14,
                color: colors.signGreen
            }} >
                Access full functionality on iOS app.
            </Text>}
            {(isSpecial !== true) && <Sign />}
            {(isSpecial !== true) && <TouchableOpacity style={{
                width: "75%", //"90%",
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 25,
                marginTop: 35,
                backgroundColor: "#121212"
            }} onPress={accessButtonPressed}
                disabled={(isSpecial == false)}
                activeOpacity={(isSpecial == false) && 1} >
                {ready && <Text style={{
                    color: isSpecial == false ? "#575757" : colors.signGreen,
                    fontSize: 17.7,
                }}>
                    {isSpecial == false ? "Access Requested" : "Request Access"}
                </Text>}
            </TouchableOpacity>}
            <Modal
                isVisible={settingOpen}
                statusBarTranslucent={true}
                animationIn={"slideInUp"}
                animationOutTiming={0}
                style={{
                    margin: 0,
                    justifyContent: "flex-end",
                    alignItems: "center"
                }}
                onBackdropPress={() => { setSettingOpen(false); }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: colors.background,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderWidth: 0.5, borderColor: colors.text4,
                        borderBottomWidth: 0,
                        width: "99%",
                        height: 65,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    onPress={logOut}>
                    <Text style={{
                        color: "#a03636",
                        fontSize: 19
                    }}>
                        Log Out
                    </Text>
                </TouchableOpacity>
            </Modal>
        </ScrollView>
    )
}

function AdvanceddddMeScreen({ navigation }) {

    const [topHeight, setTopHeight] = useState(0);
    const [editProfile, setEditProfile] = useState(false);
    const theme = useContext(AppContext).theme;
    const colors = useContext(ThemeContext).colors[theme];

    return (
        <View style={{
            flex: 1,
            // borderWidth: 1, borderColor: "salmon"
        }} >
            <ScrollView style={{
                backgroundColor: colors.background
            }}
                contentContainerStyle={{
                    flex: 1,
                    alignItems: "center",
                    marginTop: 25
                }} >
                <AppBio
                    topHeight={topHeight}
                    setTopHeight={setTopHeight}
                    isUser={true}
                    openEditProfile={() => { setEditProfile(true); }}
                    navigation={navigation}
                />
            </ScrollView>
            <EditProfile isVisible={editProfile} close={() => { setEditProfile(false); }} />
        </View>
    )
}

export default MeScreen;