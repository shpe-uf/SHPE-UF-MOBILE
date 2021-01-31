import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const PointsBox = ({user}, {semester}) => {
  console.log("semester", semester);
  return (
    <View style={styles.pointsBox}>
      (semester=="Fall Semester" ? (
        <Text style={styles.bold}>FALL POINTS</Text>
        <Text style={styles.center}>{user ? user.fallPoints : "0"}</Text>
        <Text style={styles.center}>{user ? user.fallPercentile : "0"} percentile</Text>
      ) : semester=="Spring Semester" ? (
        <Text style={styles.bold}>SPRING POINTS</Text>
        <Text style={styles.center}>{user ? user.springPoints : "0"}</Text>
        <Text style={styles.center}>{user ? user.springPercentile : "0"} percentile</Text>
      ) : semester == "Summer Semester" ? (
        <Text style={styles.bold}>SUMMER POINTS</Text>
        <Text style={styles.center}>{user ? user.summerPoints : "0"}</Text>
        <Text style={styles.center}>{user ? user.summerPercentile : "0"} percentile</Text>
      ) : (
        <Text>Invalid semester</Text>
      ))
    </View>
  );
};

const styles = StyleSheet.create({
  pointsBox: {
    backgroundColor: "powderblue",
    borderColor: "gray",
    margin: "2%",
    paddingBottom: "2%",
    paddingTop: "2%",
    textAlign: "center",
    width: "100%"
  },
  bold: {
    fontWeight: "bold",
    textAlign: "center"
  },
  center: {
    textAlign: "center"
  }
});

export default PointsBox;
