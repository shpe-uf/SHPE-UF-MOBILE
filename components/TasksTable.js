import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
// import { Row, Rows, Table } from "react-native-table-component";
import { useQuery, gql } from "@apollo/client";
import { FETCH_TASKS_QUERY } from ".././util/graphql";

function TasksTable() {
  let { data, loading } = useQuery(FETCH_TASKS_QUERY);
  let tasks = null;

  if (data) {
    tasks = data.getTasks;

    const maxTasks = Math.min(tasks.length, 5);

    const tableHead = ["Name", "End Date", "Points"];
    let tableContents = [];
    if (tasks) {
      for (let i = 0; i < maxTasks; i++) {
        const task = tasks[i];

        const row = [task.name, task.endDate, task.points];
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
      ) : tasks && tasks.length === 0 ? (
        <View style={{ paddingBottom: 16 }}>
          <Text>No tasks on record.</Text>
        </View>
      ) : (
        <View className="table-responsive">
          <Text>Insert tasks table here.</Text>
          {/* <Table borderStyle={styles.table}>
            <Row data={tableHead} textStyle={styles.header}/>
            <Rows data={tableContents} style={styles.table} textStyle={styles.text}/>
          </Table> */}
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
