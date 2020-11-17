import React, { useContext, useState } from "react";
import { Alert, Button, View, Text, StyleSheet } from "react-native";

const PointsBar = ({ user }) => {
  return (
    <View style={styles.pointsBar}>
      <View style={styles.pointsBox}>
        <Text>FALL POINTS</Text>
        <Text>{user ? user.fallPoints : "0"}</Text>
        <Text>{user ? user.fallPercentile : "0"} percentile</Text>
      </View>
      <View style={styles.pointsBox}>
        <Text>SPRING POINTS</Text>
        <Text>{user ? user.springPoints : "0"}</Text>
        <Text>{user ? user.springPercentile : "0"} percentile</Text>
      </View>
      <View style={styles.pointsBox}>
        <Text>SUMMER POINTS</Text>
        <Text>{user ? user.summerPoints : "0"}</Text>
        <Text>{user ? user.summerPercentile : "0"}</Text>
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
    padding: "2%",
    margin: "2%"
  }
});

export default PointsBar;
