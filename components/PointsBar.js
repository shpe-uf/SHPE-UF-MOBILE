import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import PointsBox from "./PointsBox";

const PointsBar = ({user}) => {
  return (
    <PointsBox user={user} semester={{text: "Fall Semester"}} />

    /*
    <PointsBox user={user} semester="Spring Semester" />
    <PointsBox user={user} semester="Summer Semester" />

    <View style={styles.pointsBar}>
      <View style={styles.pointsBox}>
        <Text style={styles.bold}>FALL POINTS</Text>
        <Text style={styles.center}>{user ? user.fallPoints : "0"}</Text>
        <Text style={styles.center}>{user ? user.fallPercentile : "0"} percentile</Text>
      </View>
      <View style={styles.pointsBox}>
        <Text style={styles.bold}>SPRING POINTS</Text>
        <Text style={styles.center}>{user ? user.springPoints : "0"}</Text>
        <Text style={styles.center}>{user ? user.springPercentile : "0"} percentile</Text>
      </View>
      <View style={styles.pointsBox}>
        <Text style={styles.bold}>SUMMER POINTS</Text>
        <Text style={styles.center}>{user ? user.summerPoints : "0"}</Text>
        <Text style={styles.center}>{user ? user.summerPercentile : "0"} percentile</Text>
      </View>
    </View>
    */
  );
};

const styles = StyleSheet.create({
  pointsBar: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    width: "100%"
  },
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

export default PointsBar;
