import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Categories from '../Screens/Admin/Categories';
import Orders from '../Screens/Admin/Order';
import Products from '../Screens/Admin/Products';
import ProductForm from '../Screens/Admin/ProductForm'

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='CategoryPage'
                component={Categories}
                options={{
                    headerShown: false,
                }}
            />
          
        </Stack.Navigator>
    )
}

export default function AdminNavigator() {
    return <MyStack />;
}