import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
// import { Row, Rows, Table } from "react-native-table-component";
import { useQuery, gql } from "@apollo/client";
import { FETCH_EVENTS_QUERY } from ".././util/graphql";

function EventsTable() {
  let { data, loading } = useQuery(FETCH_EVENTS_QUERY);
  let events = null;

  if (data) {
    events = data.getTasks;
  }
  if (events) {
    const maxEvents = Math.min(events.length, 5);

    const tableHead = ["Name", "End Date", "Points"];
    let tableContents = [];
    if (events) {
      for (let i = 0; i < maxEvents; i++) {
        const event = events[i];

        const row = [event.name, event.endDate, event.points];
        tableContents.push(row);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Events</Text>
      {loading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : events && events.length === 0 ? (
        <View style={{ paddingBottom: 16 }}>
          <Text>No events on record.</Text>
        </View>
      ) : (
        <View className="table-responsive">
          <Text>Insert events table here.</Text>
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

export default EventsTable;
