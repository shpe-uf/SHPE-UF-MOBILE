import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  Button,
  Alert,
  Text,
  View
} from "react-native";
import { Card, ListItem, Icon, ScrollView } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useForm, getErrors } from "../util/hooks";

function Tasks() {
  const { loading, data, error } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: "5f90e4d4920bab09f6df0106" // dummy user for now
    }
  });

  let bookTasks = [];
  let restTasks = [];

  if (data && data.getUser && data.getTasks) {
    const user = data.getUser;
    const allTasks = data.getTasks;

    bookTasks = allTasks.filter(task =>
      user.bookmarkedTasks.includes(task.name)
    );

    restTasks = allTasks.filter(
      task => !user.bookmarkedTasks.includes(task.name)
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.page}>
        <View style={styles.content}>
          {loading ? (
            <Text>loading data</Text>
          ) : error ? (
            <Text>there was a problem</Text>
          ) : (
            <>
              <View>
                <Text style={styles.h1}>BOOKMARKED TASKS</Text>
              </View>
              {bookTasks.map(task => (
                <Card key={task.name}>
                  <Text>{task.name}</Text>
                  <Text>{task.points}</Text>
                  <Card.Divider />
                  <Text>
                    Points: {task.points}
                    {"\n\n"}
                    {task.description}
                  </Text>
                </Card>
              ))}
              <View>
                <Text style={styles.h1}>UNBOOKMARKED TASKS</Text>
              </View>
              {restTasks.map(task => (
                <Card key={task.name} style={styles.content}>
                  <Card.Title>{task.name}</Card.Title>
                  <Card.Divider />
                  <Text>
                    Points: {task.points}
                    {"\n\n"}
                    {task.description}
                  </Text>
                </Card>
              ))}
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%"
  },
  page: {
    alignItems: "center",
    alignSelf: "center",
    width: "80%"
  },
  content: {
    width: "100%"
  },
  h1: {
    fontSize: 23,
    margin: 6,
    color: "#FD652F",
    fontWeight: "bold",
    fontStyle: "italic"
  }
});

const FETCH_USER_QUERY = gql`
  query($userId: ID!) {
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
    getTasks {
      id
      name
      startDate
      endDate
      description
      points
      attendance
      semester
      createdAt
      users {
        firstName
        lastName
        username
        email
      }
    }
  }
`;
export default Tasks;
