import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"


import Cart from "../Screens/Cart/Cart.component"
import CheckOutNavigator from './CheckOutNavigator'

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='CartPage'
                component={Cart}
                options={{
                    headerShown: false,
                }}
            />
           <Stack.Screen 
                name="Checkout"
                component={CheckOutNavigator}
                options={{
                    title: 'Checkout'
                }}
            />
        </Stack.Navigator>
    )
}

export default function CartNavigator() {
    return <MyStack />;
}