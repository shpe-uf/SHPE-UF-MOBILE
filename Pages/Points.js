import React, { useContext, useState } from "react";
import { View, Text } from "react-native";

const Points = ({ user }) => {
  return (
    <View>
      <Text>Fall Points: {user ? user.fallPoints : "0"}</Text>
      <Text>Spring Points: {user ? user.springPoints : "0"}</Text>
      <Text>Summer Points: {user ? user.summerPoints : "0"}</Text>
    </View>
  );
};

export default Points;
