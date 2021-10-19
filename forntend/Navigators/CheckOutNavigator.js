import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"


import CheckOut from "../Screens/Cart/CheckOut"

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='CheckOutPage'
                component={CheckOut}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default function CheckOutNavigator() {
    return <MyStack />;
}

