import React from "react";
import { Button, DevSettings, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      <View style={styles.button}>
        <Button
          color="red"
          onPress={() => logoutUser()}
          title="Log Out"
          accessibilityLabel="This button logs out your user"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 5,
    borderRadius: 6,
    borderColor: "red",
    justifyContent: "center",
    margin: "10%",
  },
});

export default LogoutButton;
