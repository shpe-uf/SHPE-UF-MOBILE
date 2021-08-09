import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const PointsBox = ({ props }) => {
  const user = props.user;
  const semester = props.semester;

  return (
    <View style={{ paddingHorizontal: 5 }}>
      {semester === "Fall Semester" ? (
        <View style={styles.pointsBox}>
          <View>
            <Text style={styles.top}>Fall</Text>
          </View>

          <Text style={styles.middle}>{user ? user.fallPoints : "0"}</Text>

          <View>
            <Text style={styles.bottom}>
              {user ? user.fallPercentile : "0"} percentile
            </Text>
          </View>
        </View>
      ) : semester === "Spring Semester" ? (
        <View style={styles.pointsBox}>
          <View>
            <Text style={styles.top}>Spring</Text>
          </View>

          <Text style={styles.middle}>{user ? user.springPoints : "0"}</Text>

          <View>
            <Text style={styles.bottom}>
              {user ? user.springPercentile : "0"} percentile
            </Text>
          </View>
        </View>
      ) : semester === "Summer Semester" ? (
        <View style={styles.pointsBox}>
          <View>
            <Text style={styles.top}>Summer</Text>
          </View>

          <Text style={styles.middle}>{user ? user.SummerPoints : "0"}</Text>

          <View>
            <Text style={styles.bottom}>
              {user ? user.SummerPercentile : "0"} percentile
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
    paddingVertical: "3%",
    paddingHorizontal: "2%",
    borderRadius: 5,
    height: 110,
  },
  top: {
    fontSize: 20,
    color: "#fff",
  },
  middle: {
    fontSize: 30,
    color: "#fff",
  },
  bottom: {
    color: "#fff",
  },
});

export default PointsBox;
