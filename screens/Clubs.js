import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

const ClubsScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Clubs Screen</Text>
        </View>
    )
}

export default  ClubsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    }
});