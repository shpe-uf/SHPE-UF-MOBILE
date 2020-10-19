import * as React from 'react';
import { View, Text } from 'react-native';

function LoginScreen() {
    return (
        <View 
            style={{
                flex: 1,
                alignItems:'center',
                justifyContent:'center'
            }}
        >
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            />
        </View>
    )
}