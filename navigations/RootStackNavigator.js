import React, { useEffect, useState, useRef } from "react";
import { View, StatusBar, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import TabBar from "../navigations/TabBar";
import SignInMain from "../screens/signin/SignIn";
import PhoneSignIn from "../screens/signin/components/PhoneSignIn";
import AppContext from "../data/AppContext";
import ThemeContext from "../data/ThemeContext";
import FlashMessage from "react-native-flash-message";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "../data/firebase";
import { getFirestore } from "firebase/firestore";
import PhoneCode from "../screens/signin/components/PhoneCode";

const RootStack = createStackNavigator();

/* ASSUMED that this isn't on the web */
const RootStackNavigator = () => {

  const { theme, setUser, setUID } = React.useContext(AppContext);
  const colors = React.useContext(ThemeContext).colors[theme];
  const subscription = useRef();
  const [initialRoute, setInitialRoute] = useState(null);
  const auth = getAuth();
  const db = getFirestore(firebaseApp);

  const screenOptionStyle = {
    headerStyle: {
      backgroundColor: colors.eyeSafeBackground,
      height: Platform.OS === "android" ? 83 : 110,
      shadowColor: 'transparent',
    },
    cardStyle: {
      backgroundColor: colors.background
    },
    headerTitleStyle: { fontSize: 18 },
    headerTitleAlign: 'center',
    headerTintColor: colors.antiBackground,
    headerBackTitle: "Back",
  };

  useEffect(() => {

    var subscription = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, photoURL } = user;
        if (uid && displayName) {
          setUID(uid);
          setUser(displayName);
          setInitialRoute("Main");
        }
      }
      else {
        setInitialRoute("SignIn");
      }
    });
    subscription.current = subscription;

    return subscription.current;
  }, []);

  return (
    (initialRoute == null) ?
      <View style={{ backgroundColor: '#333' }}></View> :
      <View style={{
        flex: 1, backgroundColor: colors.background,
        // borderWidth: 1, borderColor: "cyan"
      }}>
        <StatusBar translucent
          backgroundColor="transparent"
          barStyle={theme === "dark" ?
            "light-content" :
            "dark-content"} />
        <FlashMessage position="top" />
        <RootStack.Navigator
          initialRouteName={initialRoute}
          mode="modal"
          screenOptions={screenOptionStyle}>
          <RootStack.Screen
            name="SignIn"
            component={SignInMain}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="Enter Phone Number"
            component={PhoneSignIn}
            options={{
              headerShown: true,
              gestureEnabled: true
            }}
          />
          <RootStack.Screen
            name="Phone Verification"
            component={PhoneCode}
            options={{ headerShown: true, gestureEnabled: true }}
          />
          <RootStack.Screen
            name="Main"
            component={TabBar}
            options={{ headerShown: false }}
          />
        </RootStack.Navigator>
      </View>
  );
};

export default RootStackNavigator;