import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DataTable } from "react-native-paper";

import allStyles from ".././allStyles.js";
import { useQuery, gql } from "@apollo/client";
import { FETCH_EVENTS_QUERY } from ".././util/graphql";

function EventsTable() {
  let { data, loading } = useQuery(FETCH_EVENTS_QUERY);

  let events = null;
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
    events = data.getEvents;
    const maxEvents = Math.min(events.length, 5);
    for (let i = 0; i < events.length; i++) {
      const event = events[i];

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

      if (now < Date.parse(event.expiration)) {
        let row = [
          <DataTable.Row key={event.name} style={rowStyle}>
            <DataTable.Cell>{event.name}</DataTable.Cell>
            <DataTable.Cell>{event.category}</DataTable.Cell>
            <DataTable.Cell>{event.expiration}</DataTable.Cell>
            <DataTable.Cell numeric>{event.points}</DataTable.Cell>
          </DataTable.Row>,
        ];
        tablePage.push(row);
        if (tablePage.length >= maxEvents || i === events.length - 1) {
          tableContents.push(tablePage);
          total += tablePage.length;
          tablePage = [];
        }
      }
    }
  }

  return (
    <View style={allStyles.outerTableContainer}>
      <Text style={allStyles.h1}>Events</Text>
      {!events || events.length === 0 || tableContents.length === 0 ? (
        <View style={{ paddingBottom: 16 }}>
          <Text style={allStyles.noContentText}>No events on record.</Text>
        </View>
      ) : (
        <View style={allStyles.tableContainer}>
          <DataTable>
            <DataTable.Header style={allStyles.headerContainer}>
              <DataTable.Title>
                <Text style={allStyles.headerTextStyle}>NAME</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style={allStyles.headerTextStyle}>CATEGORY</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style={allStyles.headerTextStyle}>END DATE</Text>
              </DataTable.Title>
              <DataTable.Title>
                <Text style={allStyles.headerTextStyle}>POINTS</Text>
              </DataTable.Title>
            </DataTable.Header>
            {tableContents[page]}
            <DataTable.Pagination
              page={page}
              numberOfPages={events.length}
              onPageChange={(page) => setPage(page)}
              label={`${from + 1}-${Math.min(to, total)} of ${total}`}
            />
          </DataTable>
        </View>
      )}
    </View>
  );
}

export default EventsTable;
