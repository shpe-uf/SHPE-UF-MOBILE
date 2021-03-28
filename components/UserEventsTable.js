import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DataTable } from "react-native-paper";

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

      let row = [
        <DataTable.Row key={event.name}>
          <DataTable.Cell>{event.name}</DataTable.Cell>
          <DataTable.Cell>{event.category}</DataTable.Cell>
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
      {user === undefined || user.events.length === 0 ? (
        <View style={{ paddingBottom: 16 }}>
          <Text>No events on record.</Text>
        </View>
      ) : (
        <View className="table-responsive">
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Category</DataTable.Title>
              <DataTable.Title>Date</DataTable.Title>
              <DataTable.Title numeric>Points</DataTable.Title>
            </DataTable.Header>
            {tableContents}
          </DataTable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    alignSelf: "center",
    fontSize: 23,
    margin: 6,
  },
});

export default UserEventsTable;
