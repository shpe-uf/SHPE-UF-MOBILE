import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, gql } from "@apollo/client";
import { useForm, getErrors } from "../util/hooks";
import { View, TouchableWithoutFeedback, TextInput, StyleSheet, SafeAreaView, Keyboard, Button, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import RNPickerSelect from 'react-native-picker-select';

import majorOptions from "../assets/options/major.json";
import yearOptions from "../assets/options/year.json";
import graduatingOptions from "../assets/options/graduating.json";
import countryOptions from "../assets/options/country.json";
import ethnicityOptions from "../assets/options/ethnicity.json";
import sexOptions from "../assets/options/sex.json";


function Register() {
    const { onChange, onSubmit, values } = useForm(addUser, {
        firstName: "",
        lastName: "",
        major: "",
        ethnicity: "",
        graduating: "",
        country: "",
        year: "",
        sex: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        listServ: "false"
    });

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        onError(err) {
            getErrors(err);
        },

        variables: values
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
                            values.firstName = text;
                        }}
                        spellCheck={false}
                        autoCorrect={false}
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder='Last Name'
                        onChangeText={text => {
                            values.lastName = text;
                        }}
                        spellCheck={false}
                        autoCorrect={false}
                    />
                    <RNPickerSelect
                        placeholder={{
                            label: 'Major',
                            value: null,
                            color: '#9EA0A4',
                        }}
                        style={{inputIOS: styles.input}}
                        onValueChange={(value) => values.major = value}
                        items={majorOptions}
                    />
                    <RNPickerSelect
                        placeholder={{
                            label: 'Year',
                            value: null,
                            color: '#9EA0A4',
                        }}
                        style={{inputIOS: styles.input}}
                        onValueChange={(value) => values.year = value}
                        items={yearOptions}
                    />
                    <RNPickerSelect
                        placeholder={{
                            label: 'Graduating this year?',
                            value: null,
                            color: '#9EA0A4',
                        }}
                        style={{inputIOS: styles.input}}
                        onValueChange={(value) => values.graduating = value}
                        items={graduatingOptions}
                    />
                    <RNPickerSelect
                        placeholder={{
                            label: 'Country of Origin',
                            value: null,
                            color: '#9EA0A4',
                        }}
                        style={{inputIOS: styles.input}}
                        onValueChange={(value) => values.country = value}
                        items={countryOptions}
                    />
                    <RNPickerSelect
                        placeholder={{
                            label: 'Ethnicity',
                            value: null,
                            color: '#9EA0A4',
                        }}
                        style={{inputIOS: styles.input}}
                        onValueChange={(value) => values.ethnicity = value}
                        items={ethnicityOptions}
                    />
                    <RNPickerSelect
                        placeholder={{
                            label: 'Sex',
                            value: null,
                            color: '#9EA0A4',
                        }}
                        style={{inputIOS: styles.input}}
                        onValueChange={(value) => values.sex = value}
                        items={sexOptions}
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder='Username'
                        onChangeText={text => {
                            values.username = text;
                        }}
                        spellCheck={false}
                        autoCorrect={false}
                        autoCapitalize='none'
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder='UF/SF Email'
                        onChangeText={text => {
                            values.email = text;
                        }}
                        spellCheck={false}
                        autoCorrect={false}
                        autoCapitalize='none'
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder='Password'
                        onChangeText={text => {
                            values.password = text;
                        }}
                        spellCheck={false}
                        autoCorrect={false}
                        secureTextEntry={true}
                        autoCapitalize='none'
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder='Confirm Password'
                        onChangeText={text => {
                            values.confirmPassword = text;
                        }}
                        spellCheck={false}
                        autoCorrect={false}
                        secureTextEntry={true}
                        autoCapitalize='none'
                    />

                    <View>
                        <Button 
                            title="Submit"
                            onPress={() => addUser()}
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

const pickerStyles = StyleSheet.create({
    inputIOS: {
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
    inputAndroid: {
        color: 'white'
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