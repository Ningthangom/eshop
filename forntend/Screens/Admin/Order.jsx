import React, {useState, useCallback} from 'react';
import {View, Text,FlatList } from 'react-native';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import {useFocusEffect} from "@react-navigation/native"

import OrderCard from '../../Shared/OrderCard';

const Orders = (props) => {

    const [orderList, setOrderList] = useState();


    useFocusEffect(
        useCallback(
            ()=> {
                getOrders();

                return () => {
                    setOrderList()
                }
            },
            []
        )
    )


    const getOrders = () => {
        console.log("getOrders func is called ")
        axios
        .get(`${baseURL}orders`)
        .then((x) => {
            console.log("this is order data", x.data)
            setOrderList(x.data)
        })
        .catch((err) => console.error(err))
    }

    console.log("this is orderList",orderList)

    return (
        <View>
            <FlatList
                data={orderList}
                renderItem= {({item}) => (
                    <OrderCard navigation={props.navigation}{...item} editMode={true} />
                )}
                keyExtractor={(item) => item._id}
            
            /> 

          
        </View>
    )
}

export default Orders;