

 // log in method 
 // get user method
 // set current user method
 // logout method 

 /* import jwt_decode from 'jwt-decode';
 import AsyncStorage from '@react-native-async-storage/async-storage';

 import Toast from 'react-native-toast-message';
 import baseURL from "../../assets/common/baseUrl"

 export const SET_CURRENT_USER = "SET_CURRENT_USER";


 // log in state
 export const loginUser = (user, dispatch) => {
     fetch(`${baseURL}users/login`,{
         method: 'POST',
         body: JSON.stringify(user),
         headers: {
             Accept: "application/json",
             "Content-Type": "application/json"
         }
     }).then((res) => res.json() )
        .then((data) => {
            if(data) {
                const token = data.token;
                AsyncStorage.setItem("jwt", token)
                const decoded = jwt_decode(token)
                dispatch(setCurrentUser(decoded, user)) 
            }else{
                logOutUser(dispatch)
            }
        })
        .catch((err) => {
            Toast.show({
                topOffset: 60,
                type: "error", 
                text1: "Please provide correct credentail",
                text2: "Email or password is wrong"
            })
            logOutUser(dispatch)
        })

 };


 export const getUserProfile = (id) => {
        fetch(`${baseURL}users/${id}`, {
            method: "GET",
            body: JSON.stringify(user),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).then((res) => res.json())
        .then((data) => console.log("this is user detail from Auth-action: ", data))

 }


 export const logOutUser = (dispatch) => {
     AsyncStorage.removeItem("jwt");
     // set current user to emty object
     dispatch(setCurrentUser({}));
 }

 export const setCurrentUser = (decoded, user) => {
     return {
         type: SET_CURRENT_USER,
         payload: decoded,
         userProfile: user
     }
 } */
import React from 'react';
 import jwt_decode from "jwt-decode"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Toast from "react-native-toast-message"
import baseURL from "../../assets/common/baseUrl"

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const loginUser = (user, dispatch) => {
    fetch(`${baseURL}users/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
        if (data) {
            const token = data.token;
            AsyncStorage.setItem("jwt", token)
            const decoded = jwt_decode(token)
            dispatch(setCurrentUser(decoded, user))
        } else {
           logoutUser(dispatch)
        }
    })
    .catch((err) => {
        Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Please provide correct credentials",
            text2: ""
        });
        logoutUser(dispatch)
    });
};

export const getUserProfile = (id) => {
    fetch(`${baseURL}users/${id}`, {
        method: "GET",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

export const logoutUser = (dispatch) => {
    console.log("user has been logout");
    AsyncStorage.removeItem("jwt");
    dispatch(setCurrentUser({}))
}

export const setCurrentUser = (decoded, user) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
        userProfile: user
    }
}