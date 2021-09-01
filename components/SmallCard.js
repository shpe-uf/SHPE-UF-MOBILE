import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import * as Font from "expo-font";
import { useFonts } from "@use-expo/font";

const SmallCard = ({ label, info }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const loadFont = async () => {
    await Font.loadAsync({
      nameFont: require("../assets/fonts/OpenSans-ExtraBold.ttf"),
    });
    setFontLoaded(true);
  };
  loadFont();
  return (
    <View>
      <View style={styles.aBox}>
        {fontLoaded ? (
          <Text style={styles.labelTextCustom}>{label}</Text>
        ) : (
          <Text style={styles.labelText}>{label}</Text>
        )}
        <Text style={styles.infoText}>{info}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  aBox: {
    alignContent: "center",
    paddingHorizontal: "8%",
    paddingVertical: "1.5%",
  },
  labelTextCustom: {
    fontFamily: "nameFont",
    color: "#001F5B",
    fontWeight: "bold",
    fontSize: 21,
    paddingVertical: "1%",
  },
  labelText: {
    color: "#001F5B",
    fontWeight: "bold",
    fontSize: 21,
    paddingVertical: "1%",
  },
  infoText: {
    color: "#000",
    fontSize: 22,
    paddingVertical: "1%",
  },
});

export default SmallCard;
