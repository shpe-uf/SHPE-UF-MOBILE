import React, { useContext, useState } from "react";
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

function Points({ navigation }) {
  let { data, error, loading, refetch } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: "5f90e4d4920bab09f6df0106"
    }
  });
  let user = null;

  if (data) {
    user = data.getUser;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.page}>
        <View style={styles.button}>
          <Button
            accessibilityLabel="Button to redeem code."
            title="Redeem Code"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
        {loading ? (
          <View>
            <Text>Loading...</Text>
          </View>
        ) : user ? (
          <View style={styles.content}>
            <PointsBar user={user} />
            <View style={styles.events}>
              <UserEventsTable user={user} />
            </View>
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
    width: "100%",
  },
  page: {
    alignItems: "center",
    alignSelf: "center",
    width: "80%",
  },
  button: {
    backgroundColor: "#1395b9",
    color: "#fff",
    margin: "2%",
    width: "60%",
  },
  content: {
    width: "100%",
  },
  events: {
    alignItems: "flex-start",
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
