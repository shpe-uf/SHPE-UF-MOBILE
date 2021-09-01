import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { settings } from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";

import BottomTabNavigation from "./Pages/BottomTabNavigation";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ResetPassword from "./Pages/ResetPassword";

const Stack = createStackNavigator();

const client = new ApolloClient({
  uri: "https://shpe-uf.herokuapp.com/",
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        merge(existing, incoming) {
          return incoming;
        }
      }
    }
  }),
});

export default function App() {
  const [hasToken, retrieveToken] = useState(false);
  const [userToken, getUserToken] = useState([]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@storage_Key");
      if (jsonValue !== null) {
        retrieveToken(true);
      }
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      return [];
    }
  };

  useEffect(() => {
    if (!hasToken) {
      getUserToken(getData());
    }
  }, []);
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {hasToken ? (
            <>
              <Stack.Screen
                name="BottomTabNavigation"
                component={BottomTabNavigation}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
