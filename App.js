import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { settings } from './config'
import {AuthProvider} from "./context/auth"

import Register from "./Pages/Register";
import Login from "./Pages/Login"

const Stack = createStackNavigator();

const initialState = {user: null}
const store = createStore(reducer, initialState)

const client = new ApolloClient({
  uri: `http://${settings.internalIP}:5000`,  
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Register" component={Register}/>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home}
        </Stack.Navigator>
      </NavigationContainer>
      </AuthProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
