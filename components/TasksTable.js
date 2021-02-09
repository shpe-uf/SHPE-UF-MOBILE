import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DataTable } from "react-native-paper";

import { useQuery, gql } from "@apollo/client";
import { FETCH_TASKS_QUERY } from ".././util/graphql";

function TasksTable() {
  let { data, loading } = useQuery(FETCH_TASKS_QUERY);

  let tasks = null;
  let tableContents = [];

  const monthOptions = require("./../assets/options/month.json");
  const now = new Date();
  const month = now.getMonth();
  const semester = monthOptions[month].value;

  if (data) {
    tasks = data.getTasks;

    const maxTasks = Math.min(tasks.length, 5);
    for (let i = 0; i < maxTasks; i++) {
      const task = tasks[i];
      if (now < Date.parse(task.endDate)) {
        let row = [
          <DataTable.Row>
            <DataTable.Cell>{task.name}</DataTable.Cell>
            <DataTable.Cell>{task.endDate}</DataTable.Cell>
            <DataTable.Cell numeric>{task.points}</DataTable.Cell>
          </DataTable.Row>
        ];
        tableContents.push(row);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks</Text>
      {loading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : tasks && (tasks.length === 0 || tableContents.length === 0) ? (
        <View style={{ paddingBottom: 16 }}>
          <Text>No upcoming tasks for this semester.</Text>
        </View>
      ) : (
        <View className="table-responsive">
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>End Date</DataTable.Title>
              <DataTable.Title numeric>Points</DataTable.Title>
            </DataTable.Header>
            {tableContents}
          </DataTable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
  title: {
    alignSelf: "center",
    fontSize: 23,
    margin: 6
  },
  header: {
    fontWeight: "bold",
    paddingBottom: "3%",
    textAlign: "center"
  },
  table: {
    backgroundColor: "powderblue",
    marginBottom: "2%",
    padding: "1.5%",
    width: "100%"
  },
  text: {
    textAlign: "center"
  }
});

export default TasksTable;
