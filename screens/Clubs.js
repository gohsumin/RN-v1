import React, { Component, useContext } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import AppContext from '../data/AppContext';

const ClubsScreen = ({ navigation }) => {

    const { user } = useContext(AppContext);

    return (
        <View style={styles.container}>
            {user !== "" && <TouchableOpacity
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
            </TouchableOpacity>}
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