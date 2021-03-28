import React, { useContext, useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

import { gql, useMutation, useQuery } from "@apollo/client";

import PointsBox from ".././components/PointsBox";
import TasksTable from ".././components/TasksTable";
import EventsTable from ".././components/EventsTable";

function Home() {
  const [user, setUser] = useState({});
  const { data } = useQuery(FETCH_USER_QUERY, {
    onError(err) {
      console.log(err);
    },
    variables: {
      userId: "5f90e4d4920bab09f6df0106"
    }
  });

  if (data && data.getUser != user) {
    setUser(data.getUser);
  }

  const monthOptions = require("./../assets/options/month.json");
  const month = new Date().getMonth();
  const semester = monthOptions[month].value;
  const props = { user: user, semester: monthOptions[month].value };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.page}>
        {user ? (
          <View style={styles.content}>
            <PointsBox props={props} />
            <TasksTable />
            <EventsTable />
          </View>
        ) : (
          <View style={styles.content}>
            <Text>User not found</Text>
            <TasksTable />
            <EventsTable />
          </View>
        )}
      </View>
    </ScrollView>
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
  events: {
    alignItems: "flex-start"
  }
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

export default Home;
