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
import allStyles from ".././allStyles.js";
import TaskCard from ".././components/TaskCard";

function Tasks() {
  const { loading, data, error } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: "5f90e4d4920bab09f6df0106" // dummy user for now
    }
  });

  let bookTasks = [];
  let restTasks = [];
  let bookProps = [];
  let restProps = [];

  if (data && data.getUser && data.getTasks) {
    const user = data.getUser;
    const allTasks = data.getTasks;

    bookTasks = allTasks.filter(task =>
      user.bookmarkedTasks.includes(task.name)
    );
    bookProps = {
      "user": user,
      "tasks": bookTasks,
    }

    restTasks = allTasks.filter(
      task => !user.bookmarkedTasks.includes(task.name)
    );
    restProps = {
      "user": user,
      "tasks": restTasks,
    }
  }

  return (
    <View style={allStyles.container}>
      <View style={allStyles.page}>
          {loading ? (
            <Text>loading data</Text>
          ) : error ? (
            <Text>there was a problem</Text>
          ) : (
            <>
            <View style={allStyles.content}>
              <View>
                <Text style={allStyles.h1}>BOOKMARKED TASKS</Text>
                <TaskCard props={bookProps} />
              </View>
              <View>
                <Text style={allStyles.h1}>UNBOOKMARKED TASKS</Text>
                <TaskCard props={restProps} />
              </View>
              </View>
            </>
          )}
      </View>
    </View>
  );
}

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
