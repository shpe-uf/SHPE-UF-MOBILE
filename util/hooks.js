import { useState } from "react";
import { Alert } from "react-native"

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };
  
  return {
    onChange,
    onSubmit,
    values
  }
};

export const getErrors = (err) => {
<<<<<<< HEAD
  const errors = err.graphQLErrors[0].extensions.exception.errors;     
=======
  errors = err.graphQLErrors[0].extensions.exception.errors;     
>>>>>>> viewProfile
  if (errors && !errors.data){
    var errorString = "";
    
    const errorArray = Object.values(errors);

    errorArray.map(error => {
      errorString += (error);

      if (error != errorArray[errorArray.length - 1]) {
        errorString += "\n";
      }
    })

    Alert.alert(errorString);
  }
<<<<<<< HEAD
};
=======
};
>>>>>>> viewProfile
