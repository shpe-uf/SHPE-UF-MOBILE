import  React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useForm } from "../util/hooks";

function LoginScreen() {
    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: "",
        password: "",
        remember: "false"
      });
      function loginUserCallback() {
        loginUser();
      }
      const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        onError(err) {
          setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
      });

    return (
        <View style={styles.container}>
            <Text style={styles.wording}>Enter Username:</Text>            
            <TextInput 
                style={styles.input}
                placeholder='USERNAME'
                onChangeText={(value) => values.username = value}
                spellCheck= {false}
                autoCorrect={false}
                autoCapitalize='none'
            />
            <Text style={styles.wording}>Enter Password:</Text>
            <TextInput
                style={styles.input}
                placeholder='PASSWORD'
                onChangeText={(value) => values.password =value}
                spellCheck= {false}
                autoCorrect={false}
                autoCapitalize='none'
            />
            <Button 
                color='black'
                title="Login"
                onPress={loginUserCallback}
            /> 
        </View>
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
const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        id
        email
        username
        createdAt
        token
      }
    }
    `;
export default LoginScreen;