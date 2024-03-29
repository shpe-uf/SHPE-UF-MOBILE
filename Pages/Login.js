import React from "react";
import {
  View,
  TouchableWithoutFeedback,
  TextInput,
  Text,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  Alert,
  Button,
  NativeModules,
  DevSettings,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRef, useEffect } from "react";

import { useMutation, gql } from "@apollo/client";
import { useForm, getErrors } from "../util/hooks";

function Login({ navigation }) {
  let userToken = [];

  const { values } = useForm(loginUser, {
    username: "",
    password: "",
    remember: "false",
  });

  const [loginUser, { data }] = useMutation(LOGIN_USER, {
    onError(err) {
      getErrors(err);
    },

    onCompleted() {
      Alert.alert("Login Successful!");
      NativeModules.DevSettings.reload();
    },

    variables: values,
  });

  const inputElementRef = useRef(null);
  useEffect(() => {
    inputElementRef.current.setNativeProps({
      style: { fontFamily: "Roboto" },
    });
  }, []);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@storage_Key", jsonValue);
      if (await AsyncStorage.getItem("@storage_Key")) {
        try {
          DevSettings.reload();
        } catch (e) {
          location.reload(); // For web local host
        }
      }
    } catch (e) {}
  };

  if (data) {
    userToken = data.login.token;
    storeData(data);
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView>
          <Image
            source={require("../assets/images/SHPE_UF_LOGO_APP.png")}
            style={styles.image}
          />
          <View
            style={{ marginTop: hp("3%"), marginBottom: hp("2%"), flex: 1 }}
          >
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#a9a9a9"
              onChangeText={(value) => (values.username = value)}
              spellCheck={false}
              autoCorrect={false}
              autoCapitalize="none"
            />

            <TextInput
              ref={inputElementRef}
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#a9a9a9"
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
                  color: "#0070C0",
                  fontSize: hp("2.2%"),
                }}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.registerView}>
            <Text style={{ fontSize: hp("2.3%") }}>New to SHPE UF?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={{ fontSize: hp("2.3%"), color: "#0070C0" }}>
                {" "}
                Register here!
              </Text>
            </TouchableOpacity>
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
  image: {
    width: wp("50%"),
    height: hp("40%"),
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: hp("10%"),
  },
  registerView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: hp("3%"),
  },
  buttonContainer: {
    backgroundColor: "#001f5b",
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
