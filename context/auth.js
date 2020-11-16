import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  user: null
}

let decodedToken = null;

( async ()=> {
  if (AsyncStorage.getItem("jwtToken")) {
    const decodedToken = jwtDecode(await AsyncStorage.getItem("jwtToken"));
  
    await AsyncStorage.setItem('permission', decodedToken.permission);
  
    if (decodedToken.exp*1000 < Date.now()) {
      await AsyncStorage.removeItem("jwtToken");
      // localStorage.removeItem('permission');
    } else {
      AsyncStorage.user = decodedToken;
    }
  }
}
)()

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {}
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload
      };
    case "LOGOUT":
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  
  async function login(userData) {
    await AsyncStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData
    });
  }

  async function logout() {
    await AsyncStorage.removeItem("jwtToken");
    await AsyncStorage.removeItem('permission');
    dispatch({
      type: "LOGOUT"
    });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider }
