import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, ScrollView, ImageBackground} from 'react-native';
import TestButton from './TestButton';
import { useForm, getErrors } from "../util/hooks";
import { useQuery, gql } from "@apollo/client";


function UserProfile(){    //will need to pass parameters later with member object
  const {data} = useQuery(FETCH_USERS_QUERY, {
      variables: {
          userId: "5f90e4d4920bab09f6df0106"
      }
  });
  console.log(data);
    return (
      <ScrollView>
        <ImageBackground source ={require('./images/profileBackground.png')} style= {styles.otherContainer}>
            <Text style={styles.title}>MY PROFILE</Text>
            <View style={styles.container}>
                <Text style={styles.otherInfo}>     
                    {"\n"}   
                    INSERT PROFILE PICTURE HERE{"\n\n\n"}
                    Username: {/*user.username  */ "\n" }
                    Email: {/*user.email  */ "\n" }
                    Major: {/*user.major */ "\n" }
                    Country: {/*user.country  */ "\n"}
                    Ethnicity: {/*user.ethnicity  */ "\n" }
                    Sex: {/*user.sex  */ "\n" }
                    Member since: {/*user.createdAt  */ "\n" }
                </Text>
            </View>
        </ImageBackground>
        <TestButton text='Edit Profile' />
      </ScrollView>
  )
}
const styles = StyleSheet.create({
  title:{
    textAlignVertical: 'top',
    paddingVertical: 30,
    borderColor: "#20232a",
    borderRadius: 6,
    color: "white",
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
    hashTag: {
      fontStyle: 'italic',
    },
  },
  otherInfo: {
    margin: 24,
    color: '#4a4c4d',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: 40,
  },
  container: {
    backgroundColor: "#b8e5ff",
    paddingVertical: 5,
    marginTop: 5,
    
  },
  otherContainer: {

  }
})

/*
container: {
    flex: 1,
    justifyContent: 'top',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ffffff',
    padding: 8,
  }



*/




const FETCH_USERS_QUERY = gql`
  {
    getUsers {
      firstName
      lastName
      photo
      major
      year
      graduating
      country
      ethnicity
      sex
      username
      email
      createdAt
      points
      fallPoints
      springPoints
      summerPoints
      permission
      listServ
      classes
      internships
      socialMedia
      id
      confirmed
      events {
        name
        category
        createdAt
        points
      }
      classes
    }
  }
`;

export default UserProfile;
