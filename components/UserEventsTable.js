import React, { Component } from "react";
import { Alert, Button, View, Text, StyleSheet } from "react-native";
import { Table, Row, Rows, Cell } from "react-native-table-component";

import moment from "moment";

function UserEventsTable({ user }) {
  if (user && user.events) {
    let tableHead = ["Event", "Category", "Date", "Points"];
    let tableContents = [];
    for (let i = 0; i < user.events.length(); i++) {
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
    <View>
      <Text>Events</Text>
      {user === undefined || user.events.length === 0 ? (
        <View style={{ paddingBottom: 16 }}>
          <Text>No events on record.</Text>
        </View>
      ) : (
        <View className="table-responsive">
          <Table>
            <Row data={tableHead} style={styles.head} />
            <Rows data={tableContents} style={styles.text} />
          </Table>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6 }
});

export default UserEventsTable;
