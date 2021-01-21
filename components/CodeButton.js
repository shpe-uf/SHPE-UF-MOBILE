import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Modal,
} from "react-native";
import { useMutation, gql } from "@apollo/client";
import { useForm, getErrors } from "../util/hooks";
import Constants from "expo-constants";

function CodeButton(props) {
  const [errors, setErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  let user = props.user;

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
    <View style={styles.container}>
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
          <View style={styles.button}>
            <Button
              onPress={() => redeemPoints()}
              title="Submit"
              accessibilityLabel="Button to submit code request"
            />
          </View>
          <View style={styles.button}>
            <Button
              onPress={() => {
                setModalVisible(false);
              }}
              title="Cancel"
              accessibilityLabel="Button to cancel redeeming of code"
            />
          </View>
        </View>
      </Modal>
      <View style={styles.button}>
        <Button
          onPress={() => {
            setModalVisible(true);
          }}
          title="Redeem code"
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
    color: "#ff5400",
    fontSize: 30,
    fontWeight: "bold",
    fontStyle: "italic",
    margin: 10,
    marginLeft: 0,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
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
  button: {
    marginTop: "9%",
    backgroundColor: "#42A5F5",
    borderRadius: 50,
    marginLeft: "15%",
    width: "70%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: "#004D73",
  },
  input: {
    backgroundColor: "white",
    height: 40,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#c8c8c8",
  },
  textStyle: {
    padding: 8,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

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
