import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import PointsBox from "./PointsBox";

const PointsBar = ({ user }) => {
  const fallProps = { user: user, semester: "Fall Semester" };
  const springProps = { user: user, semester: "Spring Semester" };
  const summerProps = { user: user, semester: "Summer Semester" };

  return (
    <View>
      <PointsBox props={fallProps} />
      <PointsBox props={springProps} />
      <PointsBox props={summerProps} />
    </View>
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
