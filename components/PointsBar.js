import React, { useContext, useState } from "react";
import { Alert, Button, Dimensions, View, Text, StyleSheet } from "react-native";

const PointsBar = ({ user }) => {
  return (
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
  );
};

const styles = StyleSheet.create({
  pointsBar: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  pointsBox: {
    backgroundColor: "powderblue",
    borderColor: "gray",
    textAlign: "center",
    width: "100%",
    paddingTop: "2%",
    paddingBottom: "2%",
    margin: "2%"
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
