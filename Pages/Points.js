import React, { useContext, useState } from "react";
import {
  Alert,
  Button,
  View,
  Text,
  ScrollView,
  StyleSheet
} from "react-native";

import { useQuery, useMutation, gql } from "@apollo/client";

import PointsBar from ".././components/PointsBar";
import UserEventsTable from ".././components/UserEventsTable";

function Points() {
  let { data, refetch, error, loading } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: "5fb2faa33945aa36700adfd0"
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
            color="#fff"
            onPress={() => Alert.alert("Redeem Code button pressed.")}
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
    width: "100%",
    height: "100%"
  },
  page: {
    alignSelf: "center",
    alignItems: "center",
    width: "80%"
  },
  button: {
    backgroundColor: "#1395b9",
    color: "#fff",
    width: "60%",
    margin: "2%"
  },
  content: {
    width: "100%"
  },
  events: {
    alignItems: "flex-start",
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

export default Points;
