import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
// import { Row, Rows, Table } from "react-native-table-component";

function UserEventsTable({ user }) {
  const tableHead = ["Name", "Category", "Date", "Points"];
  let tableContents = [];
  if (user && user.events) {
    for (let i = 0; i < user.events.length; i++) {
      const event = user.events[i];
      const date = event.createdAt.substring(5, 7) + "/"
        + event.createdAt.substring(8, 10) + "/"
        + event.createdAt.substring(0, 4);

      let row = [
        event.name,
        event.category,
        date,
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


export default UserEventsTable;
