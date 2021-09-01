import React, { useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  Alert,
  Text,
  TextInput,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { Icon } from "native-base";
import RNPickerSelect from "react-native-picker-select";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useMutation, useQuery, gql } from "@apollo/client";

import { useForm, getErrors } from "../util/hooks";

import majorOptions from "../assets/options/major.json";
import yearOptions from "../assets/options/year.json";
import graduatingOptions from "../assets/options/graduating.json";
import countryOptions from "../assets/options/country.json";
import ethnicityOptions from "../assets/options/ethnicity.json";
import sexOptions from "../assets/options/sex.json";

function EditProfile({ navigation }) {
  const [user, setUser] = useState({});
  const [id, setId] = useState("");
  const [image, setImage] = useState(null);

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
    if (user.photo !== "") {
      setImage(user.photo);
    }
  }

  const { values } = useForm(editUser, {
    email: "",
    firstName: "",
    lastName: "",
    photo: "",
    major: "",
    year: "",
    graduating: "",
    country: "",
    ethnicity: "",
    sex: "",
    classes: "",
    internships: "",
    socialMedia: "",
  });

  const [editUser] = useMutation(EDIT_USER_PROFILE, {
    onError(err) {
      getErrors(err);
    },
    onCompleted() {
      Alert.alert("Edit Successful!");
      navigation.navigate("Profile");
    },
    variables: values,
  });

  let pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result);
      console.log({
        uri: `data:image/jpg;base64,${image.base64}`.slice(0, 100),
      });
    }
  };

  majorOptions.map((option) => {
    option["color"] = "black";
  });
  const majorChoices = majorOptions;

  yearOptions.map((option) => {
    option["color"] = "black";
  });
  const yearChoices = yearOptions;

  graduatingOptions.map((option) => {
    option["color"] = "black";
  });
  const graduatingChoices = graduatingOptions;

  countryOptions.map((option) => {
    option["color"] = "black";
  });
  const countryChoices = countryOptions;

  ethnicityOptions.map((option) => {
    option["color"] = "black";
  });
  const ethnicityChoices = ethnicityOptions;

  sexOptions.map((option) => {
    option["color"] = "black";
  });
  const sexChoices = sexOptions;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView>
        <View>
          <View style={styles.container}>
            {user && (user.photo !== "" || image !== undefined) ? (
              <Image source={{uri: user.photo}} style={styles.profilePic} />
            ) : (
              <Image
                source={require("../assets/images/pic.jpg")}
                style={styles.profilePic}
              />
            )}
            {/*<TouchableOpacity onPress={pickImage}>
              <Text style={styles.photoText}>Change profile photo</Text>
            </TouchableOpacity>*/}
          </View>
          <TextInput
            style={styles.input}
            placeholder={user.firstName}
            placeholderTextColor="#a9a9a9"
            onChangeText={(value) => (values.firstName = value)}
            spellCheck={false}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder={user.lastName}
            placeholderTextColor="#a9a9a9"
            onChangeText={(value) => (values.lastName = value)}
            spellCheck={false}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            placeholder={{
              label: "Major",
              value: user.major,
              color: "#9EA0A4",
            }}
            style={{
              inputIOS: styles.input,
              inputAndroid: styles.input,
              iconContainer: { right: wp("18%"), top: hp("1.7%") },
              placeholder: { color: "#a9a9a9" },
            }}
            onValueChange={(value) => (values.major = value)}
            items={majorChoices}
            Icon={() => {
              return (
                <Icon
                  type="FontAwesome"
                  name="sort-down"
                  style={{ color: "#9EA0A4" }}
                />
              );
            }}
          />
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            placeholder={{
              label: "Year",
              value: null,
              color: "#9EA0A4",
            }}
            style={{
              inputIOS: styles.input,
              inputAndroid: styles.input,
              iconContainer: { right: wp("18%"), top: hp("1.7%") },
              placeholder: { color: "#a9a9a9" },
            }}
            onValueChange={(value) => (values.year = value)}
            items={yearChoices}
            Icon={() => {
              return (
                <Icon
                  type="FontAwesome"
                  name="sort-down"
                  style={{ color: "#9EA0A4" }}
                />
              );
            }}
          />
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            placeholder={{
              label: "Graduating this year?",
              value: null,
              color: "#9EA0A4",
            }}
            style={{
              inputIOS: styles.input,
              inputAndroid: styles.input,
              iconContainer: { right: wp("18%"), top: hp("1.7%") },
              placeholder: { color: "#a9a9a9" },
            }}
            onValueChange={(value) => (values.graduating = value)}
            items={graduatingChoices}
            Icon={() => {
              return (
                <Icon
                  type="FontAwesome"
                  name="sort-down"
                  style={{ color: "#9EA0A4" }}
                />
              );
            }}
          />
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            placeholder={{
              label: "Country of Origin",
              value: null,
              color: "#9EA0A4",
            }}
            style={{
              inputIOS: styles.input,
              inputAndroid: styles.input,
              iconContainer: { right: wp("18%"), top: hp("1.7%") },
              placeholder: { color: "#a9a9a9" },
            }}
            onValueChange={(value) => (values.country = value)}
            items={countryChoices}
            Icon={() => {
              return (
                <Icon
                  type="FontAwesome"
                  name="sort-down"
                  style={{ color: "#9EA0A4" }}
                />
              );
            }}
          />
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            placeholder={{
              label: "Ethnicity",
              value: null,
              color: "#9EA0A4",
            }}
            style={{
              inputIOS: styles.input,
              inputAndroid: styles.input,
              iconContainer: { right: wp("18%"), top: hp("1.7%") },
              placeholder: { color: "#a9a9a9" },
            }}
            onValueChange={(value) => (values.ethnicity = value)}
            items={ethnicityChoices}
            Icon={() => {
              return (
                <Icon
                  type="FontAwesome"
                  name="sort-down"
                  style={{ color: "#9EA0A4" }}
                />
              );
            }}
          />
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            placeholder={{
              label: "Gender",
              value: null,
              color: "#9EA0A4",
            }}
            style={{
              inputIOS: styles.input,
              inputAndroid: styles.input,
              iconContainer: { right: wp("18%"), top: hp("1.7%") },
              placeholder: { color: "#a9a9a9" },
            }}
            onValueChange={(value) => (values.sex = value)}
            items={sexChoices}
            Icon={() => {
              return (
                <Icon
                  type="FontAwesome"
                  name="sort-down"
                  style={{ color: "#9EA0A4" }}
                />
              );
            }}
          />
          <TouchableOpacity
            onPress={() => {
              if (values.firstName === "") {
                values.firstName = user.firstName;
              }
              if (values.lastName === "") {
                values.lastName = user.lastName;
              }
              if (values.major === "") {
                values.major = user.major;
              }
              if (values.year === "") {
                values.year = user.year;
              }
              if (values.graduating === "") {
                values.graduating = user.graduating;
              }
              if (values.country === "") {
                values.country = user.country;
              }
              if (values.ethnicity === "") {
                values.ethnicity = user.ethnicity;
              }
              if (values.sex === "") {
                values.sex = user.sex;
              }
              values.photo = user.photo;
              values.email = user.email;
              values.classes = user.classes;
              values.internships = user.internships;
              values.socialMedia = user.socialMedia;
              editUser();
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FD652F",
    borderRadius: 6,
    justifyContent: "center",
    alignSelf: "center",
    width: wp("75%"),
    height: hp("7.2%"),
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: hp("2.5%"),
  },
  container: {
    alignItems: "center",
    marginTop: "10%",
  },
  profilePic: {
    alignItems: "center",
    borderRadius: 100,
    height: 175,
    justifyContent: "center",
    width: 175,
  },
  photoText: {
    color: "#0070C0",
    textAlign: "center",
    fontSize: hp("2.5%"),
    padding: wp("3%"),
  },
  input: {
    backgroundColor: "#f0f0f0",
    color: "black",
    borderRadius: 6,
    padding: wp("1%"),
    margin: hp("1%"),
    width: wp("75%"),
    height: hp("7.5%"),
    fontSize: hp("2.3%"),
    alignSelf: "center",
  },
});

const EDIT_USER_PROFILE = gql`
  mutation editUserProfile(
    $email: String!
    $firstName: String!
    $lastName: String!
    $photo: String!
    $major: String!
    $year: String!
    $graduating: String!
    $country: String!
    $ethnicity: String!
    $sex: String!
    $classes: [String]
    $internships: [String]
    $socialMedia: [String]
  ) {
    editUserProfile(
      editUserProfileInput: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        photo: $photo
        major: $major
        year: $year
        graduating: $graduating
        country: $country
        ethnicity: $ethnicity
        sex: $sex
        classes: $classes
        internships: $internships
        socialMedia: $socialMedia
      }
    ) {
      firstName
      lastName
      photo
      username
      email
      major
      year
      graduating
      country
      ethnicity
      sex
      createdAt
      permission
    }
  }
`;

const FETCH_USER_QUERY = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      firstName
      lastName
      photo
      username
      email
      major
      year
      graduating
      country
      ethnicity
      sex
      createdAt
      permission
    }
  }
`;

export default EditProfile;
