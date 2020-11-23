import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Modal,
  TouchableHighlight,
} from "react-native";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useForm, getErrors } from "../util/hooks";
import Constants from "expo-constants";

function TaskButton() {
  let { data, refetch } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: "5fb2faa33945aa36700adfd0", //to be changed to id later
    },
  });
  if (data) {
    let user = data.getUser;
  }

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          console.log(user);
        }}
      >
        <Text style={styles.textStyle}>Testing</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: "black",
    margin: 10,
    marginLeft: 0,
  },
  header: {
    color: "#ff5400",
    fontSize: 30,
    fontWeight: "bold",
    fontStyle: "italic",
    margin: 10,
    marginLeft: 0,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
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
  input: {
    backgroundColor: "white",
    height: 40,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#c8c8c8",
  },
  textStyle: {
    padding: 8,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

const FETCH_USER_QUERY = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      firstName
      lastName
      points
      fallPoints
      springPoints
      summerPoints
      fallPercentile
      springPercentile
      summerPercentile
      events {
        name
        category
        createdAt
        points
      }
      tasks {
        name
        points
        startDate
      }
      bookmarkedTasks
    }
  }
`;



export default TaskButton;
