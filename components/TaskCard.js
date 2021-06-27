import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  Button,
  Alert,
  Text,
  View
} from "react-native";
import { Card } from "react-native-elements";
import allStyles from ".././allStyles.js";

function TaskCard({ tasks }) {
  return (
    <>
      {tasks.map(task => (
        <Card key={task.name}>
          <Text style={allStyles.h2}>{task.name}</Text>
          <Text>
            <b>Points: {task.points}</b>
          </Text>
          <Card.Divider />
          <Text>{task.startDate + " - " + task.endDate}</Text>
          <Text>{task.description}</Text>
        </Card>
      ))}
    </>
  );
}

export default TaskCard;
