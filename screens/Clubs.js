import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

const ClubsScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Approve Purchases');
                }}>
                <View style={{
                    width: 100, height: 100, borderRadius: 25, backgroundColor: '#f0f0ff',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                    onPress={() => {
                        navigation.navigate('ApprovePurchases');
                    }}
                >
                    <Text>
                        Show me the modal
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ClubsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    }
});