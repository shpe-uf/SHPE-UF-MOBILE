import React, {useState} from 'react';
import { StyleSheet, TouchableOpacity, Text, View, ScrollView, Image} from 'react-native';
import { useForm, getErrors } from "../util/hooks";
import { useQuery, gql } from "@apollo/client";

import SmallCard from '../components/SmallCard';
import SmallCard2 from '../components/SmallCard2';
import EditProfileButton from '../components/editProfileButton';

function UserProfile(){
  const [user, setUser] = useState({})
  const {data} = useQuery(FETCH_USER_QUERY, {
      onError(err){
          console.log(err);
      },
      variables: {
          userId: "5f90e4d4920bab09f6df0106"
      }
  });

  if(data && data.getUser != user){
    console.log(data.getUser.firstName);
    setUser(data.getUser);
  }

  const dataList = [
    {key: 'Name '}, {key: user.firstName + " "+  user.lastName},
    {key: 'Username'}, {key: user.username},
    {key: 'Email'}, {key: user.email},
    {key: 'Major'}, {key: user.major},
    {key: 'Country'}, {key: user.country},
    {key: 'Ethnicity'}, {key: user.ethnicity},
    {key: 'Sex'}, {key: user.sex},
    {key: 'Member since'}, {key: user.createdAt},
  ]
  
    return (
    <ScrollView style ={{backgroundColor: '#fff'}}>
      <View style={styles.container}>
        {/*Image only for proof of concept, NOT PULLING FROM DATABASE*/}
        <Image source ={require('../assets/images/SHPE_UF_LOGO.jpg')} style={styles.profilePic}/>
        <Text style={styles.nameStyling}>Daniel Camejo</Text>
      </View>

      <Text style={styles.email}>{user.email}dcamejo1@ufl.edu</Text>
    
      <EditProfileButton/>
      <View style={{height:'3%'}}></View>

      <SmallCard2 label='Username' info={user.username}/>
      <SmallCard2 label='Major' info={user.major}/>
      <SmallCard2 label='Year' info={user.year}/>
      <SmallCard2 label='Graduating' info={user.graduating}/>
      <SmallCard2 label='Country of Origin' info={user.country}/>
      <SmallCard2 label='Ethnicity' info={user.ethnicity}/>
      <SmallCard2 label='Sex' info={user.sex}/>
      <SmallCard2 label='Member Since' info={user.createdAt}/>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  btn: {
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#FD652F',
    alignItems: 'center',
    width: 119,
    height: 50,
  },
  btnText: {
    fontSize: 20,
    color: '#fff'
  },
  container: {
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#fff',
  },
  profilePic:{
    width: 175,
    height: 175,
    borderRadius:75,
    backgroundColor: '#4e5252',
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameStyling:{
    textAlign: 'center',
    backgroundColor: '#fff',
    fontSize: 28,
    fontFamily: 'Archivo Narrow',
    paddingVertical: '1%',

  },
  email:{
    textAlign:'center',
    fontSize: 19,
    paddingBottom:'2%',
    color:'#0070C0'
  }
})

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
      classes
      internships
      socialMedia
    }
  }
`;

export default UserProfile;
