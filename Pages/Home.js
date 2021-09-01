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
import AsyncStorage from "@react-native-async-storage/async-storage";

import allStyles from ".././allStyles.js";
import PointsBox from ".././components/PointsBox";
import TasksTable from ".././components/TasksTable";
import EventsTable from ".././components/EventsTable";

function Home() {
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
  const { data } = useQuery(FETCH_USER_QUERY, {
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

  const monthOptions = require("./../assets/options/month.json");
  const month = new Date().getMonth();
  const semester = monthOptions[month].value;
  const props = { user: user, semester: monthOptions[month].value };

  return (
    <ScrollView style={allStyles.container}>
      <View style={allStyles.page}>
        {user ? (
          <View style={allStyles.content}>
            <Text style={allStyles.title}>SHPE UF</Text>
            <PointsBox props={props} />
            <TasksTable />
            <EventsTable />
          </View>
        ) : (
          <View style={allStyles.content}>
            <Text>User not found</Text>
            <TasksTable />
            <EventsTable />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

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

export default Home;
