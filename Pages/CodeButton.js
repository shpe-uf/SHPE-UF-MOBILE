import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Modal,
  TouchableHighlight,
} from "react-native";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useForm, Controller } from "react-hook-form";
import Constants from "expo-constants";

function CodeButton() {
  //const [errors, setErrors] = useState({});

  let {data, refetch} = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: "5f90e4d4920bab09f6df0106",
    }
  });
  if(data){
    let user = data.getUser;
    console.log(user);
  }

  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    errors,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setModalVisible(!modalVisible);
    /*in here, we have the code. What we need is to use the use the Mutation
    and put data as the code*/
  };

  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  console.log(errors);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.header}>Redeem Points</Text>
          <Text style={styles.label}>Enter code:</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="code"
            rules={{ required: true }}
            defaultValue = ""
          />
          {errors.firstName && <Text>No code was provided.</Text>}

          <TouchableHighlight
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.textStyle}>Submit</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              setModalVisible(!modalVisible);
              reset({
                code: "",
              });
            }}
          >
            <Text style={styles.textStyle}>Cancel</Text>
          </TouchableHighlight>
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Redeem Code</Text>
      </TouchableHighlight>
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
    //alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    color: "white",
    height: 40,
    backgroundColor: "#42A5F5",
    borderRadius: 20,
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
    borderColor: "#c8c8c8"
  },
  textStyle: {
    padding: 8,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
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
