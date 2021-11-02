/* import React, {useReducer, useState, useEffect} from 'react';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from '../reducers/Auth_reducer';
import { setCurrentUser } from '../actions/Auth_action';

import AuthGloble from './AuthGloble';

const Auth = props => {
      
    const [stateUser, dispatch] = useReducer(authReducer, {
        isAuthenticated: null,
        user: {},
    });
    const [showChild, setShowChild] = useState(false);  
    

    useEffect(() => {
        setShowChild(true);
        if(AsyncStorage.jwt){
            const decoded = AsyncStorage.jwt ? AsyncStorage.jwt : "";
            if(setShowChild) {
                dispatch(setCurrentUser(jwt_decode(decoded)))
            }
        }
        return () => setShowChild(false)
    },[]);

    if(!showChild) {
        return null;
    }else{
        return (
            <AuthGloble.Provider 
                value = {{stateUser, dispatch}}
            >

            </AuthGloble.Provider>
        )
    }
}

export default Auth;
 */



import React, {useReducer, useState, useEffect} from 'react';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from '../reducers/Auth_reducer';
import { setCurrentUser } from '../actions/Auth_action';

import AuthGloble from './AuthGloble';

const Auth = props => {
    const [stateUser, dispatch] = useReducer(authReducer, {
        isAuthenticated: null,
        user: {}
    });
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        setShowChild(true);
        if (AsyncStorage.jwt) {
            const decoded = AsyncStorage.jwt ? AsyncStorage.jwt : "";
            if (setShowChild) {
                dispatch(setCurrentUser(jwt_decode(decoded)))
            }
        }
        return () => setShowChild(false);
    }, [])


    if (!showChild) {
        return null;
    } else {
        return (
            <AuthGloble.Provider
                value={{
                    stateUser,
                    dispatch
                }}
            >
                {props.children}
            </AuthGloble.Provider>
        )
    }
};

export default Auth;