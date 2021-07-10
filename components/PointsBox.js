import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const PointsBox = ({ props }) => {
  const user = props.user;
  const semester = props.semester;

  return (
    <View style={{paddingHorizontal: 15}}>
      {semester === "Fall Semester" ? (
        <View style={styles.pointsBox}>
          <View style={{paddingTop:'10%'}}>
            <Text style={styles.top}>Fall</Text>
          </View>

          
          
          <Text style={styles.middle}
          >{user ? user.fallPoints : "0"}</Text>


          <View style={{paddingTop: '4%'}}>
            <Text style={styles.bottom}>
              {user ? user.fallPercentile : "0"} percentile
            </Text>
            
          </View>

        </View>
      ) : semester === "Spring Semester" ? (
        <View style={styles.pointsBox}>
          <View style={{paddingTop:'10%'}}>
            <Text style={styles.top}>Spring</Text>
          </View>

          
          
          <Text style={styles.middle}
          >{user ? user.springPoints : "0"}</Text>


          <View style={{paddingTop: '4%'}}>
            <Text style={styles.bottom}>
              {user ? user.springPercentile : "0"} percentile
            </Text>
            
          </View>

        </View>
      ) : semester === "Summer Semester" ? (
        <View style={styles.pointsBox}>
          <View style={{paddingTop:'10%'}}>
            <Text style={styles.top}>Summer</Text>
          </View>

          
          
          <Text style={styles.middle}
          >{user ? user.SummerPoints : "0"}</Text>


          <View style={{paddingTop: '4%'}}>
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
    backgroundColor: "#1395B9",
    borderColor: "gray",
    margin: "2%",
    paddingBottom: "2%",
    paddingTop: "2%",
    textAlign: "center",
    width: "110%",
    borderRadius:5,
    height: '65%'
  },
  center: {
    textAlign: "center",
    color: 'red'
  },
  top:{
    textAlign: "center",
    fontSize:20,
    color: '#fff'
  },
  middle:{
    textAlign: "center",
    fontSize:29,
    color: '#fff'
  },
  bottom: {
    textAlign: "center",
    color: '#fff'
  }
});

export default PointsBox;
