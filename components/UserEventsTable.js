import { Tab } from "native-base";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DataTable } from "react-native-paper";

import Table from "./Table";

function UserEventsTable({ user }) {
  let tableContents = [];
  if (user && user.events) {
    for (let i = 0; i < user.events.length; i++) {
      const event = user.events[i];
      const createdAt = new Date(event.createdAt);
      const date =
        createdAt.getMonth() +
        "/" +
        createdAt.getDate() +
        "/" +
        createdAt.getFullYear();

        let rowStyle = styles.tableRow1;
        let iAsString = i.toString();
        const iLen = iAsString.length
        if (iAsString[iLen-1] == "1" || iAsString[iLen-1] == "3" ||
         iAsString[iLen-1] == "6" || iAsString[iLen-1] == "8" ){
            rowStyle = styles.tableRow2
        }

      let row = [
        <DataTable.Row key={event.name} style = {rowStyle}>
          <DataTable.Cell>{event.name}</DataTable.Cell>
          <DataTable.Cell>{date}</DataTable.Cell>
          <DataTable.Cell numeric>{event.points}</DataTable.Cell>
        </DataTable.Row>,
      ];
      tableContents.push(row);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Events</Text>
      {user === null || user.events.length === 0 ? (
        <View style={{ paddingBottom: 16 }}>
          <Text style={styles.noContentText}>No events on record.</Text>
        </View>
      ) : (
        <View className="table-responsive" style = {styles.tableContainer}>
          <DataTable>
            <DataTable.Header style = {styles.headerContainer}>
              <DataTable.Title>
                <Text style = {styles.headerTextStyle}>EVENT</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style = {styles.headerTextStyle}>DATE</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style = {styles.headerTextStyle}>      POINTS</Text>
              </DataTable.Title>
            </DataTable.Header>
            {tableContents}
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

export default UserEventsTable;

