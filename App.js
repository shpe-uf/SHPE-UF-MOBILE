import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { settings } from './config'

import Register from "./Pages/Register";

//Component
import BottomTabNavigation from "./Pages/BottomTabNavigation";


const Stack = createStackNavigator();

const client = new ApolloClient({
  uri: `http://${settings.internalIP}:5000`,  
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <BottomTabNavigation />
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
