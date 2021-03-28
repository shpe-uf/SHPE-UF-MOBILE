import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import Constants from "expo-constants";

import { useMutation, gql } from "@apollo/client";
import { useForm, getErrors } from "../util/hooks";

function TaskButton(props) {
  let taskName = props.task;
  let user = props.user;

  const [redeemTasksPoints] = useMutation(REDEEM_TASK_POINTS_MUTATION, {
    update(_, { data: { redeemTasksPoints: userData } }) {},

    onError(err) {
      getErrors(err);
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button
          onPress={() => {
            redeemTasksPoints({
              variables: { name: taskName, username: user.username },
            });
          }}
          title="Request"
          accessibilityLabel="Button to request task points"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: "9%",
    backgroundColor: "#42A5F5",
    borderRadius: 50,
    marginLeft: "15%",
    width: "70%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: "#004D73",
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
