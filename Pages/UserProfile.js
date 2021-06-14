import React, {useState} from 'react';
import { StyleSheet, Button, TouchableOpacity, Text, View, ScrollView, ImageBackground, Dimensions, FlatList, Image} from 'react-native';
import { useForm, getErrors } from "../util/hooks";
import { useQuery, gql } from "@apollo/client";

import SmallCard from '../components/SmallCard';

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

  let _renderItem = ({item, index}) =>{
    let {itemStyle, itemText, itemStyle2, itemText2} = styles
    return(
      <View style={{paddingHorizontal:30, backgroundColor:'#f00'}}>
        
        <View style={itemStyle}>
          <Text style={itemText}>{item.key} </Text>
        </View>

        <View style={{ backgroundColor: '#fff', paddingHorizontal:30}}>
          <Text></Text>
        </View>
      
      </View>
      
    )
  }

  const getHeader = () => {
    return (
      <View style= {styles.view}>
        <View style={styles.container}>
              {/*Image only for proof of concept, NOT PULLING FROM DATABASE*/}
              <Image source ={require('../assets/images/SHPE_UF_LOGO.jpg')} style={styles.profilePic}/>
        </View>
        {/*  Add functionality to change profile picture   */}
        <View style = {{alignItems: 'flex-end', flexDirection: 'row-reverse', paddingBottom:15}}>
          <TouchableOpacity>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Edit Profile</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
};

  const getFooter = () => {
      return <View style= {styles.view}>
              <View style={styles.line} ></View>
              <View style={styles.container, {alignItems: 'flex-start'}}>
                <TouchableOpacity>
                  <Text style={styles.opacityBtn2}>
                    {"\n\n\n"}Edit Profile{"\n\n\n"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>;
  };

  
  const numColumns=2
    return (
      //   <FlatList
      //     data={dataList}
      //     renderItem={_renderItem}
      //     keyExtractor={(item, index) => index.toString()}
      //     numColumns={numColumns}
      //     ListHeaderComponent={getHeader}
      //     ListFooterComponent={getFooter}
      //  />

       <ScrollView style ={{backgroundColor: '#fff'}}>
        <View style= {styles.view}>
          <View style={styles.container}>
                {/*Image only for proof of concept, NOT PULLING FROM DATABASE*/}
                <Image source ={require('../assets/images/SHPE_UF_LOGO.jpg')} style={styles.profilePic}/>
          </View>
          {/*  Add functionality to change profile picture   */}
          <View style = {{alignItems: 'flex-end', flexDirection: 'row-reverse', paddingBottom:15}}>
            <TouchableOpacity style={{paddingHorizontal: 40}}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Edit Profile</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style= {styles.view, {paddingHorizontal: 40}}>
          <SmallCard label='Name' info={user.firstName+' '+user.lastName}/>
          <SmallCard label='Username' info={user.username}/>
          <SmallCard label='Email' info={user.email}/>
          <SmallCard label='Major' info={user.major}/>
          <SmallCard label='Year' info={user.country}/>
          <SmallCard label='Graduating' info={user.graduating}/>
          <SmallCard label='Country of Origin' info={user.country}/>
          <SmallCard label='Ethnicity' info={user.ethnicity}/>
          <SmallCard label='Sex' info={user.sex}/>
          <SmallCard label='Member Since' info={user.createdAt}/>
        </View> 

       </ScrollView>
  )
}
const styles = StyleSheet.create({
  title:{
    textAlignVertical: 'top',
    paddingVertical: 10,
    color: '#ff800a',
    textAlign: "center",
    fontSize: 25,
    marginTop: 0,
    fontWeight: "bold",
  },
  itemStyle:{
    backgroundColor: "#0f0",
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 0,
    marginVertical: 0,
    paddingHorizontal:13,
    borderRadius: 0
  },
  itemText: {
    color: '#1c1c1e',
    fontSize: 18,
    paddingHorizontal:10,
    lineHeight: 38,
    textAlign: 'right',
  },
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
  opacityBtn2: {
    flexDirection: 'row',
    color: '#0a84ff',
    fontSize: 18,
    lineHeight: 10,
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 23,
    paddingVertical: 10,
  },
  container: {
    alignItems: 'center',
    marginTop: 10,
  },
  view: {
    backgroundColor: "#fff",
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
  line:{
    width: 2000,
    height: 0.3,
    backgroundColor: '#48484a',
  },
  box:{
    alignContent: 'center',
    backgroundColor: '#0af',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius:10


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
