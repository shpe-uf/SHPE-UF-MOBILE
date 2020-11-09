//import * as React from "react";
import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Alert, Modal, TouchableHighlight } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Constants from "expo-constants";

function CodeButton() {
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
          Alert.alert("Modal has been closed.");
        }}
      >
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
        />

        <View style={styles.button}>
          <Button
            style={styles.buttonInner}
            color
            title="Submit"
            onPress={handleSubmit(onSubmit)}
          />
        </View>

        <View style={styles.button}>
          <Button
            style={styles.buttonInner}
            color
            title="Cancel"
            onPress={() => {
              setModalVisible(!modalVisible);
              reset({
                code: "",
              });
            }}
          />
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
    color: "white",
    margin: 20,
    marginLeft: 0,
  },
  modalView: {
  margin: 20,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 35,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5
  },
  button: {
    marginTop: 40,
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
  },
  textStyle: {
    padding: 8,
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});

export default CodeButton;
