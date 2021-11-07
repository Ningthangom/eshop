import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../Screens/Users/Login';
import Register from '../Screens/Users/Register';
import UserProfile from '../Screens/Users/UserProfile';

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name ="LoginPage"
                component={Login}
                options={{
                    headerShown: false,
                }}
            />
           <Stack.Screen 
                name="RegisterPage"
                component={Register}
                options={{
                    title: 'SIGN UP'
                }}
            />
            <Stack.Screen 
                name="UserProfilePage"
                component={UserProfile}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default function UserNavigator() {
    return <MyStack />;
}