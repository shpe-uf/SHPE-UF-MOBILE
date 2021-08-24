import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const editProfileButton = () => {
  return (
    <View style={styles.viewStyle}>
      <TouchableOpacity style={styles.btnStyle}>
        <Text style={styles.textStyle}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    alignItems: "center",
    height: "5%",
    justifyContent: "center",
  },
  btnStyle: {
    backgroundColor: "#FD652F",
    borderRadius: 10,
    height: "80%",
    justifyContent: "center",
    width: "35%",
  },
  textStyle: {
    color: "#FFF",
    fontSize: 20,
    textAlign: "center",
  },
});

export default editProfileButton;
