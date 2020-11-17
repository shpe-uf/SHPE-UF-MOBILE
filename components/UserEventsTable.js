import React, { Component } from "react";
import { Alert, Button, View, Text, StyleSheet } from "react-native";
import { Table, Row, Rows, Cell } from "react-native-table-component";

import moment from "moment";

function UserEventsTable({ user }) {
  const tableHead = ["Event", "Category", "Date", "Points"];
  let tableContents = [];
  if (user && user.events) {
    for (let i = 0; i < user.events.length; i++) {
      const event = user.events[i];
      let row = [
        event.name,
        event.category,
        moment(event.createdAt)
          .local()
          .format("MM/DD/YYYY"),
        event.points
      ];
      tableContents.push(row);
    }
  }

  return (
    <View style={styles.table}>
      <Text>Events</Text>
      {user === undefined || user.events.length === 0 ? (
        <View style={{ paddingBottom: 16 }}>
          <Text>No events on record.</Text>
        </View>
      ) : (
        <View className="table-responsive">
          <Table>
            <Row data={tableHead} />
            <Rows data={tableContents}/>
          </Table>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  }
});


export default UserEventsTable;
