import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native';

const Login = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#000' }}>
                Login
            </Text>
            <ActivityIndicator
                style={{ marginTop: 15 }}
                color='#000'
                size={50}
            />
        </View>
    )
}

export default Login;