import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import ProductContainer from "../Screens/Products/ProductContainer.component";
import SingleProduct from "../Screens/Products/singleproduct"

const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='HomePage'
                component={ProductContainer}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name='Product Detail'
                component={SingleProduct}
                options={{
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    )
}

export default function HomeNavigator() {
    return <MyStack />;
}