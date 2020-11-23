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

let user = {
  points: 3,
  fallPoints: 2,
  springPoints: 1,
  summerPoints: 0,
  fallPercentile: "99",
  springPercentile: "99",
  summerPercentile: "99",
  events: [
    {
      name: "1st GBM Fall 2020",
      category: "General Body Meeting",
      createdAt: "2020-09-09T21:51:32.519Z",
      points: 1
    },
    {
      name: "2nd GBM Fall 2020",
      category: "General Body Meeting",
      createdAt: "2020-09-30T22:17:39.859Z",
      points: 1
    }
  ]
};

const Points = () => {
  /*
  var { data, refetch } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: "5e2e021a9e14e7034c4188a3"
    }
  });

  if (data) {
    var user = data.getUser;
  }
  console.log(user);
  */


  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.button}>
          <Button
            accessibilityLabel="Button to redeem code."
            title="Redeem Code"
            color="#fff"
            onPress={() => Alert.alert("Redeem Code button pressed.")}
          />
        </View>
        <PointsBar user={user} />
        <View style={styles.events}>
          <UserEventsTable user={user} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%"
  },
  content: {
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
  events: {
    alignItems: "flex-start",
    width: "100%"
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
