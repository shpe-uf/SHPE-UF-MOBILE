import  React, {useState} from 'react';
import { TouchableWithoutFeedback, TextInput, StyleSheet, SafeAreaView, Keyboard, Button, Alert, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useMutation, useQuery, gql } from "@apollo/client";
import { useForm, getErrors } from "../util/hooks";

function ViewTasks() {



      let { data, error } = useQuery(FETCH_USER_QUERY, {
        variables: {
          userId: "5f90e4d4920bab09f6df0106", // dummy user for now
        },
      });
      console.log("This is an error", error)
      console.log(data)
      if(data){
        console.log("I am logging data ", data)
        let user = data.getUser;
        console.log(user);
      }
      const titleText = useState("Name of Task")
      const bodyText = useState("Task's Points")


    return (
        <SafeAreaView style ={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAwareScrollView>
                    <Text style={styles.baseText}>
                    <Text style={styles.titleText}>
                    {titleText}
                    {"\n"}
                    {"\n"}
                    </Text>
                    <Text numberOfLines={5}>{bodyText}</Text>
                    </Text>
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#42A5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        backgroundColor: 'white',
        color: "black",
        borderRadius: 14,
        padding: 8,
        margin: 10,
        width: 350,
        height: 55,
        fontSize: 18,
    },
    wording: {
        fontSize: 20,
        color: 'black',
    },
});

const FETCH_USER_QUERY = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      firstName
      lastName
      points
      fallPoints
      springPoints
      summerPoints
      fallPercentile
      springPercentile
      summerPercentile
      events {
        name
        category
        createdAt
        points
      }
      tasks {
        name
        points
        startDate
      }
      bookmarkedTasks
    }
  }
`;

export default ViewTasks;
