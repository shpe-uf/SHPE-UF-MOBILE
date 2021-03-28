import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const PointsBox = ({ props }) => {
  const user = props.user;
  const semester = props.semester;

  return (
    <View>
      {semester === "Fall Semester" ? (
        <View style={styles.pointsBox}>
          <Text style={styles.center}>FALL POINTS</Text>
          <Text style={styles.center}>{user ? user.fallPoints : "0"}</Text>
          <Text style={styles.center}>
            {user ? user.fallPercentile : "0"} percentile
          </Text>

        </View>
      ) : semester === "Spring Semester" ? (
        <View style={styles.pointsBox}>
          <Text style={styles.center}>SPRING POINTS</Text>
          <Text style={styles.center}>{user ? user.springPoints : "0"}</Text>
          <Text style={styles.center}>
            {user ? user.springPercentile : "0"} percentile
          </Text>

        </View>
      ) : semester === "Summer Semester" ? (
        <View style={styles.pointsBox}>
          <Text style={styles.center}>SUMMER POINTS</Text>
          <Text style={styles.center}>{user ? user.summerPoints : "0"}</Text>
          <Text style={styles.center}>
            {user ? user.summerPercentile : "0"} percentile
          </Text>
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
    backgroundColor: "#72A9BE",
    borderColor: "gray",
    margin: "2%",
    paddingBottom: "2%",
    paddingTop: "2%",
    textAlign: "center",
    width: "100%",
  },
  center: {
    textAlign: "center"
  },
});

export default PointsBox;
