<<<<<<< HEAD
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Button from "./Pages/Button";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Button />
    </View>
=======
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { settings } from 'config'

import Register from "./Pages/Register";

const Stack = createStackNavigator();

const client = new ApolloClient({
  uri: `http://${settings.internalIP}:5000`,  
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Register" component={Register}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
>>>>>>> develop
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
