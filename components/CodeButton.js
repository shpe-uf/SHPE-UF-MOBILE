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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm, getErrors } from "../util/hooks";

function CodeButton() {
  const [errors, setErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState({});
  const [id, setId] = useState("");
  const readData = async () => {
    try {
      const storedId = await AsyncStorage.getItem("@storage_Key");
      if (storedId !== null) {
        setId(JSON.parse(storedId).login.id);
      }
    } catch (e) {
      return [];
    }
  };
  readData();
  const { data } = useQuery(FETCH_USER_QUERY, {
    onError(err) {
      console.log(err);
    },
    variables: {
      userId: id,
    },
  });

  if (data && data.getUser != user) {
    setUser(data.getUser);
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
            <View>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => redeemPoints()}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.buttonCircle}
        >
          <Text style={styles.buttonTextCircle}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: "black",
    margin: 10,
    marginLeft: 0,
    fontSize: 16,
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
    borderColor: "#626366",
    borderWidth: 1,
    borderRadius: 20,
    padding: 30,
    shadowColor: "#626366",
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
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#001F5B",
    borderColor: "#001F5B",
    borderRadius: 6,
    height: hp("6%"),
    justifyContent: "center",
    marginTop: hp("5%"),
    marginHorizontal: hp("8.5%"),
    width: wp("20%"),
  },
  buttonCircle: {
    alignSelf: "center",
    backgroundColor: "#001F5B",
    borderColor: "#001F5B",
    borderRadius: 100,
    height: hp("10%"),
    justifyContent: "center",
    width: wp("20%"),
  },
  buttonText: {
    color: "#fff",
    fontSize: hp("2.5%"),
    textAlign: "center",
  },
  buttonTextCircle: {
    color: "#fff",
    fontSize: hp("10%"),
    textAlign: "center",
    paddingBottom: "10%",
  },
  input: {
    backgroundColor: "white",
    height: 40,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#CCC",
    fontSize: 16,
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
