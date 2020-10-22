import React, { useEffect, useState } from 'react';
import { useMutation, gql } from "@apollo/client";
import { useForm } from "react-hook-form";
import { View, TouchableWithoutFeedback, Text, TextInput, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Keyboard, Button, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

function Register() {
    const [errors, setErrors] = useState({});

    const onSubmit = data => {
        addUser({
            variables: {
                firstName: data.firstName,
                lastName: data.lastName,
                major: data.major,
                ethnicity: data.ethnicity,
                graduating: data.graduating,
                country: data.country,
                year: data.year,
                sex: data.sex,
                username: data.username,
                email: data.email,
                password: data.password,
                confirmPassword: data.confirmPassword,
                listServ: "false"
            }
        })

    }

    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        register('firstName');
        register('lastName');
        register('major');
        register('year');
        register('graduating');
        register('country');
        register('ethnicity');
        register('sex');
        register('username');
        register('email');
        register('password');
        register('confirmPassword');
    }, [register]);

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        onError(err) {
            console.warn(err);
        }
    });

    return (
        <SafeAreaView 
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAwareScrollView>
                    <TextInput 
                        style={styles.input}
                        placeholder='First Name'
                        onChangeText={text => {
                            setValue('firstName', text)
                        }}
                        spellCheck={false}
                        autoCorrect={false}
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder='Last Name'
                        onChangeText={text => {
                            setValue('lastName', text)
                        }}
                        spellCheck={false}
                        autoCorrect={false}
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder='Major'
                        onChangeText={text => {
                            setValue('major', text)
                        }}
                        spellCheck={false}
                        autoCorrect={false}
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder='Year'
                        onChangeText={text => {
                            setValue('year', text)
                        }}
                        spellCheck={false}
                        autoCorrect={false}
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder='Graduating this year?'
                        onChangeText={text => {
                            setValue('graduating', text)
                        }}
                        spellCheck={false}
                        autoCorrect={false}
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder='Country of Origin'
                        onChangeText={text => {
                            setValue('country', text)
                        }}
                        spellCheck={false}
                        autoCorrect={false}
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder='Ethnicity'
                        onChangeText={text => {
                            setValue('ethnicity', text)
                        }}
                        spellCheck={false}
                        autoCorrect={false}
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder='Sex'
                        onChangeText={text => {
                            setValue('sex', text)
                        }}
                        spellCheck={false}
                        autoCorrect={false}
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder='Username'
                        onChangeText={text => {
                            setValue('username', text)
                        }}
                        spellCheck={false}
                        autoCorrect={false}
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder='UF/SF Email'
                        onChangeText={text => {
                            setValue('email', text)
                        }}
                        spellCheck={false}
                        autoCorrect={false}
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder='Password'
                        onChangeText={text => {
                            setValue('password', text)
                        }}
                        spellCheck={false}
                        autoCorrect={false}
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder='Confirm Password'
                        onChangeText={text => {
                            setValue('confirmPassword', text)
                        }}
                        spellCheck={false}
                        autoCorrect={false}
                    />

                    <View>
                        <Button 
                            title='Submit'
                            onPress={handleSubmit(onSubmit)}
                        />
                    </View>
                    <View style={{ flex : 1 }} />
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        width: 350,
        height: 55,
        backgroundColor: 'white',
        margin: 10,
        padding: 8,
        color: 'black',
        borderRadius: 14,
        fontSize: 18,
        fontWeight: '500',
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#42A5F5',
      }
  });

const REGISTER_USER = gql`
  mutation register(
    $firstName: String!
    $lastName: String!
    $major: String!
    $year: String!
    $graduating: String!
    $country: String!
    $ethnicity: String!
    $sex: String!
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $listServ: String!
  ) {
    register(
      registerInput: {
        firstName: $firstName
        lastName: $lastName
        major: $major
        year: $year
        graduating: $graduating
        country: $country
        ethnicity: $ethnicity
        sex: $sex
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        listServ: $listServ
      }
    ) {
      id
      email
      username
      createdAt
    }
  }
`;
export default Register;