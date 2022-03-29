import React, { useState, createContext, useContext } from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import { Card } from "react-native-elements";
import TaskButton from "./TaskButton";
import {BookmarkButton, UnBookmarkButton} from "./BookmarkButton";
import allStyles from ".././allStyles.js";
import { Icon } from "react-native-elements/dist/icons/Icon";
import ThemedListItem from "react-native-elements/dist/list/ListItem";


function TaskCard({ props }) {
  const user = props.user;
  const tasks = props.tasks;

  return (
    <>
      {tasks.map((task) => (
        <Card key={task.name} style={styles.card}>
          <BookmarkButton username={user.username} taskName={task.name}/>
          <Text style={allStyles.h3}>{task.name}</Text>
          <Text>{"Points: " + task.points}</Text>
          <Text style={styles.date}>
            {task.startDate + " - " + task.endDate}
          </Text>
          <Text>{task.description}</Text>
          <TaskButton username={user.username} taskName={task.name}/>
        </Card>
      ))}
    </>
  );
}

function BookMarkedTaskCard({ props }) {
  const user = props.user;
  const tasks = props.tasks;

  return (
    <>
      {tasks.map((task) => (
        <Card key={task.name} style={styles.card}>
          <UnBookmarkButton username={user.username} taskName={task.name}/>
          <Text style={allStyles.h3}>{task.name}</Text>
          <Text>{"Points: " + task.points}</Text>
          <Text style={styles.date}>
            {task.startDate + " - " + task.endDate}
          </Text>
          <Text>{task.description}</Text>
          <TaskButton username={user.username} taskName={task.name}/>
        </Card>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
  },
  date: {
    color: "#72A9BE",
    marginBottom: 8,
    marginTop: 8,
  },
  bookmark: {
    color: "#72A9BE",
    marginBottom: 4,
    marginTop: 8,
  }
});

export {TaskCard, BookMarkedTaskCard,}
