import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DataTable } from "react-native-paper";

import allStyles from ".././allStyles.js";
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

      let rowStyle = allStyles.tableRow1;
      let iAsString = i.toString();
      const iLen = iAsString.length;
      if (
        iAsString[iLen - 1] == "1" ||
        iAsString[iLen - 1] == "3" ||
        iAsString[iLen - 1] == "6" ||
        iAsString[iLen - 1] == "8"
      ) {
        rowStyle = allStyles.tableRow2;
      }

      if (now < Date.parse(task.endDate)) {
        let row = [
          <DataTable.Row key={task.name} style={rowStyle}>
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
    <View style={allStyles.outerTableContainer}>
      <Text style={allStyles.h1}>Tasks</Text>
      {!tasks || tasks.length === 0 || tableContents.length === 0 ? (
        <View style={{ paddingBottom: 16 }}>
          <Text style={allStyles.noContentText}>No tasks on record.</Text>
        </View>
      ) : (
        <View style={allStyles.tableContainer}>
          <DataTable>
            <DataTable.Header style={allStyles.headerContainer}>
              <DataTable.Title>
                <Text style={allStyles.headerTextStyle}>NAME</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style={allStyles.headerTextStyle}>END DATE</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style={allStyles.headerTextStyle}> POINTS</Text>
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

export default TasksTable;
