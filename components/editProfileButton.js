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
    backgroundColor: "#fff",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    height: "5%",
  },
  btnStyle: {
    borderRadius: 10,
    backgroundColor: "#FD652F",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    height: "80%",
    width: "30%",
  },
  textStyle: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
  },
});

export default editProfileButton;
