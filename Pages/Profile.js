import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import UserProfile from "./UserProfile";
import EditProfile from "./EditProfile";

const ProfileStack = createStackNavigator();

function Profile() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={UserProfile} />
      <ProfileStack.Screen name="Edit Profile" component={EditProfile} />
    </ProfileStack.Navigator>
  );
}

export default Profile;
