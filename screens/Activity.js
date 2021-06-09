import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

const ActivityScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Activity Screen</Text>
        </View>
    )
}

export default  ActivityScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    }
});