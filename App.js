import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

import PointsBar from "./components/PointsBar";

export default function App() {

/*  var {
    user: { id, username }
  } = useContext(AuthContext);
  */
/*  var id = "5f90e4d4920bab09f6df0106"; */

  var {data, refetch} = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: "5f90e4d4920bab09f6df0106"
    }
  });

  if(data){
    var user = data.getUser;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <PointsBar/>
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
