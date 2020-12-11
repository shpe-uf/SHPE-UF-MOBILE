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

  let bookTasks = [];
  let restTasks = [];

  if(data && data.getUser && data.getTasks){
    const user = data.getUser;
    const allTasks = data.getTasks;

    bookTasks = allTasks.filter(task =>
      user.bookmarkedTasks.includes(task.name)
    )

    restTasks = allTasks.filter(task =>
      !user.bookmarkedTasks.includes(task.name)
    )
  }

  return (
    loading ?
      <Text>loading data</Text>
    :
    error ?
      <Text>there was a problem</Text>
    :
    <>
    <Card>
      <Card.Title>BOOKMARKED TASKS</Card.Title>
    </Card>
    {bookTasks.map(task =>
      <Card key={task.name}>
        <Card.Title>{task.name}</Card.Title>
        <Card.Divider/>
        <Text>
          Points: {task.points}
          <br /><br />
          {task.description}
        </Text>
      </Card>
    )}
    <Card>
      <Card.Title>UNBOOKMARKED TASKS</Card.Title>
    </Card>
    {restTasks.map(task =>
      <Card key={task.name}>
        <Card.Title>{task.name}</Card.Title>
        <Card.Divider/>
        <Text>
          Points: {task.points}
          <br /> <br />
          {task.description}
        </Text>
      </Card>
    )}
    </>
  );
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
