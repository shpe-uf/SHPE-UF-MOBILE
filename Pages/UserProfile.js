import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Image,
} from "react-native";
import { useForm, getErrors } from "../util/hooks";
import { useQuery, gql } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SmallCard from ".././components/SmallCard";
import EditProfileButton from ".././components/editProfileButton";
import LogoutButton from ".././components/LogoutButton";

function UserProfile() {
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

  let fullName = user.firstName + " " + user.lastName;

  return (
    <ScrollView>
      <View style={styles.container}>
        {/*Image only for proof of concept, NOT PULLING FROM DATABASE*/}
        <Image
          source={require("../assets/images/SHPE_UF_LOGO.jpg")}
          style={styles.profilePic}
        />
        <Text style={styles.nameStyling}>{fullName}</Text>
      </View>

      <Text style={styles.email}>{user.email}</Text>

      {props => <EditProfileButton {...props}/>}
      <View style={{ height: "3%" }}></View>

      <SmallCard label="Username" info={user.username} />
      <SmallCard label="Major" info={user.major} />
      <SmallCard label="Year" info={user.year} />
      <SmallCard label="Graduating" info={user.graduating} />
      <SmallCard label="Country of Origin" info={user.country} />
      <SmallCard label="Ethnicity" info={user.ethnicity} />
      <SmallCard label="Gender" info={user.sex} />
      <SmallCard label="Member Since" info={user.createdAt} />

      <LogoutButton />
      <View style={{ paddingVertical: "10%" }} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: "15%",
  },
  profilePic: {
    alignItems: "center",
    borderRadius: 100,
    height: 175,
    justifyContent: "center",
    width: 175,
  },
  nameStyling: {
    fontFamily: "Archivo Narrow",
    fontSize: 30,
    paddingVertical: "1%",
    textAlign: "center",
  },
  email: {
    color: "#0070C0",
    fontSize: 20,
    paddingBottom: "2%",
    textAlign: "center",
  },
});

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
    }
  }
`;

export default UserProfile;
