import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Image,
  RefreshControl,
} from "react-native";
import * as Font from "expo-font";
import { useFonts } from "@use-expo/font";
import { useQuery, gql } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SmallCard from ".././components/SmallCard";
import LogoutButton from ".././components/LogoutButton";

function UserProfile({ navigation }) {
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
  const { data, refetch } = useQuery(FETCH_USER_QUERY, {
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
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  const [fontLoaded, setFontLoaded] = useState(false);
  const loadFont = async () => {
    await Font.loadAsync({
      nameFont: require("../assets/fonts/OpenSans-ExtraBold.ttf"),
    });
    setFontLoaded(true);
  };
  loadFont();
  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        {user && user.photo !== "" ? (
          <Image source={{uri: user.photo}} style={styles.profilePic} />
        ) : (
          <Image
            source={require("../assets/images/pic.jpg")}
            style={styles.profilePic}
          />
        )}
        {fontLoaded ? (
          <Text style={styles.nameStylingCustom}>{fullName}</Text>
        ) : (
          <Text style={styles.nameStyling}>{fullName}</Text>
        )}
      </View>

      <Text style={styles.email}>{user.email}</Text>

      <View style={styles.viewStyle}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Edit Profile")}
          style={styles.btnStyle}
        >
          <Text style={styles.textStyle}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

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
  nameStylingCustom: {
    fontFamily: "nameFont",
    fontSize: 30,
    textAlign: "center",
    color: "#001F5B",
  },
  nameStyling: {
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
  viewStyle: {
    alignItems: "center",
    height: "5%",
    justifyContent: "center",
  },
  btnStyle: {
    backgroundColor: "#FD652F",
    borderRadius: 10,
    height: "80%",
    justifyContent: "center",
    width: "35%",
  },
  textStyle: {
    color: "#FFF",
    fontSize: 20,
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
