import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import UserProfile from "./UserProfile";
import EditProfile from "./EditProfile";

const ProfileStack = createStackNavigator();

function Profile() {
  return (
    <NavigationContainer independent={true}>
      <ProfileStack.Navigator>
        <ProfileStack.Screen
          name="Profile"
          options={{ headerShown: false }}
          component={UserProfile}
        />
        <ProfileStack.Screen name="Edit Profile" component={EditProfile} />
      </ProfileStack.Navigator>
    </NavigationContainer>
  );
}

export default Profile;
