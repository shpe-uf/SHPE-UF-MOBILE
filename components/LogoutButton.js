import React from "react";
import {
  DevSettings,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

function LogoutButton() {
  const logoutUser = async () => {
    try {
      await AsyncStorage.removeItem("@storage_Key");
      try {
        DevSettings.reload();
      } catch (e) {
        location.reload();
      }
    } catch (e) {}
  };

  return (
    <View>
      <TouchableOpacity onPress={() => logoutUser()} style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    backgroundColor: "#D33A02",
    borderColor: "#D33A02",
    borderRadius: 6,
    height: hp("8.5%"),
    justifyContent: "center",
    margin: hp("1%"),
    width: wp("75%"),
  },
  buttonText: {
    color: "#fff",
    fontSize: hp("2.5%"),
    textAlign: "center",
  },
});

export default LogoutButton;
