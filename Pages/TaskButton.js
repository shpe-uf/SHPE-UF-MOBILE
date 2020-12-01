import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  TouchableHighlight,
} from "react-native";
import { useMutation, gql } from "@apollo/client";
import { useForm, getErrors } from "../util/hooks";
import Constants from "expo-constants";

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
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          redeemTasksPoints({
            variables: { name: taskName, username: user.username },
          });
        }}
      >
        <Text style={styles.textStyle}>Request</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    color: "white",
    height: 40,
    backgroundColor: "#42A5F5",
    borderRadius: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: "#004D73",
  },
  textStyle: {
    padding: 8,
    color: "white",
    fontWeight: "bold",
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
