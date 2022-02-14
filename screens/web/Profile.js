import React from 'react';
import { View, Text } from 'react-native';

function Profile() {

  return (
    <View style={{
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Text style={{
        color: "pink"
      }}>
        Let's make a profile page!
      </Text>
    </View>
  )
}

export default Profile;