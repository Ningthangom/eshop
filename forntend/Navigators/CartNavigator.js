import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"


import Cart from "../Screens/Cart/Cart.component"

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
        </Stack.Navigator>
    )
}

export default function CartNavigator() {
    return <MyStack />;
}