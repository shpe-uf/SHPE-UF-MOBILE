import React, {useState} from 'react';
import { StyleSheet, TouchableOpacity, Text, View, ScrollView, ImageBackground, Dimensions, FlatList} from 'react-native';
import TestButton from './TestButton';
import { useForm, getErrors } from "../util/hooks";
import { useQuery, gql } from "@apollo/client";

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
  console.log(data);

  if(data && data.getUser != user){
    console.log(data.getUser.firstName);
    setUser(data.getUser);
  }

  console.log("Outputting to console test");
  const dataList = [
    {key: 'Name: '}, {key: user.firstName + " "+  user.lastName},
    {key: 'Username:'}, {key: user.username},
    {key: 'Email:'}, {key: user.email},
    {key: 'Major:'}, {key: user.major},
    {key: 'Country:'}, {key: user.country},
    {key: 'Ethnicity:'}, {key: user.ethnicity},
    {key: 'Sex:'}, {key: user.sex},
    {key: 'Member since:'}, {key: user.createdAt},
  ]

  let flag=true
  let len = dataList.length;
  let counter=0

  let _renderItem = ({item, index}) =>{
    let {itemStyle, itemText, itemStyle2, itemText2} = styles
    counter = counter +1;
    if(counter%4==0 || (counter+1)%4==0){
      return(
        <View style={itemStyle}>
          <Text style={itemText}>{item.key} </Text>
        </View>
      )
    } else{
      return(
        <View style={itemStyle2}>
          <Text style={itemText2}>{item.key} </Text>
        </View>
      )
    }

    return(
      <View style={itemStyle}>
        <Text style={itemText}>{item.key} </Text>
      </View>
    )
  }
  const numColumns=2

    return (
      <ScrollView>
        <ImageBackground source ={require('./images/profileBackground.png')} style= {styles.container}>
          <Text style={styles.title}>MY PROFILE</Text>
        </ImageBackground>
        
         <View style={styles.container}>
           <Text style={styles.otherInfo}>
              {"\n\n\n"}PROFILE PICTURE{"\n\n\n"}
          </Text>
         </View>
        <FlatList
          data={dataList}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
       />
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
    color: 'white',
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
  },
  itemStyle:{
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100',
    flex: 1,
    marginHorizontal: 0,
    marginVertical: 1,
    paddingHorizontal:10
  },
  itemText: {
    color: '#000',
    fontSize: 23,
    paddingHorizontal:10,
    lineHeight: 60,
  },
  itemStyle2:{
    backgroundColor: '#e3e8e8',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100',
    flex: 1,
    marginHorizontal: 0,
    marginVertical: 1,
    paddingHorizontal:10
    
  },
  itemText2:{
    color: '#000',
    fontSize: 23,
    paddingHorizontal:10,
    lineHeight: 60,
  },
  otherInfo: {
    flexDirection: 'row',
    //margin: 24,
    color: '#4a4c4d',
    fontSize: 23,
    //fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: 23,
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: "#b8e5ff",
    //paddingVertical: 5,
    //marginTop: 5,
    alignItems: 'center',
  },
  testing: {
    margin: 0,
    color: 'gray',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: 40,
    backgroundColor: '#ffffff',
  },
  testing2: {
    margin: 0,
    color: 'red',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: 40,
    backgroundColor: 'gray',
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



