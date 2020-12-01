import  React, {useState} from 'react';
import { TouchableWithoutFeedback, TextInput, StyleSheet, SafeAreaView, Keyboard, Button, Alert, Text, View} from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useMutation, useQuery, gql } from "@apollo/client";
import { useForm, getErrors } from "../util/hooks";

function ViewTasks() {

    const { loading, data, error } = useQuery(FETCH_USER_QUERY, {
      variables: {
        userId: "5f90e4d4920bab09f6df0106", // dummy user for now
      },
    });
    if (loading) return null;
    if (error) return null;

      const user = data.getUser;
      const allTasks = data.getTasks;
      const bookTasks = user.bookmarkedTasks;

      const cards = [];

      // BOOKMARKED TASKS DISPLAYED HERE
      cards.push(
      <Card>
      <Card.Title>BOOKMARKED TASKS</Card.Title>
      </Card>
      )
      for (let i = 0; i<bookTasks.length; i++){
        for (let j = 0; j<allTasks.length; j++){
          if (bookTasks[i] == allTasks[j].name){
            cards.push(
              <Card>
              <Card.Title>{allTasks[j].name}</Card.Title>
              <Card.Divider/>{
                <Text>
                  Points: {allTasks[j].points}
                  <br /> <br />
                  {allTasks[j].description}
                  </Text>
              }
              </Card>
            )
          }
        }
      }

      // ALL UNBOOKMARKED TASKS DISPLAYED HERE
      cards.push(
      <Card>
      <Card.Title>UNBOOKMARKED TASKS</Card.Title>
      </Card>
      )
      for (let i = 0; i<bookTasks.length; i++){
        for (let j = 0; j<allTasks.length; j++){
          if (bookTasks[i] != allTasks[j].name){
            cards.push(
              <Card>
              <Card.Title>{allTasks[j].name}</Card.Title>
              <Card.Divider/>{
                <Text>
                  Points: {allTasks[j].points}
                  <br /> <br />
                  {allTasks[j].description}
                  </Text>
              }
              </Card>
            )
          }
        }
      }



return cards;
}


const FETCH_USER_QUERY = gql`
  query ($userId: ID!) {
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


    getTasks {
      id
      name
      startDate
      endDate
      description
      points
      attendance
      semester
      createdAt
      users {
        firstName
        lastName
        username
        email
      }
    }
  }
`;
export default ViewTasks;
