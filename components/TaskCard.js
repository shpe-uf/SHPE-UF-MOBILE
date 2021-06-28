import React, { useState, createContext, useContext } from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import { Card } from "react-native-elements";
import TaskButton from "./TaskButton";
import allStyles from ".././allStyles.js";

function TaskCard({ props }) {
  const user = props.user;
  const tasks = props.tasks;

  return (
    <>
      {tasks.map(task => (
        <Card key={task.name} style={styles.card}>
          <Text style={allStyles.h2}>{task.name}</Text>
          <Text>
            <b>Points: {task.points}</b>
          </Text>
          <Text style={styles.date}>
            {task.startDate + " - " + task.endDate}
          </Text>
          <Text>{task.description}</Text>
          {}
          <TaskButton username={user.username} taskName={task.name} />
        </Card>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 0,
    borderRadius: 10
  },
  date: {
    color: "#72A9BE",
    marginTop: 8,
    marginBottom: 8
  }
});

export default TaskCard;
