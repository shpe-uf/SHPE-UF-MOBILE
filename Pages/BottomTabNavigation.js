import * as React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { Platform } from "react-native";

import Home from "./Home";
import Points from "./Points";
import UserProfile from "./UserProfile";
import Tasks from "./Tasks";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "#FD652F",
        inactiveTintColor: "#72A9BE",
        activeBackgroundColor: "#F0F0F0",
        inactiveBackgroundColor: "#F0F0F0",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, color, size }) => {
            return <Icon name={"home"} size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        options={{
          tabBarLabel: "Tasks",
          tabBarIcon: ({ color, size }) => {
            return <Icon name={"clipboard"} color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Points"
        component={Points}
        options={{
          tabBarLabel: "Points",
          tabBarIcon: ({ color, size }) => {
            return <Icon name={"trophy"} color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => {
            return <Icon name={"person"} color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default function BottomTabNavigation() {
  return (
    <NavigationContainer independent={true}>
      <MyTabs />
    </NavigationContainer>
  );
}
