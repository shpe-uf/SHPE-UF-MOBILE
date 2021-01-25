import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { settings } from "./config";
import Points from "./Pages/Points";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import UserProfile from "./Pages/UserProfile";
import ResetPassword from "./Pages/ResetPassword";
import TaskButton from "./Pages/TaskButton";
import CodeButton from "./components/CodeButton";
import ViewTasks from "./Pages/ViewTasks";
import EditProfile from "./Pages/EditProfile";

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
          {/*<Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="ViewTasks" component={ViewTasks}/>
          <Stack.Screen name="Points" component={Points}/>*/}
          <Stack.Screen name="UserProfile" component={UserProfile}/>
          <Stack.Screen name="EditProfile" component={EditProfile}/>
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
