import  React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { useMutation, gql } from "@apollo/client";
import { useForm, getErrors } from "../util/hooks";

function Login() {
    const { onChange, onSubmit, values } = useForm(loginUser, {
        username: "",
        password: "",
        remember: "false"
      });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
      onError(err) {
        getErrors(err);
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
                onChangeText={(value) => values.password = value}
                spellCheck= {false}
                autoCorrect={false}
                secureTextEntry={true}
                autoCapitalize='none'
            />
            <Button 
                color='black'
                title="Login"
                onPress={() => loginUser()}
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
  mutation login($username: String!, $password: String!, $remember: String!) {
    login(username: $username, password: $password, remember: $remember) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
export default Login;