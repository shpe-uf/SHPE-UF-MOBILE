import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import {Platform } from "react-native";


function Home() {
    return (
        <View 
            style={{
                flex: 1,
                alignItems:'center',
                justifyContent:'center',
                backgroundColor: "#03cafc"
            }}
        >
            <Text style={{fontSize: 20, color: "#ffffff", fontWeight: '800'}}>Home is here!</Text>
        </View>
    )
}


function Points( {navigaton} ) {
    return (
        <View 
            style={{
                flex: 1,
                alignItems:'center',
                justifyContent:'center',
                backgroundColor: "#c203fc"
            }}
        >
            <Text style={{fontSize: 20, color: "#ffffff", fontWeight: '800'}}>Points goes here!</Text>
            <Button title="Go back" onPress={() => NavigationContainer.goBack()}/>
        </View>
    )
}

function Tasks( {navigaton} ) {
    return (
        <View 
            style={{
                flex: 1,
                alignItems:'center',
                justifyContent:'center',
                backgroundColor: "#48b969"
            }}
        >
            <Text style={{fontSize: 20, color: "#ffffff", fontWeight: '800'}}>Tasks go here!</Text>
            <Button title="Go back" onPress={() => NavigationContainer.goBack()}/>
        </View>
    )
}

function Profile( {navigaton} ) {
    return (
        <View 
            style={{
                flex: 1,
                alignItems:'center',
                justifyContent:'center',
                backgroundColor: "#48b969"
            }}
        >
            <Text style={{fontSize: 20, color: "#ffffff", fontWeight: '800'}}>Profile goes here!</Text>
            <Button title="Go back" onPress={() => NavigationContainer.goBack()}/>
        </View>
    )
}

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: "#e91e63"
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size}) => {
                        <Icon name={Platform.OS === 'ios' ? "ios-home" : "md-home"} color={color} size={size}  />
                      }
                }} />
            <Tab.Screen
                name='Tasks'
                component={Tasks}
                options={{
                    tabBarLabel: "Tasks",
                    tabBarIcon: ({ color, size}) => {
                        <Icon name={Platform.OS === 'ios' ? "ios-contacts" : "md-contacts"} color={color} size={size}  />
                      }
                }} />
            <Tab.Screen
                name="Points"
                component={Points}
                options={{
                    tabBarLabel: "Points",
                    tabBarIcon: ({ color, size}) => {
                        <Icon name={Platform.OS === 'ios' ? "ios-information-circle" : "md-information-circle"} 
                        color={color} size={size}  />
                      }
                }} />
            <Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size}) => {
                        <Icon name={Platform.OS === 'ios' ? "ios-profile" : "md-profile"} color={color} size={size}  />
                      }
                }} />    

        </Tab.Navigator>
    );
}

export default function BottomTabNavigation(){
    return(
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    )
}