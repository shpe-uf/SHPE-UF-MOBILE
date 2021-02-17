import React from "react";
import {
  View,
  TouchableWithoutFeedback,
  TextInput,
  Text,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  Button,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { useMutation, gql } from "@apollo/client";
import { useForm, getErrors } from "../util/hooks";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

function Login({ navigation }) {
  const { values } = useForm(loginUser, {
    username: "",
    password: "",
    remember: "false",
  });

  const [loginUser] = useMutation(LOGIN_USER, {
    onError(err) {
      getErrors(err);
    },

    onCompleted() {
      Alert.alert("Login Successful!");
    },

    variables: values,
  });

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView>
          <Image
            source={require("../assets/images/SHPE_UF_LOGO_APP.png")}
            style={styles.image}
          />
          <View style={{ marginTop: hp("3%"),
                marginBottom: hp("2%") }}
          >
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={(value) => (values.username = value)}
              spellCheck={false}
              autoCorrect={false}
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={(value) => (values.password = value)}
              spellCheck={false}
              autoCorrect={false}
              secureTextEntry={true}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => loginUser()}
              style={styles.buttonContainer}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("ResetPassword")}
              style={{ marginRight: wp("1.8%") }}
            >
              <Text
                style={{
                  alignSelf: "flex-end",
                  color: "rgb(0,122,255)",
                  fontSize: hp("2.2%"),
                }}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.registerView}>
            <Text style={{ fontSize: hp("2.5%") }}>New to SHPE UF?</Text>
            <Button
              title="Register here"
              onPress={() => navigation.navigate("Register")}
            />
          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#f0f0f0",
    color: "black",
    borderRadius: 6,
    padding: wp("5%"),
    margin: hp("1%"),
    width: wp("75%"),
    height: hp("8.5%"),
    fontSize: hp("2.5%"),
    alignSelf: "center",
  },
  wording: {
    fontSize: hp("2.5%"),
    color: "black",
  },
  image: {
    width: wp("50%"),
    height: hp("40%"),
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: hp("3%"),
  },
  registerView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonContainer: {
    backgroundColor: "#001f5b",
    borderRadius: 6,
    paddingVertical: hp("3.1%"),
    marginHorizontal: wp("1.8%"),
    margin: hp("1%"),
  },
  buttonText: {
    color: "#fff",
    alignSelf: "center",
    fontSize: hp("2.5%"),
  },
});

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!, $remember: String!) {
    login(username: $username, password: $password, remember: $remember) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
export default Login;
