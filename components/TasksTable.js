import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DataTable } from 'react-native-paper';

import { useQuery, gql } from "@apollo/client";
import { FETCH_TASKS_QUERY } from ".././util/graphql";

function TasksTable() {
  let { data, loading } = useQuery(FETCH_TASKS_QUERY);
  let tasks = null;

  if (data) {
    tasks = data.getTasks;

    const maxTasks = Math.min(tasks.length, 5);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks</Text>
      {loading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : tasks && tasks.length === 0 ? (
        <View style={{ paddingBottom: 16 }}>
          <Text>No tasks on record.</Text>
        </View>
      ) : (
        <View className="table-responsive">
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>End Date</DataTable.Title>
            <DataTable.Title numeric>Points</DataTable.Title>
          </DataTable.Header>
          {tasks.map((task, index) => {
            <View>
              <DataTable.Row>
                <DataTable.Cell>{task.name}</DataTable.Cell>
                <DataTable.Cell>{task.endDate}</DataTable.Cell>
                <DataTable.Cell numeric>{task.points}</DataTable.Cell>
              </DataTable.Row>
            </View>
          })}
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
