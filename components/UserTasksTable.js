import { Tab } from "native-base";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DataTable } from "react-native-paper";

import allStyles from ".././allStyles.js";

function UserTasksTable({ user }) {
  let tableContents = [];
  if (user && user.tasks) {
    for (let i = 0; i < user.tasks.length; i++) {
      const task = user.tasks[i];
      const endDate = new Date(task.endDate);
      const date =
        endDate.getMonth() +
        "/" +
        endDate.getDate() +
        "/" +
        endDate.getFullYear();

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

      let row = [
        <DataTable.Row key={task.name} style={rowStyle}>
          <DataTable.Cell>{task.name}</DataTable.Cell>
          <DataTable.Cell>{task.startDate}</DataTable.Cell>
          <DataTable.Cell numeric>{task.points}</DataTable.Cell>
        </DataTable.Row>,
      ];
      tableContents.push(row);
    }
  }

  return (
    <View style={allStyles.outerTableContainer}>
      <Text style={allStyles.h1}>Tasks</Text>
      {user === null || user.tasks.length === 0 ? (
        <View style={{ paddingBottom: 16 }}>
          <Text style={allStyles.noContentText}>No events on record.</Text>
        </View>
      ) : (
        <View className="table-responsive" style={allStyles.tableContainer}>
          <DataTable>
            <DataTable.Header style={allStyles.headerContainer}>
              <DataTable.Title>
                <Text style={allStyles.headerTextStyle}>TASK</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style={allStyles.headerTextStyle}>DATE</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style={allStyles.headerTextStyle}> POINTS</Text>
              </DataTable.Title>
            </DataTable.Header>
            {tableContents}
          </DataTable>
        </View>
      )}
    </View>
  );
}

export default UserTasksTable;
