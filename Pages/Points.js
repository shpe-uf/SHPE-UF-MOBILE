import React, { useContext, useState } from "react";
import { Alert, Button, View, Text, StyleSheet } from "react-native";

import PointsBar from ".././components/PointsBar";

const Points = ({ user }) => {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button
          accessibilityLabel="Button to redeem code."
          title="Redeem Code"
          color="#1395b9"
          onPress={() => Alert.alert("Redeem Code button pressed.")}
        />
      </View>
      <PointsBar user={user}/>
      <View styles={styles.events}>
        <Text>EVENTS</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    backgroundColor: "#fff",
    width: "80%"
  },
  button: {
    width: "30%",
    marginBottom: '10px',
  },
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
    padding: "10px",
    margin: "10px"
  },
  events: {
    alignItems: 'flex-start'
  }
});

export default Points;
