import React from "react";
import {
  TouchableWithoutFeedback,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  Button,
  Alert,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

import { useMutation, gql } from "@apollo/client";
import { useForm, getErrors } from "../util/hooks";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import allStyles from ".././allStyles.js";

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
      <View>
        <Text style={styles.title}>RESET PASSWORD</Text>
      </View>
      <View onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView>
          <TextInput
            style={allStyles.input}
            placeholder="Email"
            onChangeText={(text) => (values.email = text)}
            spellCheck={false}
            autoCorrect={false}
          />
          <TouchableOpacity
            onPress={() => resetPassword()}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
        <View style={styles.registerView}>
          <Text style={{ fontSize: hp("2.3%") }}>New to SHPE UF?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ fontSize: hp("2.3%"), color: "rgb(0,122,255)" }}>
              {" "}
              Register here!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    color: "#001F5B",
    fontSize: 28,
    paddingVertical: "8%",
    marginTop: "50%",
  },
  registerView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: hp("5%"),
  },
  buttonContainer: {
    backgroundColor: "#FD652F",
    borderRadius: 6,
    justifyContent: "center",
    alignSelf: "center",
    margin: hp("1%"),
    width: wp("75%"),
    height: hp("8.5%"),
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: hp("2.5%"),
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
