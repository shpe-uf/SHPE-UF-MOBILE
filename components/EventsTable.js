import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DataTable } from "react-native-paper";

import { useQuery, gql } from "@apollo/client";
import { FETCH_EVENTS_QUERY } from ".././util/graphql";

function EventsTable() {
  let { data, loading } = useQuery(FETCH_EVENTS_QUERY);
  let events = null;

  if (data) {
    events = data.getEvents;
  }
  let tableContents = [];
  if (events) {
    const maxEvents = Math.min(events.length, 5);

    for (let i = 0; i < maxEvents; i++) {
      const event = events[i];
      if (event.semester == semester) {
        let row = [
          <DataTable.Row>
          <DataTable.Cell>{event.name}</DataTable.Cell>
          <DataTable.Cell>{event.category}</DataTable.Cell>
          <DataTable.Cell numeric>{event.points}</DataTable.Cell>
          </DataTable.Row>
        ];
        tableContents.push(row);
      }
    }
  }

  const monthOptions = require("./../assets/options/month.json");
  const month = new Date().getMonth();
  const semester = monthOptions[month].value;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Events</Text>
      {loading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : events && (events.length === 0 || tableContents.length === 0) ? (
        <View style={{ paddingBottom: 16 }}>
          <Text>No events on record for this semester.</Text>
        </View>
      ) : (
        <View className="table-responsive">
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Category</DataTable.Title>
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

export default EventsTable;
