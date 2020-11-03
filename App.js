import { StatusBar } from 'expo-status-bar';
import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

import Points from "./Pages/Points";

export default function App() {

let user = {
  "points": 3,
  "fallPoints": 2,
  "springPoints": 1,
  "summerPoints": 0,
  "fallPercentile": '99%',
  "springPercentile": '99%',
  "summerPercentile": '99%',

}

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Points user={user}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
