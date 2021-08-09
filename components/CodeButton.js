import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
  Modal,
} from "react-native";
import Constants from "expo-constants";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm, getErrors } from "../util/hooks";

function CodeButton() {
  const [errors, setErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  let { data, error, loading, refetch } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: "5fb2faa33945aa36700adfd0",
    },
  });
  let user = null;

  if (data) {
    user = data.getUser;
  }

  const { values } = useForm(redeemPoints, {
    code: "",
    username: user.username,
  });

  const [redeemPoints] = useMutation(REDEEM_POINTS_MUTATION, {
    update(_, { data: { redeemPoints: userData } }) {
      values.code = "";
      setErrors(false);
      setModalVisible(false);
      updateGetUser(userData);
    },

    onError(err) {
      getErrors(err);
    },

    variables: values,
  });

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.header}>Redeem Points</Text>
          <Text style={styles.label}>Enter code:</Text>
          <TextInput
            style={styles.input}
            placeholder="Code..."
            onChangeText={(value) => (values.code = value)}
            spellCheck={false}
            autoCorrect={false}
          />
          <View style={styles.buttonRow}>
            <Button
              color="#001F5B"
              onPress={() => redeemPoints()}
              title="Submit"
              accessibilityLabel="Button to submit code request"
            />
            <Button
              color="#001F5B"
              onPress={() => {
                setModalVisible(false);
              }}
              title="Cancel"
              accessibilityLabel="Button to cancel redeeming of code"
            />
          </View>
        </View>
      </Modal>
      <View>
        <Button
          color="#001F5B"
          onPress={() => {
            setModalVisible(true);
          }}
          title="Redeem Code"
          accessibilityLabel="Button to redeem code"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: "black",
    margin: 10,
    marginLeft: 0,
  },
  header: {
    alignSelf: "flex-start",
    fontSize: 30,
    margin: 6,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#FD652F",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 20,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "10%",
  },
  button: {
    borderWidth: 10,
    borderRadius: 20,
  },
  input: {
    backgroundColor: "white",
    height: 40,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#c8c8c8",
  },
});

const FETCH_USER_QUERY = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      firstName
      lastName
      points
      fallPoints
      springPoints
      summerPoints
      fallPercentile
      springPercentile
      summerPercentile
      events {
        name
        category
        createdAt
        points
      }
      tasks {
        name
        points
        startDate
      }
      bookmarkedTasks
    }
  }
`;

const REDEEM_POINTS_MUTATION = gql`
  mutation redeemPoints($code: String!, $username: String!) {
    redeemPoints(redeemPointsInput: { code: $code, username: $username }) {
      points
      fallPoints
      springPoints
      summerPoints
      message
      events {
        id
        name
        category
        createdAt
        points
      }
      tasks {
        name
        points
        createdAt
      }
    }
  }
`;

export default CodeButton;
