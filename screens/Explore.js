import React, { Component, useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import AppContext from '../data/AppContext';
import PostsContext from '../data/PostsContext';
import { firebase } from '../data/firebase';
require("firebase/functions");
import "firebase/firestore";
const firestore = firebase.firestore();

const ClubsScreen = ({ navigation }) => {

    const { user, uid } = useContext(AppContext);
    const { loadMoreFeed, updateTimelineAfterFollowing, updateTimelineAfterUnfollowing } = useContext(PostsContext);
    var followUser = firebase.functions().httpsCallable('followUser');
    var unFollowUser = firebase.functions().httpsCallable('unFollowUser');

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Approve Purchases');
                }}>
                <View style={styles.button}>
                    <Text style={styles.text1}>
                        Show me the modal
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    console.log("follow pressed");
                    followUser({
                        userID: "tqsjujBkrYfzwAqgpd2mE1ic0gn2",
                    }).then(function(res) {
                        console.log("after following");
                    });
                    updateTimelineAfterFollowing("tqsjujBkrYfzwAqgpd2mE1ic0gn2");
                }}
                style={{
                    borderRadius: 25,
                    backgroundColor: 'lightgray',
                    borderWidth: 1,
                    borderColor: 'black',
                }}>
                <View style={styles.button}>
                    <Text style={styles.text1}>
                        Follow
                    </Text>
                </View>
                <Text style={styles.text2}>
                    tqsjujBkrYfzwAqgpd2mE1ic0gn2
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    unFollowUser({
                        userID: "tqsjujBkrYfzwAqgpd2mE1ic0gn2"
                    }).then(function(res) {
                        updateTimelineAfterUnfollowing("tqsjujBkrYfzwAqgpd2mE1ic0gn2");
                    });
                }}
                style={{
                    borderRadius: 25,
                    backgroundColor: 'lightgray',
                    borderWidth: 1,
                    borderColor: 'black'
                }}>
                <View style={styles.button}>
                    <Text style={styles.text1}>
                        Unfollow
                    </Text>
                </View>
                <Text style={styles.text2}>
                    tqsjujBkrYfzwAqgpd2mE1ic0gn2
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ClubsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 70,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#ffffff',
    },
    button: {
        width: 120,
        padding: 10,
        borderRadius: 25,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text1: {
        color: 'white',
        fontSize: 21,
        lineHeight: 26,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    text2: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15,
        width: 120,
        padding: 10,
        textAlign: 'center',
        fontStyle: 'italic',
    }
});