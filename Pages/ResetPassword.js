import React from "react";
import {
  TouchableWithoutFeedback,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  Button,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

import { useMutation, gql } from "@apollo/client";
import { useForm, getErrors } from "../util/hooks";

function ResetPassword({ navigation }) {
  const { values } = useForm(resetPassword, {
    email: "",
  });

  const [resetPassword] = useMutation(FORGOT_PASSWORD, {
    onError(err) {
      getErrors(err);
    },

    onCompleted() {
      Alert.alert("Check your email!");
      navigation.navigate("Login");
    },

    variables: values,
  });

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => (values.email = text)}
            spellCheck={false}
            autoCorrect={false}
          />
          <Button title="Reset Password" onPress={() => resetPassword()} />
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#42A5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    backgroundColor: "white",
    color: "black",
    borderRadius: 14,
    padding: 8,
    margin: 10,
    width: 350,
    height: 55,
    fontSize: 18,
  },
});

const FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default ResetPassword;
