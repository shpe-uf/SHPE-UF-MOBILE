import React, { Component } from "react";
import { Alert, Button, View, Text, StyleSheet } from "react-native";
import { Table, Row, Rows, Cell } from "react-native-table-component";

import moment from "moment";

function UserEventsTable({ user }) {
  const tableHead = ["Name", "Category", "Date", "Points"];
  let tableContents = [];
  if (user && user.events) {
    for (let i = 0; i < user.events.length; i++) {
      const event = user.events[i];
      let row = [
        event.name,
        event.category,
        moment(event.createdAt)
          .local()
          .format("MM/DD/YY"),
        event.points
      ];
      tableContents.push(row);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Events</Text>
      {user === undefined || user.events.length === 0 ? (
        <View style={{ paddingBottom: 16 }}>
          <Text>No events on record.</Text>
        </View>
      ) : (
        <View className="table-responsive">
          <Table borderStyle={styles.table}>
            <Row data={tableHead} textStyle={styles.header}/>
            <Rows data={tableContents} style={styles.table} textStyle={styles.text}/>
          </Table>
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
    margin: 6,
    fontSize: 23
  },
  header: {
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: "3%"
  },
  table: {
    width: "100%",
    backgroundColor: "powderblue",
    marginBottom: "2%",
    padding: "1.5%"
  },
  text: {
    textAlign: "center"
  }
});


export default UserEventsTable;
