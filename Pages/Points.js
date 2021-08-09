import React, { useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { gql, useMutation, useQuery } from "@apollo/client";

import PointsBar from ".././components/PointsBar";
import UserEventsTable from ".././components/UserEventsTable";
import TasksTable from "../components/TasksTable";
import CodeButton from "../components/CodeButton";

function Points({ navigation }) {
  let { data, error, loading, refetch } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: "5fb2faa33945aa36700adfd0",
    },
  });
  let user = null;

  if (data) {
    user = data.getUser;
  }

  return (
    <View>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>POINTS PROGRAM</Text>
        <PointsBar />
        <View style={{ paddingVertical: "5%" }} />
        <TasksTable />
        <UserEventsTable user={user} />
      </ScrollView>
      <View style={styles.circularBtn}>
        <CodeButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
    paddingHorizontal: 40,
  },
  page: {
    alignItems: "center",
    alignSelf: "center",
    margin: "2%",
  },
  title: {
    textAlign: "center",
    color: "#001F5B",
    fontSize: 35,
    paddingVertical: "10%",
  },
  circularBtn: {
    borderWidth: 10,
    borderRadius: 100,
    borderColor: "#001F5B",
    position: "absolute",
    alignSelf: "flex-end",
    bottom: 10,
    right: 10,
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

export default Points;
