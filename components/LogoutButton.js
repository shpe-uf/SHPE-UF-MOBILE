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
    <View style={styles.container}>
      <View style={styles.button}>
        <Button
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
    marginTop: "1%",
    backgroundColor: "#001f5b",
    borderRadius: 50,
    marginLeft: "15%",
    width: "70%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default LogoutButton;
