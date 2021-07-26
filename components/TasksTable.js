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

      let rowStyle = styles.tableRow1;
      let iAsString = i.toString();
      const iLen = iAsString.length
      if (iAsString[iLen-1] == "1" || iAsString[iLen-1] == "3" ||
       iAsString[iLen-1] == "6" || iAsString[iLen-1] == "8" ){
          rowStyle = styles.tableRow2
      }


      if (now < Date.parse(task.endDate)) {
        let row = [
          <DataTable.Row key={task.name} style = {rowStyle}>
            <DataTable.Cell>{task.name}</DataTable.Cell>
            <DataTable.Cell>{task.endDate}</DataTable.Cell>
            <DataTable.Cell numeric>{task.points}</DataTable.Cell>
          </DataTable.Row>,
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
          <Text style={styles.noContentText}>No tasks on record.</Text>
        </View>
      ) : (
        <View style = {styles.tableContainer}>
          <DataTable>
            <DataTable.Header style = {styles.headerContainer}>
              <DataTable.Title>
                <Text style = {styles.headerTextStyle}>NAME</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style = {styles.headerTextStyle}>END DATE</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style = {styles.headerTextStyle}>      POINTS</Text>
              </DataTable.Title>
            </DataTable.Header>
            {tableContents[page]}
            <DataTable.Pagination
              page={page}
              numberOfPages={tasks.length}
              onPageChange={(page) => setPage(page)}
              label={`${from + 1}-${Math.min(to, total)} of ${total}`}
            />
          </DataTable>
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  tableContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#C1C1C1"
},
headerContainer:{
    backgroundColor: "#F6F6F6",
    color: '#0070C0',
    fontSize: 22,

},
headerTextStyle: {
    color: '#0070C0',
    fontSize: 20,
    textDecorationColor: '#0070C0',

},
tableRow1: {
    backgroundColor: "#FFF",
},
tableRow2: {
    backgroundColor: "#F6F6F6",
},

container: {
  width: "100%",
},
title: {
  alignSelf: 'flex-start',
  fontSize: 30,
  margin: 6,
  fontWeight: 'bold',
  fontStyle: 'italic',
  color: '#FD652F'
},
noContentText: {
  fontSize:16,
  backgroundColor: '#EEE',
  height: 55,
  textAlign: 'center',
  alignContent: 'center',
  alignItems: 'center',
  alignContent: 'center',
  justifyContent: 'center',
  borderColor: 'black',
  borderWidth:1,
  borderColor: '#ccc',
  borderRadius : 10,
}
});

export default TasksTable;
