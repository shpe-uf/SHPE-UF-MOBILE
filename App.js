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
import EditProfile from "./Pages/EditProfile";
import ViewTasks from "./Pages/ViewTasks"
import localStorage from 'react-native-sync-localstorage'
import jwt_decode from "jwt-decode";
import UserProfile from "./Pages/UserProfile";

const Stack = createStackNavigator();

const client = new ApolloClient({
  uri: `http://${settings.internalIP}:5000`,
  cache: new InMemoryCache()
});

export default function App() {
  const [hasToken, retrieveToken] = useState(false);
  const [userToken, getUserToken] = useState([]);

  function getStorage(){
    //localStorage.removeItem('jwtToken');     //This is how u delete the token
    localStorage.getAllFromLocalStorage().then(() => {
      if(localStorage.getItem('jwtToken')){
        const token = localStorage.getItem('jwtToken');
        getUserToken(jwt_decode(token));
        retrieveToken(true);
      }
    })
    .catch(err => {
      console.warn(err);
    })
  }  
  
  if(!hasToken){
    getStorage();
    //console.log(userToken)
  }

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
