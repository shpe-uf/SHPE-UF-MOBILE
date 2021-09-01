import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";

import PointsBox from "./PointsBox";

function PointsBar({ user }) {
  const fallProps = { user: user, semester: "Fall Semester" };
  const springProps = { user: user, semester: "Spring Semester" };
  const summerProps = { user: user, semester: "Summer Semester" };

  return (
    <View style={styles.pointsBar}>
      <PointsBox props={fallProps} />
      <PointsBox props={springProps} />
      <PointsBox props={summerProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  pointsBar: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default PointsBar;
