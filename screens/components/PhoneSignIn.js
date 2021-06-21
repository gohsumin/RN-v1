import React from 'react';
import { View, TextInput, SafeAreaView, Text } from 'react-native';

function PhoneSignIn() {


    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignContent: 'center',
                justifyContent: 'center',
                backgroundColor: 'black'
            }}>
            <Text
                style={{
                    marginHorizontal: 30,
                    color: 'white'
                }}>

            </Text>
            <TextInput
                style={{
                    marginHorizontal: 30
                }}
            />
        </SafeAreaView>
    )
}

export default PhoneSignIn();