import React, {useState} from 'react';
import { Alert, StyleSheet, TouchableOpacity, Text, View, ScrollView, ImageBackground, Dimensions, FlatList, Image, NativeModules} from 'react-native';
import { useForm, getErrors } from "../util/hooks";
import { useQuery, gql } from "@apollo/client";
import localStorage from 'react-native-sync-localstorage';
import jwt_decode from "jwt-decode";

import EditProfile from "./EditProfile";

function UserProfile({navigation, token}){

  const [user, setUser] = useState({})
  const {data, refetch} = useQuery(FETCH_USER_QUERY, {
      onError(err){
          console.log(err);
      },
      variables: {
          userId: token.id
      }
  });

  navigation.addListener('focus', () => {
      refetch();
  });

  if(data && data.getUser != user){
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
      <View style={itemStyle}>
        <Text style={itemText}>{item.key} </Text>
      </View>
    )
  }

  const getHeader = () => {
    return <View style= {styles.view}>
            <View>
            <Text style={styles.title}> My<Text style={{color: '#3571f2',}}> Profile </Text></Text>
        </View>
        <View style={styles.line} ></View>

        <View style={styles.container}>
              {/*Image only for proof of concept, NOT PULLING FROM DATABASE*/}
              <Image source ={require('../assets/images/SHPE_UF_LOGO.jpg')} style={styles.profilePic}/>
        </View>
        {/*  Add functionality to change profile picture   */}
        <View style={styles.container}>
          <TouchableOpacity>
            <Text style={styles.opacityBtn}>
                {"\n\n\n"}Change Profile Photo{"\n\n\n"}
            </Text>
          </TouchableOpacity>   
        </View>
        <View style={styles.line} ></View> 
        </View>;
};

  const getFooter = () => {
      return <View style= {styles.view}>
              <View style={styles.line} ></View>
              <View style={styles.container, {alignItems: 'flex-start'}}>
                <TouchableOpacity>
                  <Text style={styles.opacityBtn2} onPress={() => navigation.navigate('EditProfile')}>
                    {"\n\n\n"}Edit Profile{"\n\n\n"}
                    <Text onPress={() =>{
                        localStorage.removeItem('jwtToken');
                        NativeModules.DevSettings.reload();
                      }}>
                          {"\n\n\n"}Log Out{"\n\n\n"}
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>;
  };
  
  const numColumns = 2;
    return (    
      <>  
        <FlatList
          data={dataList}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
          ListHeaderComponent={getHeader}
          ListFooterComponent={getFooter}
       />
      </>
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
    backgroundColor: "#1c1c1e",
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 0,
    marginVertical: 0,
    paddingHorizontal:13,
  },
  itemText: {
    color: '#f2f2f7',
    fontSize: 18,
    paddingHorizontal:10,
    lineHeight: 38,
    textAlign: 'right',
  },
  opacityBtn: {
    flexDirection: 'row',
    color: '#0a84ff',
    fontSize: 16,
    lineHeight: 7,
    justifyContent: 'space-between',
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
    backgroundColor: "#1c1c1e",
    alignItems: 'center',
    marginTop: 10,
  },
  view: {
    backgroundColor: "#1c1c1e",
  },
  profilePic:{
    width: 150,
    height: 150,
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
    }
  }
`;

export default UserProfile;