import React, {useState} from 'react';
import { StyleSheet, TouchableOpacity, Text, View, ScrollView, ImageBackground, Dimensions, FlatList, Image} from 'react-native';
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
              <Image source ={require('./images/SHPE_UF_LOGO.jpg')} style={styles.profilePic}/>
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
      /*
      if (this.state.loading) {
          return null;
      }
      */
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
        <FlatList
          data={dataList}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
          ListHeaderComponent={getHeader}
          ListFooterComponent={getFooter}
       />
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
      classes
      internships
      socialMedia
    }
  }
`;

export default UserProfile;



