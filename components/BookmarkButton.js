import React, { useState, useContext } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useMutation, gql } from "@apollo/client";
import { useForm, getErrors } from "../util/hooks";
import { shouldInclude } from "@apollo/client/utilities";

function BookmarkButton(props) {

    const [bookmarkTask] = useMutation(BOOKMARK_TASK_MUTATION, {
        update(_, { data: { bookmarkTask: userData } }) {},
        onError(err) {
          getErrors(err);
        },
    });


    return (
        <View>
          <TouchableOpacity
            onPress={() => {
              bookmarkTask({
                variables: { name: props.taskName, username: props.username },
              });
            }}
            style={styles.button} 
          >
            <Icon name={"bookmark-outline"} size={30} color={"#0070C0"} style={styles.icon}/>
          </TouchableOpacity>
        </View>
      ); 
}

function UnBookmarkButton(props) {
  const [unBookmarkTask] = useMutation(UNBOOKMARK_TASK_MUTATION, {
      update(_, { data: { unBookmarkTask: userData } }) {},
      onError(err) {
        getErrors(err);
      }
  });

  return (
      <View>
        <TouchableOpacity
          onPress={() => { 
            unBookmarkTask({
              variables: { name: props.taskName, username: props.username },
            });
          }}
          style={styles.button}
        >
          <Icon name={"bookmark"} size={30} color={"#0070C0"} style={styles.icon}/>
        </TouchableOpacity>
      </View>
    ); 
}

const styles = StyleSheet.create({
    button: {
      position: "absolute",
      borderWidth: 2,
      borderColor: "#0070C0",
      borderRadius: 7,
      height: hp("6%"),
      justifyContent: "center",
      marginTop: hp("1.5%"),
      width: wp("12%"),
      left: 197,
      top: -10,
    },
    buttonText: {
      color: "#fff",
      fontSize: hp("2.5%"),
      textAlign: "center",
    },
    icon: {
      left: 7.5,
      top: 0,
    }
  });

const BOOKMARK_TASK_MUTATION = gql`
  mutation bookmarkTask($name: String!, $username: String!) {
    bookmarkTask(
      bookmarkTaskInput: { name: $name, username: $username }
    ) {
      bookmarkedTasks
    }
  }
`;


const UNBOOKMARK_TASK_MUTATION = gql`
  mutation unBookmarkTask($name: String!, $username: String!) {
    unBookmarkTask(
      unBookmarkTaskInput: { name: $name, username: $username }
    ) {
      username
    }
  }
`;


export {
  UnBookmarkButton,
  BookmarkButton,
}
