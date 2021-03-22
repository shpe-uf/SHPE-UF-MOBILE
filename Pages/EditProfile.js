import React, { useState } from 'react';
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


function EditProfile({navigation, token}) {
    const [user, setUser] = useState({})
    const {data} = useQuery(FETCH_USER_QUERY, {
        onError(err){
            console.log(err);
        },
        variables: {
            userId: token.id
        }
    });

    if(data && data.getUser != user){
        setUser(data.getUser);
        console.log(data);
    }

    const { values } = useForm(editUser, {
        email: "",
        firstName: "",
        lastName: "",
        photo: "",
        major: "",
        year: "",
        graduating: "",
        country: "",
        ethnicity: "",
        sex: "",
        classes: "",
        internships: "",
        socialMedia: "",
    });

    const [editUser] = useMutation(EDIT_USER_PROFILE, {
        onError(err) {
            getErrors(err);
        },

        onCompleted() {
            Alert.alert("Edit Successful!");
            navigation.navigate('UserProfile');
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
                        placeholder={user.firstName}
                        onChangeText={text => {
                            values.firstName = text;
                        }}
                        spellCheck={false}
                        autoCorrect={false}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder={user.lastName}
                        onChangeText={text => {
                            values.lastName = text;
                        }}
                        spellCheck={false}
                        autoCorrect={false}
                    />
                    <RNPickerSelect
                        placeholder={{
                            label: user.major,
                            value: user.major,
                            color: '#9EA0A4',
                        }}
                        style={{inputIOS: styles.input}}
                        onValueChange={(value) => values.major = value}
                        items={majorOptions}
                    />
                    <RNPickerSelect
                        placeholder={{
                            label: user.year,
                            value: user.year,
                            color: '#9EA0A4',
                        }}
                        style={{inputIOS: styles.input}}
                        onValueChange={(value) => values.year = value}
                        items={yearOptions}
                    />
                    <RNPickerSelect
                        placeholder={{
                            label: user.graduating,
                            value: user.graduating,
                            color: '#9EA0A4',
                        }}
                        style={{inputIOS: styles.input}}
                        onValueChange={(value) => values.graduating = value}
                        items={graduatingOptions}
                    />
                    <RNPickerSelect
                        placeholder={{
                            label: user.country,
                            value: user.country,
                            color: '#9EA0A4',
                        }}
                        style={{inputIOS: styles.input}}
                        onValueChange={(value) => values.country = value}
                        items={countryOptions}
                    />
                    <RNPickerSelect
                        placeholder={{
                            label: user.ethnicity,
                            value: user.ethnicity,
                            color: '#9EA0A4',
                        }}
                        style={{inputIOS: styles.input}}
                        onValueChange={(value) => values.ethnicity = value}
                        items={ethnicityOptions}
                    />
                    <RNPickerSelect
                        placeholder={{
                            label: user.sex,
                            value: user.sex,
                            color: '#9EA0A4',
                        }}
                        style={{inputIOS: styles.input}}
                        onValueChange={(value) => values.sex = value}
                        items={sexOptions}
                    />

                    <View>
                        <Button
                            title="Edit Profile"
                            onPress={() => {
                                if (values.firstName === "") {
                                    values.firstName = user.firstName;
                                }
                                if (values.lastName === "") {
                                    values.lastName = user.lastName;
                                }
                                if (values.major === "") {
                                    values.major = user.major;
                                }
                                if (values.year === "") {
                                    values.year = user.year;
                                }
                                if (values.graduating === "") {
                                    values.graduating = user.graduating;
                                }
                                if (values.country === "") {
                                    values.country = user.country;
                                }
                                if (values.ethnicity === "") {
                                    values.ethnicity = user.ethnicity;
                                }
                                if (values.sex === "") {
                                    values.sex = user.sex;
                                }

                                values.email = user.email;
                                values.photo = user.photo;
                                values.classes = user.classes;
                                values.internships = user.internships;
                                values.socialMedia = user.socialMedia;
                                console.log(values);
                                editUser();
                            }}
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

const EDIT_USER_PROFILE = gql`
  mutation editUserProfile(
    $email: String!
    $firstName: String!
    $lastName: String!
    $photo: String!
    $major: String!
    $year: String!
    $graduating: String!
    $country: String!
    $ethnicity: String!
    $sex: String!
    $classes: [String]
    $internships: [String]
    $socialMedia: [String]
  ) {
    editUserProfile(
      editUserProfileInput: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        photo: $photo
        major: $major
        year: $year
        graduating: $graduating
        country: $country
        ethnicity: $ethnicity
        sex: $sex
        classes: $classes
        internships: $internships
        socialMedia: $socialMedia
      }
    ) {
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

export default EditProfile;