import React, { useContext, useState } from "react";
import { Alert, Button, View, Text, StyleSheet } from "react-native";

import PointsBar from ".././components/PointsBar";
import UserEventsTable from ".././components/UserEventsTable";

let user = {
  points: 3,
  fallPoints: 2,
  springPoints: 1,
  summerPoints: 0,
  fallPercentile: "99%",
  springPercentile: "99%",
  summerPercentile: "99%",
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

// 5e2e021a9e14e7034c4188a3

const Points = () => {
  var {data, refetch} = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: "5e2e021a9e14e7034c4188a3"
    }
  });

  if(data){
    var user = data.getUser;
  }

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button
          accessibilityLabel="Button to redeem code."
          title="Redeem Code"
          color="#1395b9"
          onPress={() => Alert.alert("Redeem Code button pressed.")}
        />
      </View>
      <PointsBar user={user} />
      <View styles={styles.events}>
        <Text>EVENTS</Text>
        <UserEventsTable user={user} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    backgroundColor: "#fff",
    width: "80%"
  },
  button: {
    width: "30%",
    marginBottom: '10px',
  },
  pointsBar: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  pointsBox: {
    backgroundColor: "powderblue",
    borderColor: "gray",
    textAlign: "center",
    width: "100%",
    padding: "10px",
    margin: "10px"
  },
  events: {
    alignItems: 'flex-start'
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
