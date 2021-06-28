import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import Constants from "expo-constants";

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
    }
  });

  return (
    <View style={styles.button}>
      <Button
        color="#72A9BE"
        onPress={() => {
          redeemTasksPoints({
            variables: { name: props.taskName, username: props.username }
          });
        }}
        title="Request"
        accessibilityLabel="Button to request task points"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: "3%",
    borderRadius: 70,
    width: "100%"
  }
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
