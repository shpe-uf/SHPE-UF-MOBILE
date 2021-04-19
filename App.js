import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Alert} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { settings } from "./config";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Points from "./Pages/Points";
import Register from "./Pages/Register";
import ResetPassword from "./Pages/ResetPassword";
import TaskButton from "./Pages/TaskButton";
import CodeButton from "./components/CodeButton";
//import EditProfile from "./Pages/EditProfile";
import ViewTasks from "./Pages/ViewTasks"
import UserProfile from "./Pages/UserProfile";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const client = new ApolloClient({
  uri: `http://${settings.internalIP}:5000`,
  cache: new InMemoryCache()
});

export default function App() {
  const [hasToken, retrieveToken] = useState(false);
  const [userToken, getUserToken] = useState([]);
  
  const getData = async () => {
    try {
      //await AsyncStorage.removeItem('@storage_Key')  //deletes stored key
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      if(jsonValue !== null){retrieveToken(true);}
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      return [];
    }
  }

  useEffect(()=>{
    if(!hasToken){
      getUserToken(getData()); 
    }
  },[]); 

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          {hasToken ? (
            <>         
          <Stack.Screen name="UserProfile">
            {props => <UserProfile {...props} token={userToken}/>}
          </Stack.Screen>
          <Stack.Screen name="EditProfile">
            {props => <EditProfile {...props} token={userToken}/>}
          </Stack.Screen> 
          <Stack.Screen name="Points" component={Points}/>
          <Stack.Screen name="ViewTasks" component={ViewTasks}/>
          </>
          ) : (
            <>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          </>
          )}
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