<<<<<<< HEAD
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { settings } from "./config";
import gql from "graphql-tag";
=======
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { settings } from './config'
>>>>>>> develop

import Login from "./Pages/Login";
import Register from "./Pages/Register";
<<<<<<< HEAD
import CodeButton from "./Pages/CodeButton";
=======
import ResetPassword from "./Pages/ResetPassword"
>>>>>>> develop

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
<<<<<<< HEAD
          <Stack.Screen name="CodeButton" component={CodeButton}/>
=======
          <Stack.Screen name="Login" component={Login}/>
>>>>>>> develop
          <Stack.Screen name="Register" component={Register}/>
          <Stack.Screen name="ResetPassword" component={ResetPassword}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
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
