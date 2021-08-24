import React, { useState, useContext } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Constants from "expo-constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useMutation, gql } from "@apollo/client";
import { useForm, getErrors } from "../util/hooks";

function TaskButton(props) {
  const [redeemTasksPoints] = useMutation(REDEEM_TASK_POINTS_MUTATION, {
    update(_, { data: { redeemTasksPoints: userData } }) {},
    onError(err) {
      getErrors(err);
    },
    onCompleted() {
      Alert.alert("Request Successful!");
    },
  });

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          redeemTasksPoints({
            variables: { name: props.taskName, username: props.username },
          });
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Request</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    backgroundColor: "#72A9BE",
    borderColor: "#72A9BE",
    borderRadius: 6,
    height: hp("7%"),
    justifyContent: "center",
    marginTop: hp("1.5%"),
    width: wp("60%"),
  },
  buttonText: {
    color: "#fff",
    fontSize: hp("2.5%"),
    textAlign: "center",
  },
});

const REDEEM_TASK_POINTS_MUTATION = gql`
  mutation redeemTasksPoints($name: String!, $username: String!) {
    redeemTasksPoints(
      redeemTasksPointsInput: { name: $name, username: $username }
    ) {
      firstName
      lastName
    }
  }
`;

export default TaskButton;
