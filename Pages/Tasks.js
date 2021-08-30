import React, { useState } from "react";
import { Keyboard, Text, View, StyleSheet } from "react-native";
import { ScrollView, Card } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useMutation, useQuery, gql } from "@apollo/client";
import { useForm, getErrors } from "../util/hooks";
import allStyles from ".././allStyles.js";

import TaskCard from ".././components/TaskCard";

function Tasks() {
  const [id, setId] = useState("");
  const readData = async () => {
    try {
      const storedId = await AsyncStorage.getItem("@storage_Key");
      if (storedId !== null) {
        setId(JSON.parse(storedId).login.id);
      }
    } catch (e) {
      return [];
    }
  };
  readData();

  const { loading, data, error } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: id,
    },
  });

  let bookTasks = [];
  let restTasks = [];
  let bookProps = [];
  let restProps = [];

  const monthOptions = require("./../assets/options/month.json");
  const now = new Date();
  const month = now.getMonth();
  const semester = monthOptions[month].value;

  if (data && data.getUser && data.getTasks) {
    const user = data.getUser;
    const allTasks = data.getTasks;

    for (let i = 0; i < allTasks.length; i++) {
      const task = allTasks[i];
      if (
        now < Date.parse(task.endDate) &&
        user.bookmarkedTasks.includes(task.name)
      ) {
        bookTasks.push(task);
      }
    }
    bookProps = {
      user: user,
      tasks: bookTasks,
    };

    for (let i = 0; i < allTasks.length; i++) {
      const task = allTasks[i];
      if (
        now < Date.parse(task.endDate) &&
        !user.bookmarkedTasks.includes(task.name)
      ) {
        restTasks.push(task);
      }
    }
    restProps = {
      user: user,
      tasks: restTasks,
    };
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
                <Text style={allStyles.title}>TASKS</Text>
                <Text style={allStyles.h2}>BOOKMARKED TASKS</Text>
                {bookTasks.length == 0 ? (
                  <View style={{ paddingBottom: 16, paddingTop: 10 }}>
                    <Text style={allStyles.noContentText}>No tasks have been bookmarked yet.</Text>
                  </View>
                ) : (
                  <TaskCard props={bookProps} />
                )}
              </View>
              <View>
                <Text style={allStyles.h2}>UNBOOKMARKED TASKS</Text>
                {restTasks.length == 0 ? (
                  <Card>
                    <Text>There are no tasks yet.</Text>
                  </Card>
                ) : (
                  <TaskCard props={restProps} />
                )}
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    color: "#001F5B",
    fontSize: 28,
    paddingVertical: "1%",
    marginTop: "5%",
  },
});

const FETCH_USER_QUERY = gql`
  query($userId: ID!) {
    getUser(userId: $userId) {
      firstName
      lastName
      username
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
