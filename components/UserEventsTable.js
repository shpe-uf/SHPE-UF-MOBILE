import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Table, Row, Rows, Cell } from "react-native-table-component";

import moment from "moment";

let tableHead: ["Event", "Category", "Date", "Points"];

const UserEventsTable = ({ user }) => {
  return (
    <View>
      {user === undefined || user.events.length === 0 ? (
        <div style={{ paddingBottom: 16 }}>
          <i className="far fa-frown"></i>
          <p>No events on record.</p>
        </div>
      ) : (
        <Table>
          <Row data={state.tableHead} />
          {user &&
            user.events.map(event => (
              <Table.Row key={event.name}>
                <Table.Cell>{event.name}</Table.Cell>
                <Table.Cell>{event.category}</Table.Cell>
                <Table.Cell>
                  {moment(event.createdAt)
                    .local()
                    .format("MM/DD/YYYY")}
                </Table.Cell>
                <Table.Cell textAlign="center">{event.points}</Table.Cell>
              </Table.Row>
            ))}
        </Table>
      )};
    </View>
  );
};

export default UserEventsTable;
