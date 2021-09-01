import React, { useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import { gql, useMutation, useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

import PointsBar from ".././components/PointsBar";
import UserEventsTable from ".././components/UserEventsTable";
import UserTasksTable from "../components/UserTasksTable";
import CodeButton from "../components/CodeButton";
import allStyles from ".././allStyles.js";

function Points() {
  const [user, setUser] = useState({});
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

  const { loading, data, error, refetch } = useQuery(FETCH_USER_QUERY, {
    onError(err) {
      console.log(err);
    },
    variables: {
      userId: id,
    },
  });

  if (data && data.getUser != user) {
    setUser(data.getUser);
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);
  return (
    <View>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={allStyles.title2}>POINTS PROGRAM</Text>
        {loading ? (
          <Text>loading data</Text>
        ) : error ? (
          <Text>there was a problem</Text>
        ) : (
          <>
            <PointsBar user={user} />
            <View style={{ paddingVertical: "5%" }} />
            <UserTasksTable user={user} />
            <UserEventsTable user={user} />
          </>
        )}
      </ScrollView>
      <View>
        {loading ? (
          <Text>loading data</Text>
        ) : error ? (
          <Text>there was a problem</Text>
        ) : (
          <CodeButton username={user.username} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    paddingHorizontal: 40,
  },
});

const FETCH_USER_QUERY = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      firstName
      lastName
      username
      email
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
