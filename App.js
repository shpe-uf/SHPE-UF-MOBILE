import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { settings } from "./config";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ResetPassword from "./Pages/ResetPassword";
import CodeButton from "./Pages/CodeButton";

const Stack = createStackNavigator();

const client = new ApolloClient({
  uri: `http://${settings.internalIP}:5000`,
  cache: new InMemoryCache(),
});

export default function App() {
  //hard-coded user that will be passed by points page
  let user = {
    username: "letmein",
    firstName: "Test",
    lastName: "testtest",
    fallPoints: 1,
  };
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="CodeButton"
            component={() => <CodeButton user={user} />}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
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
