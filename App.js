import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { settings } from "./config";
import CodeButton from "./components/CodeButton";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Points from "./Pages/Points";
import Register from "./Pages/Register";
import ResetPassword from "./Pages/ResetPassword";
import TaskButton from "./Pages/TaskButton";
import UserProfile from "./Pages/UserProfile";
import ViewTasks from "./Pages/ViewTasks";

const Stack = createStackNavigator();

const client = new ApolloClient({
  uri: `http://${settings.internalIP}:5000`,
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Points" component={Points} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="ViewTasks" component={ViewTasks} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
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
    justifyContent: "center"
  }
});
