import  React from 'react';
import { TouchableWithoutFeedback, TextInput, Text, StyleSheet, SafeAreaView, Keyboard, Button, Alert, NativeModules } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useMutation, gql } from "@apollo/client";
import { useForm, getErrors } from "../util/hooks";
import localStorage from 'react-native-sync-localstorage'

function Login({navigation}) {

  /* const sign = require('jwt-encode');

  function generateToken(values) {
    return sign({
      values,
    },
      SECRET,
    {
      alg: "HS256",
    })
  }  */

  var userToken = [];

  const { values } = useForm(loginUser, {
        username: "",
        password: "",
        remember: "false"
      });

    const [loginUser, {data}] = useMutation(LOGIN_USER, {
      
      onError(err) {
        getErrors(err);
      },
      
      onCompleted() {
        Alert.alert("Login Successful!");
        
        NativeModules.DevSettings.reload();
      },
    
      variables: values
    });
    
    if(data){
      //console.log(data);
      userToken = data.login.token;
      //console.log(userToken);
      localStorage.setItem('jwtToken', userToken);
    }

    return (
      <SafeAreaView
            style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAwareScrollView>
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
              onPress={() => {
                values.remember = "true";
                loginUser()
                }}
          />
          <Button
              title="Register"
              onPress={() => navigation.navigate('Register')}
          />
          <Button
              title="ResetPassword"
              onPress={() => navigation.navigate('ResetPassword')}
          />
          {/* <Button
              title="ViewTasks"
              onPress={() => navigation.navigate('ViewTasks')}
          /> */}
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
