import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DataTable } from "react-native-paper";

import { useQuery, gql } from "@apollo/client";
import { FETCH_TASKS_QUERY } from ".././util/graphql";

function TasksTable() {
  let { data, loading } = useQuery(FETCH_TASKS_QUERY);

  let tasks = null;
  let tablePage = [];
  let tableContents = [];
  let total = 0;

  const [page, setPage] = React.useState(0);
  const itemsPerPage = 5;
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;


  const monthOptions = require("./../assets/options/month.json");
  const now = new Date();
  const month = now.getMonth();
  const semester = monthOptions[month].value;

  if (data) {
    tasks = data.getTasks;

    const maxTasks = Math.min(tasks.length, 5);
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      if (now < Date.parse(task.endDate)) {
        let row = [
          <DataTable.Row key={task.name}>
            <DataTable.Cell>{task.name}</DataTable.Cell>
            <DataTable.Cell>{task.endDate}</DataTable.Cell>
            <DataTable.Cell numeric>{task.points}</DataTable.Cell>
          </DataTable.Row>
        ];
        tablePage.push(row);
        if (tablePage.length >= maxTasks || i === tasks.length - 1) {
          tableContents.push(tablePage);
          total += tablePage.length;
          tablePage = [];
        }
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks</Text>
      {!tasks || tasks.length === 0 || tableContents.length === 0 ? (
        <View style={{ paddingBottom: 16 }}>
          <Text>No upcoming tasks for this semester.</Text>
        </View>
      ) : (
        <View>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>End Date</DataTable.Title>
              <DataTable.Title numeric>Points</DataTable.Title>
            </DataTable.Header>
            {tableContents[page]}
            <DataTable.Pagination
              page={page}
              numberOfPages={tasks.length}
              onPageChange={page => setPage(page)}
              label={`${from + 1}-${Math.min(to,total)} of ${total}`}
            />
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
