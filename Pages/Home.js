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


function Home() {
  let { data, error, loading, refetch } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: "5fb2faa33945aa36700adfd0"
    }
  });
  let user = null;

  if (data) {
    user = data.getUser;
  }

  const monthOptions = require("../../json/month.json");

  const month = new Date().getMonth();
  const semester = monthOptions[month].value;


  return (
    <ScrollView style={styles.container}>
      <View style={styles.page}>
        {loading ? (
          <View>
            <Text>Loading...</Text>
          </View>
        ) : user ? (
          <View style={styles.content}>
            // points box
            <PointsBox user={user} semester=semester />

            // upcoming tasks
            // upcoming events
            // menu
          </View>
        ) : (
          <View>
            <Text>User not found</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
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
