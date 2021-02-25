import React from "react";
import { useMutation, gql } from "@apollo/client";
import { useForm, getErrors } from "../util/hooks";
import {
  View,
  TouchableWithoutFeedback,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  Button,
  Alert,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import RNPickerSelect from "react-native-picker-select";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import majorOptions from "../assets/options/major.json";
import yearOptions from "../assets/options/year.json";
import graduatingOptions from "../assets/options/graduating.json";
import countryOptions from "../assets/options/country.json";
import ethnicityOptions from "../assets/options/ethnicity.json";
import sexOptions from "../assets/options/sex.json";
import { useState } from "react";

function Register({ navigation }) {
  const { values } = useForm(addUser, {
    firstName: "",
    lastName: "",
    major: "",
    ethnicity: "",
    graduating: "",
    country: "",
    year: "",
    sex: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    listServ: "false",
  });

  const [addUser] = useMutation(REGISTER_USER, {
    onError(err) {
      getErrors(err);
    },

    onCompleted() {
      Alert.alert("Registration Successful!");
      navigation.navigate("Login");
    },

    variables: values,
  });

  const [display, setDisplay] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView>
          <Image
            source={require("../assets/images/SHPE_UF_LOGO_APP.png")}
            style={styles.image}
          />
          {display == false && (
            <View style={styles.firstView}>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                onChangeText={(text) => {
                  values.firstName = text;
                }}
                spellCheck={false}
                autoCorrect={false}
              />
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                onChangeText={(text) => {
                  values.lastName = text;
                }}
                spellCheck={false}
                autoCorrect={false}
              />
              <RNPickerSelect
                placeholder={{
                  label: "Major",
                  value: null,
                  color: "#9EA0A4",
                }}
                style={{ inputIOS: styles.input }}
                onValueChange={(value) => (values.major = value)}
                items={majorOptions}
              />
              <RNPickerSelect
                placeholder={{
                  label: "Year",
                  value: null,
                  color: "#9EA0A4",
                }}
                style={{ inputIOS: styles.input }}
                onValueChange={(value) => (values.year = value)}
                items={yearOptions}
              />
              <RNPickerSelect
                placeholder={{
                  label: "Graduating this year?",
                  value: null,
                  color: "#9EA0A4",
                }}
                style={{ inputIOS: styles.input }}
                onValueChange={(value) => (values.graduating = value)}
                items={graduatingOptions}
              />
              <RNPickerSelect
                placeholder={{
                  label: "Country of Origin",
                  value: null,
                  color: "#9EA0A4",
                }}
                style={{ inputIOS: styles.input }}
                onValueChange={(value) => (values.country = value)}
                items={countryOptions}
              />
              <RNPickerSelect
                placeholder={{
                  label: "Ethnicity",
                  value: null,
                  color: "#9EA0A4",
                }}
                style={{ inputIOS: styles.input }}
                onValueChange={(value) => (values.ethnicity = value)}
                items={ethnicityOptions}
              />
              <RNPickerSelect
                placeholder={{
                  label: "Sex",
                  value: null,
                  color: "#9EA0A4",
                }}
                style={{ inputIOS: styles.input }}
                onValueChange={(value) => (values.sex = value)}
                items={sexOptions}
              />
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => setDisplay(true)}
              >
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          )}
          {display == true && (
            <View style={styles.secondView}>
              <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={(text) => {
                  values.username = text;
                }}
                spellCheck={false}
                autoCorrect={false}
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="UF/SF Email"
                onChangeText={(text) => {
                  values.email = text;
                }}
                spellCheck={false}
                autoCorrect={false}
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={(text) => {
                  values.password = text;
                }}
                spellCheck={false}
                autoCorrect={false}
                secureTextEntry={true}
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                onChangeText={(text) => {
                  values.confirmPassword = text;
                }}
                spellCheck={false}
                autoCorrect={false}
                secureTextEntry={true}
                autoCapitalize="none"
              />
              <Text
                style={{
                  marginHorizontal: wp("12.5%"),
                  color: "red",
                  marginBottom: hp("4%"),
                }}
              >
                Password must be at least 8 characters long. It must contain at
                least one lowercase letter, one uppercase letter, one number,
                and one special character!
              </Text>
              <View>
                <TouchableOpacity
                  onPress={() => addUser()}
                  style={styles.submitContainer}
                >
                  <Text style={styles.submitText}>Register</Text>
                </TouchableOpacity>
                <View style={styles.loginView}>
                  <Text style={{ fontSize: hp("2.3%") }}>
                    Already Registered?
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text
                      style={{ fontSize: hp("2.3%"), color: "rgb(0,122,255)" }}
                    >
                      {" "}
                      Login
                    </Text>
                  </TouchableOpacity>
                </View>
                <Button title="Back" onPress={() => setDisplay(false)} />
              </View>
              <View style={{ flex: 1 }} />
            </View>
          )}
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexShrink: 0,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#f0f0f0",
    color: "black",
    borderRadius: 6,
    padding: wp("4%"),
    margin: hp("1%"),
    width: wp("75%"),
    height: hp("7.2%"),
    fontSize: hp("2.3%"),
    alignSelf: "center",
  },
  image: {
    width: wp("17.5%"),
    height: hp("7%"),
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: hp("1%"),
  },
  buttonContainer: {
    backgroundColor: "#001f5b",
    borderRadius: 6,
    justifyContent: "center",
    alignSelf: "center",
    margin: hp("1%"),
    width: wp("75%"),
    height: hp("7.2%"),
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: hp("2.5%"),
  },
  submitContainer: {
    backgroundColor: "#FD652F",
    borderRadius: 6,
    justifyContent: "center",
    alignSelf: "center",
    margin: hp("1%"),
    width: wp("75%"),
    height: hp("7.2%"),
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
    fontSize: hp("2.5%"),
  },
  secondView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("10%"),
  },
  loginView: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: hp("1%"),
  },
});

const pickerStyles = StyleSheet.create({
  inputIOS: {
    // width: 350,
    // height: 55,
    // backgroundColor: "white",
    // margin: 10,
    // padding: 8,
    // color: "black",
    // borderRadius: 14,
    // fontSize: 18,
    // fontWeight: "500",
  },
  inputAndroid: {
    color: "white",
  },
});

const REGISTER_USER = gql`
  mutation register(
    $firstName: String!
    $lastName: String!
    $major: String!
    $year: String!
    $graduating: String!
    $country: String!
    $ethnicity: String!
    $sex: String!
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $listServ: String!
  ) {
    register(
      registerInput: {
        firstName: $firstName
        lastName: $lastName
        major: $major
        year: $year
        graduating: $graduating
        country: $country
        ethnicity: $ethnicity
        sex: $sex
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        listServ: $listServ
      }
    ) {
      id
      email
      username
      createdAt
    }
  }
`;

export default Register;
