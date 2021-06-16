import React, { Component, useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import AppContext from '../data/AppContext'

function SignIn({ navigation }) {

    const {user, setUser, theme} = useContext(AppContext);

    return (
        <View style={{ flex: 1, backgroundColor: "black", padding: 25 }}>
            <Text style={{ flex: 1, color: '#ffccdd', paddingTop: 150, fontSize: 45, fontWeight: '600' }}>
                See what your role models are buying.
            </Text>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <TouchableOpacity style={{
                    paddingBottom: 18
                }} onPress={() => {
                    /////
                    const user = "luka";
                    // this sets the user across the app, locally through a context
                    setUser(user);
                    navigation.navigate("Profile", { user: user });
                }}>
                    <View style={{
                        width: "100%",
                        height: 50,
                        borderRadius: 30,
                        justifyContent: 'center',
                        backgroundColor: 'white',
                    }}>
                        <Text style={{ textAlign: 'center', color: 'black', fontSize: 20, fontWeight: '600' }}>
                            Sign Up with Phone
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    /////
                }}>
                    <View style={{
                        width: "100%",
                        height: 50,
                        borderRadius: 30,
                        justifyContent: 'center',
                        backgroundColor: '#196DFF'
                    }}>
                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, fontWeight: '600' }}>
                            Sign In
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default SignIn;