import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DataTable } from "react-native-paper";

import { useQuery, gql } from "@apollo/client";
import { FETCH_TASKS_QUERY } from ".././util/graphql";

import Pagination from "./Pagination";


function TasksTable() {
  let { data, loading } = useQuery(FETCH_TASKS_QUERY);

  let tasks = null;
  let tableContents = [];

  const itemsPerPage = 5;
  const [page, setPage] = React.useState(0);
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  const monthOptions = require("./../assets/options/month.json");
  const now = new Date();
  const month = now.getMonth();
  const semester = monthOptions[month].value;

  if (data) {
    tasks = data.getTasks;

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
        tableContents.push(row);
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
            {tableContents}
            {tableContents.length > itemsPerPage ? (
              <Pagination items={tableContents} />
              /*
              <View>
                <DataTable.Pagination
                  page={page}
                  numberOfPages={Math.floor(tableContents.length / itemsPerPage)}
                  onPageChange={page => setPage(page)}
                  label={`${from + 1}-${to} of ${tableContents.length}`}
                />
              </View>
              */
            ) : (
              <View></View>
            )}
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
