import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

import Points from "./Pages/Points";

export default function App() {


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Points/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
