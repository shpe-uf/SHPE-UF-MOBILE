import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import { useFonts } from "@use-expo/font";

const PointsBox = ({ props }) => {
  const user = props.user;
  const semester = props.semester;

  const [fontLoaded, setFontLoaded] = useState(false);
  const loadFont = async () => {
    await Font.loadAsync({
      pointsFont: require("../assets/fonts/Gameplay.ttf"),
    });
    setFontLoaded(true);
  };
  loadFont();
  return (
    <View style={{ paddingHorizontal: 5 }}>
      {semester === "Fall Semester" ? (
        <View style={styles.pointsBox}>
          <View>
            <Text style={fontLoaded ? styles.topFont : styles.top}>Fall</Text>
          </View>

          <Text style={fontLoaded ? styles.midFont : styles.middle}>
            {user ? user.fallPoints : "0"}
          </Text>

          <View>
            <Text style={fontLoaded ? styles.bottomFont : styles.bottom}>
              Top {user ? (100 - user.fallPercentile) : "100"}%
            </Text>
          </View>
        </View>
      ) : semester === "Spring Semester" ? (
        <View style={styles.pointsBox}>
          <View>
            <Text style={fontLoaded ? styles.topFont : styles.top}>Spring</Text>
          </View>

          <Text style={fontLoaded ? styles.midFont : styles.middle}>
            {user ? user.springPoints : "0"}
          </Text>

          <View>
            <Text style={fontLoaded ? styles.bottomFont : styles.bottom}>
              Top {user ? (100 - user.springPercentile) : "100"}%
            </Text>
          </View>
        </View>
      ) : semester === "Summer Semester" ? (
        <View style={styles.pointsBox}>
          <View>
            <Text style={fontLoaded ? styles.topFont : styles.top}>Summer</Text>
          </View>

          <Text style={fontLoaded ? styles.midFont : styles.middle}>
            {user ? user.summerPoints : "0"}
          </Text>

          <View>
            <Text style={fontLoaded ? styles.bottomFont : styles.bottom}>
              Top {user ? (100 - user.summerPercentile) : "100"}%
            </Text>
          </View>
        </View>
      ) : (
        <View>
          <Text>Invalid semester</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pointsBox: {
    backgroundColor: "#0070C0",
    alignItems: "center",
    marginTop: "5%",
    paddingHorizontal: "2%",
    borderRadius: 5,
    height: 125,
  },
  topFont: {
    fontFamily: "pointsFont",
    fontSize: 15,
    color: "#fff",
    marginTop: 15,
    textAlign: "center",
  },
  top: {
    fontSize: 20,
    color: "#fff",
  },
  midFont: {
    fontFamily: "pointsFont",
    fontSize: 40,
    color: "#fff",
    marginTop: 5,
    textAlign: "center",
  },
  middle: {
    fontSize: 30,
    color: "#fff",
  },
  bottomFont: {
    fontFamily: "pointsFont",
    fontSize: 15,
    color: "#fff",
    marginTop: 5,
    textAlign: "center",
  },
  bottom: {
    color: "#fff",
  },
});

export default PointsBox;
